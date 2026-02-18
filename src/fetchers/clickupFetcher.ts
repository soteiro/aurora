import clickup from '@api/clickup'
import { logger } from '@/utils/logger'
import { clickUpConfig } from '@/utils/config'


clickup.auth(clickUpConfig.token)

export const getWorspaceId = async () => {
    try {
        const response = await clickup.getAuthorizedTeams()
        .then(data => data.data.teams.map(team => team.id))
        logger.debug("Workspaces fetched successfully")
        return response
    } catch (error) {
        logger.error("Error fetching workspaces from ClickUp")
        throw error
    }
}
getWorspaceId()

