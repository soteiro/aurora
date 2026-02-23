import clickup from '@api/clickup'
import { logger } from '@/utils/logger'
import { clickUpConfig } from '@/utils/config'

clickup.auth(clickUpConfig.token)

export const getWorspaceId = async () => {
    try {
        const response = await clickup.getAuthorizedTeams()
            .then((data: any) => data.data.teams.map((team: any) => team.id))
        logger.debug("Workspaces fetched successfully")
        return response
    } catch (error) {
        logger.error("Error fetching workspaces from ClickUp")
        throw error
    }
}
export const getFoldersIds = async () => {
    try {
        const response = await clickup.getFolders({ space_id: clickUpConfig.spaceId })
            .then((data: any) => data.data.folders.map((folder: any) => folder.id))

        logger.debug("Folders fetched successfully")
        return response
    } catch (error) {
        logger.error("Error fetching folders from ClickUp")
        throw error
    }
}

export const getLists = async (folderId: number) => {
    try {
        const response = await clickup.getLists({ folder_id: folderId })
            .then((data: any) => data.data)

        logger.debug("Lists fetched successfully")
        return response
    } catch (error) {
        logger.error("Error fetching lists from ClickUp")
        throw error
    }
}

export const getTasks = async (listId: number) => {
    try {
        const response = await clickup.getTasks({ list_id: listId })
            .then((data: any) => data.data)

        logger.debug("Tasks fetched successfully")
        return response
    } catch (error) {
        logger.error("Error fetching tasks from ClickUp")
        throw error
    }
}


