import { getActiveTasks } from "@/services/clickupService"
import { getActiveTickTickTasks } from "@/services/ticktickService"
import { sendDigestEmail } from "@/services/mailService"
import { logger } from "./utils/logger"

const main = async () => {
    logger.info("Fetching tasks from all sources...")

    const [clickupTasks, ticktickTasks] = await Promise.all([
        getActiveTasks(),
        getActiveTickTickTasks(),
    ])

    const allTasks = [...clickupTasks, ...ticktickTasks]
    logger.info(`Found ${allTasks.length} active tasks (ClickUp: ${clickupTasks.length}, TickTick: ${ticktickTasks.length})`)

    await sendDigestEmail(allTasks)
}

export default main;