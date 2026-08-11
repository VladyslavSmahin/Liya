import { sendToTelegram } from "./_telegram.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "method_not_allowed" });
        return;
    }

    let payload = req.body;
    if (typeof payload === "string") {
        try {
            payload = JSON.parse(payload);
        } catch {
            res.status(400).json({ error: "bad_json" });
            return;
        }
    }

    const { status, body } = await sendToTelegram(payload || {}, process.env);
    res.status(status).json(body);
}
