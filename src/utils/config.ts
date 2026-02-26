import { logger } from "@/utils/logger";

interface Config {
    token: string;
    workspaceId: number;
    spaceId: number;
}

const getEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        logger.error(`Config Error: ${key} is missing`);
        throw new Error(`Config Error: ${key} is missing`)
    }
    logger.debug(`Config loaded: ${key}`);
    return value;
}

export const clickUpConfig: Config = {
    token: getEnv("CLICKUP_TOKEN"),
    workspaceId: Number(getEnv("CLICKUP_WORKSPACE_ID")),
    spaceId: Number(getEnv("CLICKUP_SPACE_ID"))
}
export const geminiConfig = {
    apiKey: getEnv("GEMINI_API_KEY")
}

export const resendConfig = {
    apiKey: getEnv("RESEND_API_KEY"),
    to: getEnv("RESEND_TO_EMAIL"),
    from: getEnv("RESEND_FROM_EMAIL"),
}

export const tickTickConfig = {
    clientId: getEnv("TICKTICK_CLIENT_ID"),
    clientSecret: getEnv("TICKTICK_CLIENT_SECRET"),
    accessToken: getEnv("TICKTICK_ACCESS_TOKEN"),
    redirectUri: getEnv("TICKTICK_REDIRECT_URI"),
}
