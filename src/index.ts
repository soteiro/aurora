import { getFoldersIds, getLists, getTasks } from "@/fetchers/clickupFetcher"
import { logger } from "./utils/logger"

const main = async () => {
    logger.info("Starting Aurora")
    const folders = await getFoldersIds()
    console.log(folders)
    const lists = await getLists(folders[1])
    const tasks = await getTasks(lists.lists[2].id)
    const tareas = tasks.tasks[0]
    // console.log(tareas)
    const tareasFiltradas = {
        name: tareas.name,
        id: tareas.id,
        status: tareas.status.status,
        proyect: tareas.project.name
    }
    console.log(tareasFiltradas)
}

main()