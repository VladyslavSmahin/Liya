import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel-функції в dev не працюють, тому /api/send обслуговуємо тим самим модулем.
function apiDevPlugin(env) {
  return {
    name: 'api-dev',
    configureServer(server) {
      server.middlewares.use('/api/send', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'method_not_allowed' }))
          return
        }

        const chunks = []
        for await (const chunk of req) chunks.push(chunk)

        let payload = {}
        try {
          payload = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
        } catch {
          res.statusCode = 400
          res.end(JSON.stringify({ error: 'bad_json' }))
          return
        }

        const { sendToTelegram } = await server.ssrLoadModule('/api/_telegram.js')
        const { status, body } = await sendToTelegram(payload, env)

        res.statusCode = status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(body))
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // читаємо .env.local без префікса VITE_ — токен лишається на сервері
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), apiDevPlugin(env)],
  }
})
