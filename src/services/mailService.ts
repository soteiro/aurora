import { Resend } from "resend"
import { render } from "@react-email/components"
import { resendConfig } from "@/utils/config"
import { DigestEmail } from "@/emails/DigestEmail"
import type { Task } from "@/types"
import { logger } from "@/utils/logger"
import * as React from "react"

const resend = new Resend(resendConfig.apiKey)

export const sendDigestEmail = async (tasks: Task[]): Promise<void> => {
    const date = new Date().toLocaleDateString("es-AR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const html = await render(
        React.createElement(DigestEmail, { tasks, date })
    )

    const { error } = await resend.emails.send({
        from: resendConfig.from,
        to: resendConfig.to,
        subject: `Aurora Digest – ${date}`,
        html,
    })

    if (error) {
        logger.error(`Error sending digest email: ${error.message}`)
        throw new Error(error.message)
    }

    logger.info(`Digest email sent to ${resendConfig.to}`)
}
