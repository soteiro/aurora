import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"
import * as React from "react"
import type { Task } from "../types"
import { pluralize } from "./constants"
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
            <Tailwind>
                <Body className="bg-zinc-100 font-sans m-0 py-6">
                    <Container className="bg-white rounded-xl max-w-3xl mx-auto p-8">
                        <Heading className="text-zinc-900 text-3xl font-bold m-0 mb-1">
                            🌅 Aurora
                        </Heading>
                        <Text className="text-zinc-500 text-sm m-0 mb-4">
                            {date} · {count} {pluralize(count, "tarea activa", "tareas activas")}
                        </Text>

                        <SummaryBadges tasks={tasks} />
                        <TaskTable tasks={tasks} />

                        <Text className="text-zinc-400 text-base mt-9 text-center border border-zinc-200 py-3 px-4 rounded-lg">
                            °°° Mis mejores deseos – Proyecto Aurora °°°
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
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
    {id: "6", name: "Planificar reunión equipo", list: "Gestión", folder: "Proyecto Web", status: "active (medium)", source: "clickup" },
    {id: "7", name: "Enviar reporte semanal", list: "Inbox", folder: "TickTick", status: "active (low)", source: "ticktick" },
]

DigestEmail.PreviewProps = {
    tasks: previewTasks,
    date: "jueves, 26 de febrero de 2026",
} satisfies DigestEmailProps
