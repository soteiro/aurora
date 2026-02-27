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

const mapTasks = (tasks: any[], listName: string): Task[] =>
    tasks
        .filter((task: any) =>
            task.status !== COMPLETED_STATUS  &&
            task.dueDate  &&  isToday(task.dueDate)
            )
        .map((task: any) => ({
            name: task.title,
            id: task.id,
            list: listName,
            folder: "TickTick",
            status: getStatusLabel(task.status, task.priority),
            source: "ticktick" as const,
        }))

export const getActiveTickTickTasks = async (): Promise<Task[]> => {
    const [projects, inboxData] = await Promise.all([
        getProjects(),
        getProjectData("inbox"),
    ])
    const activeTasks: Task[] = []

    // Inbox tasks (no project assigned)
    const inboxTasks: any[] = inboxData.tasks ?? []
    activeTasks.push(...mapTasks(inboxTasks, "Inbox"))

    // Project tasks
    for (const project of projects) {
        const data = await getProjectData(project.id)
        const tasks: any[] = data.tasks ?? []
        activeTasks.push(...mapTasks(tasks, project.name))
    }

    logger.info(`TickTick: ${activeTasks.length} tasks due today`)
    return activeTasks
}
