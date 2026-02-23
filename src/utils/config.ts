import { logger } from "@/utils/logger";

interface Config {
    token: string;
    workspaceId: number;
    spaceId: number;
}

const getEnv = (key: string): string =>{
    const value = process.env[key];
    if (!value){
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
