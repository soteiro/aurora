import { getFoldersIds, getLists, getTasks } from "@/fetchers/clickupFetcher"
import type { Task } from "@/types"

const EXCLUDED_FOLDER_ID = 901316692415
const EXCLUDED_STATUSES = ["", "Open", "blocked", "completed"]

export const getActiveTasks = async (): Promise<Task[]> => {
    const folderIds: number[] = await getFoldersIds()
    const activeTasks: Task[] = []

    for (const folderId of folderIds) {
        if (folderId === EXCLUDED_FOLDER_ID) continue

        const { lists } = await getLists(folderId)

        for (const list of lists) {
            const { tasks } = await getTasks(list.id)

            const filtered: Task[] = tasks
                .filter((task: any) => !EXCLUDED_STATUSES.includes(task.status.status))
                .map((task: any) => ({
                    name: task.name,
                    id: task.id,
                    list: task.list.name,
                    folder: task.folder.name,
                    status: task.status.status,
                    source: "clickup" as const,
                }))

            activeTasks.push(...filtered)
        }
    }

    return activeTasks
}
