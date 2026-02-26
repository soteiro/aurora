# 🌅 Aurora

Aurora is a unified daily task digest generator. It aggregates active tasks from multiple sources (ClickUp and TickTick) and sends a beautiful, consolidated daily summary email using React Email and Resend.

## Features

- **Multi-source Integration:** Fetches active tasks from ClickUp and TickTick.
- **Filtering:** Intelligently filters out completed tasks and includes only tasks relevant for the day.
- **Beautiful Emails:** Generates a clean, styled HTML email digest using React Email components.
- **Automated Delivery:** Sends the consolidated digest directly to your inbox via Resend.
- **Robust Logging:** Built-in logging using Pino (both console and file logging).

## Prerequisites

- [Bun](https://bun.sh/) (JavaScript runtime and package manager)
- A [Resend](https://resend.com/) account and API key.
- ClickUp API Token.
- TickTick Developer Client ID and Secret.

## Installation

1. Clone the repository and navigate to the project folder.
2. Install dependencies using Bun:
   ```bash
   bun install
   ```

## Configuration

Create a `.env` file in the root of the project and populate it with the following environment variables:

```env
# ClickUp Configuration
CLICKUP_TOKEN=your_clickup_api_token
CLICKUP_WORKSPACE_ID=your_clickup_workspace_id
CLICKUP_SPACE_ID=your_clickup_space_id

# Resend Configuration (Email)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_domain_email@example.com
RESEND_TO_EMAIL=your_destination_email@example.com

# TickTick Configuration
TICKTICK_CLIENT_ID=your_ticktick_client_id
TICKTICK_CLIENT_SECRET=your_ticktick_client_secret
TICKTICK_REDIRECT_URI=http://localhost:8080
TICKTICK_ACCESS_TOKEN=your_ticktick_access_token # Generated via auth script (see below)

# Logging
LOG_LEVEL=info # Change to debug for more verbose output
```

## Usage

### 1. Authenticate with TickTick (One-time setup)

TickTick uses OAuth2 for authentication. Before running the main application, you must generate an access token:

```bash
bun run scripts/ticktick-auth.ts
```

1. Run the script above.
2. Open the generated URL in your browser.
3. Authorize the application.
4. The local server will capture the response and print the `TICKTICK_ACCESS_TOKEN`.
5. Copy the generated token and paste it into your `.env` file.

### 2. Run the Daily Digest

To fetch the tasks, generate the email template, and send the digest:

```bash
bun run src/index.ts
```

A log file named `aurora.log` will be generated in the root directory containing the execution details.

## Architecture

- **`src/fetchers/`**: Responsible for making HTTP requests to external APIs (ClickUp, TickTick).
- **`src/services/`**: Contains business logic, formatting, filtering, and mapping raw data to standard `Task` types.
- **`src/emails/`**: React components used to render the HTML structure of the digest email.
- **`src/digest.ts`**: The orchestrator that coordinates fetching tasks from all sources and passing them to the mail service.
- **`src/index.ts`**: The main entry point of the application.
