import axios from "axios"
import { logger } from "@/utils/logger"
import { tickTickConfig } from "@/utils/config"

const BASE_URL = "https://api.ticktick.com/open/v1"

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${tickTickConfig.accessToken}`,
        "Content-Type": "application/json",
    },
})

export const getProjects = async () => {
    try {
        const { data } = await client.get("/project")
        logger.debug("TickTick projects fetched successfully")
        return data
    } catch (error) {
        logger.error("Error fetching projects from TickTick")
        throw error
    }
}

export const getProjectData = async (projectId: string) => {
    try {
        const { data } = await client.get(`/project/${projectId}/data`)
        logger.debug(`TickTick project data fetched: ${projectId}`)
        return data
    } catch (error) {
        logger.error(`Error fetching project data from TickTick: ${projectId}`)
        throw error
    }
}
