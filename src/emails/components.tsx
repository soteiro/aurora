import { Row, Section, Column, Text } from "@react-email/components"
import * as React from "react"
import type { Task } from "../types"
import { SOURCE_COLORS, SOURCE_LABELS, getStatusColor } from "./constants"

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
        <Section className="mb-4">
            <Text className="m-0 mb-4 text-sm">
                {Object.entries(SOURCE_COLORS).map(([source, color]) => (
                    <span
                        key={source}
                        className="inline-block rounded-md text-white text-[13px] font-semibold py-1 px-3 mr-2"
                        style={{ backgroundColor: color }}
                    >
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
    <Section className="rounded-lg overflow-hidden border border-zinc-200">
        <Row className="bg-zinc-900">
            {TABLE_COLUMNS.map(({ label, width }) => (
                <Column
                    key={label}
                    className="text-white text-xs font-semibold tracking-wide border uppercase py-2.5 px-3.5"
                    style={{ width }}
                >
                    {label}
                </Column>
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
    <Row className={isEven ? "bg-white" : "bg-zinc-50"}>
        <Column className="text-zinc-700 text-[13px] py-2.5 px-3.5 border-t border-zinc-200">
            <span
                className="inline-block rounded text-white text-[10px] font-bold py-0.5 px-1.5 tracking-wide"
                style={{ backgroundColor: SOURCE_COLORS[task.source] }}
            >
                {SOURCE_LABELS[task.source]}
            </span>
        </Column>
        <Column className="text-zinc-700 text-[13px] py-2.5 px-3.5 border-t border-zinc-200">
            {task.name}
        </Column>
        <Column className="text-zinc-700 text-[13px] py-2.5 px-3.5 border-t border-zinc-200">
            {task.list}
        </Column>
        <Column className="text-zinc-700 text-[13px] py-2.5 px-3.5 border-t border-zinc-200">
            {task.folder}
        </Column>
        <Column className="text-zinc-700 text-[13px] py-2.5 px-3.5 border-t border-zinc-200">
            <span
                className="inline-block rounded-full text-white text-[11px] font-semibold py-0.5 px-2.5"
                style={{ backgroundColor: getStatusColor(task.status) }}
            >
                {task.status}
            </span>
        </Column>
    </Row>
)
