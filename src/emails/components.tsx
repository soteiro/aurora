import { Row, Section, Column, Text } from "@react-email/components"
import * as React from "react"
import type { Task } from "../types"
import { SOURCE_COLORS, SOURCE_LABELS, getStatusColor } from "./constants"
import {
    tableWrapper,
    headerRow,
    headerCell,
    evenRow,
    oddRow,
    cell,
    sourceBadgeSmall,
    statusBadge,
    summaryRow,
    summaryText,
    sourceBadge,
} from "./styles"

// --- Summary badges (ClickUp: N, TickTick: N) ---

interface SummaryBadgesProps {
    tasks: Task[]
}

export const SummaryBadges = ({ tasks }: SummaryBadgesProps) => {
    const countBySource = tasks.reduce<Record<string, number>>((acc, t) => {
        acc[t.source] = (acc[t.source] ?? 0) + 1
        return acc
    }, {})

    return (
        <Section style={summaryRow}>
            <Text style={summaryText}>
                {Object.entries(SOURCE_COLORS).map(([source, color]) => (
                    <span key={source} style={{ ...sourceBadge, backgroundColor: color }}>
                        {source.charAt(0).toUpperCase() + source.slice(1)}: {countBySource[source] ?? 0}
                    </span>
                ))}
            </Text>
        </Section>
    )
}

// --- Task table ---

const TABLE_COLUMNS = [
    { label: "Fuente", width: "10%" },
    { label: "Tarea", width: "30%" },
    { label: "Lista", width: "20%" },
    { label: "Carpeta", width: "20%" },
    { label: "Estado", width: "20%" },
] as const

interface TaskTableProps {
    tasks: Task[]
}

export const TaskTable = ({ tasks }: TaskTableProps) => (
    <Section style={tableWrapper}>
        <Row style={headerRow}>
            {TABLE_COLUMNS.map(({ label, width }) => (
                <Column key={label} style={{ ...headerCell, width }}>{label}</Column>
            ))}
        </Row>

        {tasks.map((task, i) => (
            <TaskRow key={task.id} task={task} isEven={i % 2 === 0} />
        ))}
    </Section>
)

// --- Single task row ---

interface TaskRowProps {
    task: Task
    isEven: boolean
}

const TaskRow = ({ task, isEven }: TaskRowProps) => (
    <Row style={isEven ? evenRow : oddRow}>
        <Column style={cell}>
            <span style={{ ...sourceBadgeSmall, backgroundColor: SOURCE_COLORS[task.source] }}>
                {SOURCE_LABELS[task.source]}
            </span>
        </Column>
        <Column style={cell}>{task.name}</Column>
        <Column style={cell}>{task.list}</Column>
        <Column style={cell}>{task.folder}</Column>
        <Column style={cell}>
            <span style={{ ...statusBadge, backgroundColor: getStatusColor(task.status) }}>
                {task.status}
            </span>
        </Column>
    </Row>
)
