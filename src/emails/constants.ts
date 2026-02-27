import type { Task } from "../types"

// --- Color maps ---

export const STATUS_COLORS: Record<string, string> = {
    "in progress": "#f59e0b",
    "review": "#3b82f6",
    "testing": "#8b5cf6",
    "active": "#22c55e",
    "active (high)": "#ef4444",
    "active (medium)": "#f59e0b",
    "active (low)": "#6b7280",
}

export const SOURCE_COLORS: Record<string, string> = {
    clickup: "#7B68EE",
    ticktick: "#4772FA",
}

export const SOURCE_LABELS: Record<Task["source"], string> = {
    clickup: "CU",
    ticktick: "TT",
}

// --- Helpers ---

export const getStatusColor = (status: string): string =>
    STATUS_COLORS[status.toLowerCase()] ?? "#6b7280"

export const pluralize = (count: number, singular: string, plural: string): string =>
    count === 1 ? singular : plural
