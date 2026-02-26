import { getProjects, getProjectData } from "@/fetchers/ticktickFetcher"
import { logger } from "@/utils/logger"
import type { Task } from "@/types"

const COMPLETED_STATUS = 2

const isToday = (dateStr: string): boolean => {
    const taskDate = new Date(dateStr)
    const today = new Date()
    return (
        taskDate.getFullYear() === today.getFullYear() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getDate() === today.getDate()
    )
}

export const getActiveTickTickTasks = async (): Promise<Task[]> => {
    const projects: any[] = await getProjects()
    const activeTasks: Task[] = []

    for (const project of projects) {
        const data = await getProjectData(project.id)
        const tasks: any[] = data.tasks ?? []

        const filtered: Task[] = tasks
            .filter((task: any) =>
                task.status !== COMPLETED_STATUS &&
                task.dueDate && isToday(task.dueDate)
            )
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

    logger.info(`TickTick: ${activeTasks.length} tasks due today`)
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
