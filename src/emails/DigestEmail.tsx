import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Row,
    Section,
    Text,
    Column,
    Hr,
} from "@react-email/components"
import * as React from "react"
import type { Task } from "@/types"

interface DigestEmailProps {
    tasks: Task[]
    date: string
}

const statusColors: Record<string, string> = {
    "in progress": "#f59e0b",
    "review": "#3b82f6",
    "testing": "#8b5cf6",
    "active": "#22c55e",
    "active (high)": "#ef4444",
    "active (medium)": "#f59e0b",
    "active (low)": "#6b7280",
}

const sourceColors: Record<string, string> = {
    clickup: "#7B68EE",
    ticktick: "#4772FA",
}

const getStatusColor = (status: string) =>
    statusColors[status.toLowerCase()] ?? "#6b7280"

export const DigestEmail = ({ tasks, date }: DigestEmailProps) => {
    const clickupTasks = tasks.filter(t => t.source === "clickup")
    const ticktickTasks = tasks.filter(t => t.source === "ticktick")

    return (
        <Html lang="es">
            <Head />
            <Preview>Aurora Digest – {date}: {tasks.length} tareas activas</Preview>
            <Body style={body}>
                <Container style={container}>
                    <Heading style={heading}>🌅 Aurora Digest</Heading>
                    <Text style={subtitle}>
                        {date} · {tasks.length} tarea{tasks.length !== 1 ? "s" : ""} activa{tasks.length !== 1 ? "s" : ""}
                    </Text>

                    {/* Summary badges */}
                    <Section style={summaryRow}>
                        <Text style={summaryText}>
                            <span style={{ ...sourceBadge, backgroundColor: sourceColors.clickup }}>ClickUp: {clickupTasks.length}</span>
                            {"  "}
                            <span style={{ ...sourceBadge, backgroundColor: sourceColors.ticktick }}>TickTick: {ticktickTasks.length}</span>
                        </Text>
                    </Section>

                    <Section style={tableWrapper}>
                        {/* Header */}
                        <Row style={headerRow}>
                            <Column style={{ ...headerCell, width: "10%" }}>Fuente</Column>
                            <Column style={{ ...headerCell, width: "30%" }}>Tarea</Column>
                            <Column style={{ ...headerCell, width: "20%" }}>Lista</Column>
                            <Column style={{ ...headerCell, width: "20%" }}>Carpeta</Column>
                            <Column style={{ ...headerCell, width: "20%" }}>Estado</Column>
                        </Row>

                        {/* Rows */}
                        {tasks.map((task, i) => (
                            <Row key={task.id} style={i % 2 === 0 ? evenRow : oddRow}>
                                <Column style={cell}>
                                    <span style={{
                                        ...sourceBadgeSmall,
                                        backgroundColor: sourceColors[task.source],
                                    }}>
                                        {task.source === "clickup" ? "CU" : "TT"}
                                    </span>
                                </Column>
                                <Column style={cell}>{task.name}</Column>
                                <Column style={cell}>{task.list}</Column>
                                <Column style={cell}>{task.folder}</Column>
                                <Column style={cell}>
                                    <span style={{
                                        ...badge,
                                        backgroundColor: getStatusColor(task.status),
                                    }}>
                                        {task.status}
                                    </span>
                                </Column>
                            </Row>
                        ))}
                    </Section>

                    <Text style={footer}>Generado automáticamente por Aurora</Text>
                </Container>
            </Body>
        </Html>
    )
}

export default DigestEmail

// --- Styles ---

const body: React.CSSProperties = {
    backgroundColor: "#f4f4f5",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    margin: 0,
    padding: "24px 0",
}

const container: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    maxWidth: "750px",
    margin: "0 auto",
    padding: "32px",
}

const heading: React.CSSProperties = {
    color: "#18181b",
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 4px",
}

const subtitle: React.CSSProperties = {
    color: "#71717a",
    fontSize: "14px",
    margin: "0 0 16px",
}

const summaryRow: React.CSSProperties = {
    marginBottom: "16px",
}

const summaryText: React.CSSProperties = {
    margin: "0 0 16px",
    fontSize: "14px",
}

const sourceBadge: React.CSSProperties = {
    borderRadius: "6px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "13px",
    fontWeight: "600",
    padding: "4px 12px",
    marginRight: "8px",
}

const sourceBadgeSmall: React.CSSProperties = {
    borderRadius: "4px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 6px",
    letterSpacing: "0.05em",
}

const tableWrapper: React.CSSProperties = {
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e4e4e7",
}

const headerRow: React.CSSProperties = {
    backgroundColor: "#18181b",
}

const headerCell: React.CSSProperties = {
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    padding: "10px 14px",
}

const evenRow: React.CSSProperties = { backgroundColor: "#ffffff" }
const oddRow: React.CSSProperties = { backgroundColor: "#fafafa" }

const cell: React.CSSProperties = {
    color: "#3f3f46",
    fontSize: "13px",
    padding: "10px 14px",
    borderTop: "1px solid #e4e4e7",
}

const badge: React.CSSProperties = {
    borderRadius: "999px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "600",
    padding: "2px 10px",
}

const footer: React.CSSProperties = {
    color: "#a1a1aa",
    fontSize: "12px",
    marginTop: "24px",
    textAlign: "center",
}
