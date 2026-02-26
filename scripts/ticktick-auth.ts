/**
 * TickTick OAuth2 Authorization Script
 * 
 * Run once: bun run scripts/ticktick-auth.ts
 * 
 * 1. Opens the authorization URL in your browser
 * 2. Starts a local server to capture the callback
 * 3. Exchanges the code for an access token
 * 4. Prints the token to add to your .env
 */

const CLIENT_ID = process.env.TICKTICK_CLIENT_ID
const CLIENT_SECRET = process.env.TICKTICK_CLIENT_SECRET
const REDIRECT_URI = process.env.TICKTICK_REDIRECT_URI ?? "http://localhost:8080"
const SCOPE = "tasks:read"
const PORT = new URL(REDIRECT_URI).port || "8080"

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("❌ Set TICKTICK_CLIENT_ID and TICKTICK_CLIENT_SECRET in your .env")
    process.exit(1)
}

const authUrl = `https://ticktick.com/oauth/authorize?` +
    `scope=${SCOPE}` +
    `&client_id=${CLIENT_ID}` +
    `&state=aurora` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code`

console.log("\n🔗 Open this URL in your browser:\n")
console.log(authUrl)
console.log("\n⏳ Waiting for authorization callback...\n")

const server = Bun.serve({
    port: Number(PORT),
    async fetch(req) {
        const url = new URL(req.url)
        const code = url.searchParams.get("code")

        if (!code) {
            return new Response("No code received", { status: 400 })
        }

        console.log("✅ Authorization code received, exchanging for token...")

        try {
            const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")

            const response = await fetch("https://ticktick.com/oauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${credentials}`,
                },
                body: new URLSearchParams({
                    code,
                    grant_type: "authorization_code",
                    redirect_uri: REDIRECT_URI,
                }),
            })

            const data = await response.json() as any

            if (data.access_token) {
                console.log("\n🎉 Success! Add this to your .env:\n")
                console.log(`TICKTICK_ACCESS_TOKEN=${data.access_token}`)
                if (data.refresh_token) {
                    console.log(`TICKTICK_REFRESH_TOKEN=${data.refresh_token}`)
                }
                console.log("")
            } else {
                console.error("❌ Error response:", data)
            }
        } catch (error) {
            console.error("❌ Token exchange failed:", error)
        }

        setTimeout(() => {
            server.stop()
            process.exit(0)
        }, 500)

        return new Response(
            "<html><body><h1>✅ Authorization complete!</h1><p>You can close this tab and go back to the terminal.</p></body></html>",
            { headers: { "Content-Type": "text/html" } }
        )
    },
})

console.log(`🖥️  Local server listening on port ${PORT}`)
