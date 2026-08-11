// Спільна логіка для serverless-функції та для локального dev-сервера.
const MAX_LEN = 2000;

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function trim(value, limit = 200) {
    return String(value ?? "").trim().slice(0, limit);
}

/**
 * @returns {{ status: number, body: object }}
 */
export async function sendToTelegram(payload, env) {
    const token = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        return { status: 500, body: { error: "not_configured" } };
    }

    // приманка для ботів: справжня людина це поле не заповнює
    if (trim(payload.company)) {
        return { status: 200, body: { ok: true } };
    }

    const name = trim(payload.name, 120);
    const email = trim(payload.email, 200);
    const message = trim(payload.message, MAX_LEN);
    const source = payload.source === "poems" ? "Сторінка віршів" : "Головна сторінка";

    if (!message) {
        return { status: 400, body: { error: "empty_message" } };
    }

    const lines = [`<b>Нове повідомлення з сайту</b>`, `Звідки: ${escapeHtml(source)}`];
    if (name) lines.push(`Ім’я: ${escapeHtml(name)}`);
    if (email) lines.push(`E-mail: ${escapeHtml(email)}`);
    lines.push("", escapeHtml(message));

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: lines.join("\n"),
            parse_mode: "HTML",
            disable_web_page_preview: true,
        }),
    });

    if (!response.ok) {
        const details = await response.text();
        console.error("Telegram API error:", response.status, details);
        return { status: 502, body: { error: "telegram_failed" } };
    }

    return { status: 200, body: { ok: true } };
}
