# AI Agents Guidelines for Aurora

This document serves as a reference for any Large Language Model (LLM) or AI agent working on the Aurora project. It contains constraints, dependency information, architectural guidelines, and important notes on how things are structured.

## Project Context

Aurora is a unified daily task digest generator. It aggregates tasks from multiple sources (currently ClickUp and TickTick), normalizes them into a standard `Task` interface, and emails them via Resend using a styled HTML template built with React Email.

## Hard Constraints & Architecture Rules

1. **No Logic in the Digest Orchestrator:**
   The file `src/digest.ts` must remain pure orchestration. It should only call services (e.g., `getActiveTasks`, `getActiveTickTickTasks`, `sendDigestEmail`), merge the results, and log the counts. All filtering, API traversal, and data mapping belongs inside the specific service files.

2. **Decoupled Architecture:**
   - **`src/fetchers/`**: ONLY raw HTTP requests and credential handling. No business logic or filtering. Return the raw API responses.
   - **`src/services/`**: Business logic layer. Here we iterate, filter (e.g., "completed", "due today", excluded folders), and map the raw API responses to the shared `Task` interface (found in `src/types.ts`).
   - **`src/emails/`**: Strictly React code for UI (React Email). Logic here should only involve processing the given array of tasks for display (e.g., calculating counts per source, colors). No API fetching, database calls, or external services here.

3. **Shared Interface (`src/types.ts`):**
   When adding a new source (e.g., Todoist, Notion), map the raw task data to the shared `Task` type:
   ```typescript
   export interface Task {
       name: string;
       id: string;
       list: string;      // The project/list name
       folder: string;    // The folder name (or the string of the source name if folders don't exist)
       status: string;
       source: "clickup" | "ticktick" | "your_new_source";
   }
   ```
   Do not modify existing type definitions if it would break existing renderers (like `DigestEmail.tsx`), unless updating the rendering component simultaneously.

4. **Environment Variables via `config.ts`:**
   ALL environment variables must be mapped through the `src/utils/config.ts` file via the `getEnv` helper. Do not read `process.env` directly inside fetchers or services, as `getEnv` has built-in validation and logging.

5. **Logging:**
   Always use the custom logger imported from `src/utils/logger.ts`. Do not use `console.log` for production paths.
   - The logger uses Pino.
   - It outputs formatted output to the console (`pino-pretty`).
   - It synchronously writes JSON logs to `/aurora.log`.
   - To inspect deep objects without cluttering standard logs, use `logger.debug`. Ensure the user runs the script with `LOG_LEVEL=debug` to read them.
5. **Commit messages:**
   Always use the conventional commits format for commit messages.

## Dependencies

- **Runtime:** `Bun`
- **Mail provider:** `resend` + `@react-email/components` (for the templates)
- **HTTP Clients:**
  - `axios` (used by TickTick)
  - Custom ClickUp SDK at `@api/clickup` (File-based local dependency)
- **Logging:** `pino` + `pino-pretty`

*Note: Since React Email uses JSX, ensure any new templates or components end in `.tsx` and that React and React-DOM (`@types/react`, `@types/react-dom`) types are installed as dev dependencies.*

## Adding a New Integration (Checklist)

When asked to add a new task source (e.g., "add Todoist"):

1. Create a fetcher (`src/fetchers/todoistFetcher.ts`) for raw HTTP calls.
2. Update `src/utils/config.ts` to expect the new env credentials.
3. Create a service (`src/services/todoistService.ts`) to fetch raw data, apply filters (e.g. non-completed tasks only), and map to the `Task` type.
4. Add the new literal source to the `Task` type in `src/types.ts`.
5. Update `src/digest.ts` to `Promise.all` the new service alongside existing ones.
6. Update `src/emails/DigestEmail.tsx` to include the specific color badges or logic for the new source.
7. (If OAuth2/complex auth is needed): Create a helper script inside `scripts/` to let the user retrieve credentials easily (similar to `ticktick-auth.ts`).

## TickTick Specific Quirks

When dealing with TickTick, keep in mind:
- There is no official public documentation for TickTick OAuth v2, we leverage the v1 OAuth API (`https://api.ticktick.com/open/v1`).
- TickTick's native priority enum is: `0: none`, `1: low`, `3: medium`, `5: high`.
- TickTick statuses: `0 = normal`, `2 = completed`.
- TickTick filter includes tasks that are NOT completed AND have a `dueDate` that `isTodayOrOverdue()`. Future-dated tasks are ignored.
