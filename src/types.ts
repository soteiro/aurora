export interface Task {
    name: string
    id: string
    list: string
    folder: string
    status: string
    source: "clickup" | "ticktick"
}
