import { getProjects, getProjectData } from "@/fetchers/ticktickFetcher"
import { logger } from "@/utils/logger"
import type { Task } from "@/types"

const COMPLETED_STATUS = 2

export const getActiveTickTickTasks = async (): Promise<Task[]> => {
    const projects: any[] = await getProjects()
    const activeTasks: Task[] = []

    for (const project of projects) {
        const data = await getProjectData(project.id)
        const tasks: any[] = data.tasks ?? []

        const filtered: Task[] = tasks
            .filter((task: any) => task.status !== COMPLETED_STATUS)
            .map((task: any) => ({
                name: task.title,
                id: task.id,
                list: project.name,
                folder: "TickTick",
                status: getStatusLabel(task.status, task.priority),
                source: "ticktick" as const,
            }))

        activeTasks.push(...filtered)
    }

    logger.info(`TickTick: ${activeTasks.length} active tasks found`)
    return activeTasks
}

const getStatusLabel = (status: number, priority: number): string => {
    if (status === 2) return "completed"

    const priorityLabels: Record<number, string> = {
        0: "none",
        1: "low",
        3: "medium",
        5: "high",
    }
    const pLabel = priorityLabels[priority] ?? "none"
    return pLabel === "none" ? "active" : `active (${pLabel})`
}
