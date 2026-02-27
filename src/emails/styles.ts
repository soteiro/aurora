import * as React from "react"

// --- Layout ---

export const body: React.CSSProperties = {
    backgroundColor: "#f4f4f5",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    margin: 0,
    padding: "24px 0",
}

export const container: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    maxWidth: "750px",
    margin: "0 auto",
    padding: "32px",
}

// --- Typography ---

export const heading: React.CSSProperties = {
    color: "#18181b",
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 4px",
}

export const subtitle: React.CSSProperties = {
    color: "#71717a",
    fontSize: "14px",
    margin: "0 0 16px",
}

export const footer: React.CSSProperties = {
    color: "#a1a1aa",
    fontSize: "12px",
    marginTop: "24px",
    textAlign: "center",
}

// --- Summary ---

export const summaryRow: React.CSSProperties = {
    marginBottom: "16px",
}

export const summaryText: React.CSSProperties = {
    margin: "0 0 16px",
    fontSize: "14px",
}

export const sourceBadge: React.CSSProperties = {
    borderRadius: "6px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "13px",
    fontWeight: "600",
    padding: "4px 12px",
    marginRight: "8px",
}

// --- Table ---

export const tableWrapper: React.CSSProperties = {
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e4e4e7",
}

export const headerRow: React.CSSProperties = {
    backgroundColor: "#18181b",
}

export const headerCell: React.CSSProperties = {
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    padding: "10px 14px",
}

export const evenRow: React.CSSProperties = { backgroundColor: "#ffffff" }
export const oddRow: React.CSSProperties = { backgroundColor: "#fafafa" }

export const cell: React.CSSProperties = {
    color: "#3f3f46",
    fontSize: "13px",
    padding: "10px 14px",
    borderTop: "1px solid #e4e4e7",
}

// --- Badges ---

export const sourceBadgeSmall: React.CSSProperties = {
    borderRadius: "4px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 6px",
    letterSpacing: "0.05em",
}

export const statusBadge: React.CSSProperties = {
    borderRadius: "999px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "600",
    padding: "2px 10px",
}
