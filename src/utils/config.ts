import { logger } from "@/utils/logger";

const getEnv = (key: string): string =>{
    const value = process.env[key];
    if (!value){
        logger.error(`Config Error: ${key} is missing`);
        throw new Error(`Config Error: ${key} is missing`)
    }
    logger.debug(`Config loaded: ${key}`);
    return value;
}

export const clickUpConfig = {
    token: getEnv("CLICKUP_TOKEN")
}
export const geminiConfig = {
    apiKey: getEnv("GEMINI_API_KEY")
}