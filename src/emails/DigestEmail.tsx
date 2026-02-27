import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
} from "@react-email/components"
import * as React from "react"
import type { Task } from "../types"
import { pluralize } from "./constants"
import { body, container, heading, subtitle, footer } from "./styles"
import { SummaryBadges, TaskTable } from "./components"

interface DigestEmailProps {
    tasks: Task[]
    date: string
}

export const DigestEmail = ({ tasks, date }: DigestEmailProps) => {
    const count = tasks.length

    return (
        <Html lang="es">
            <Head />
            <Preview>Aurora Digest – {date}: {count.toString()} {pluralize(count, "tarea activa", "tareas activas")}</Preview>
            <Body style={body}>
                <Container style={container}>
                    <Heading style={heading}>🌅 Aurora Digest</Heading>
                    <Text style={subtitle}>
                        {date} · {count} {pluralize(count, "tarea activa", "tareas activas")}
                    </Text>

                    <SummaryBadges tasks={tasks} />
                    <TaskTable tasks={tasks} />

                    <Text style={footer}>Generado automáticamente por Aurora</Text>
                </Container>
            </Body>
        </Html>
    )
}

export default DigestEmail

const previewTasks: Task[] = [
    { id: "1", name: "Diseñar landing page", list: "Diseño", folder: "Proyecto Web", status: "in progress", source: "clickup" },
    { id: "2", name: "Revisar PR #42", list: "Backend", folder: "API", status: "review", source: "clickup" },
    { id: "3", name: "Comprar café", list: "Inbox", folder: "TickTick", status: "active", source: "ticktick" },
    { id: "4", name: "Estudiar para examen", list: "Inbox", folder: "TickTick", status: "active (high)", source: "ticktick" },
    { id: "5", name: "Arreglar bug login", list: "Sprint 12", folder: "Platform", status: "in progress", source: "clickup" },
]

DigestEmail.PreviewProps = {
    tasks: previewTasks,
    date: "jueves, 26 de febrero de 2026",
} satisfies DigestEmailProps
