import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [
      react(),
      {
        name: 'vercel-api-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res) => {
            try {
              const { default: handler } = await import('./api/contact.js')
              if (req.method === 'POST') {
                let body = ''
                req.on('data', chunk => {
                  body += chunk
                })
                req.on('end', async () => {
                  try {
                    req.body = body ? JSON.parse(body) : {}
                  } catch {
                    req.body = {}
                  }
                  res.status = (code) => {
                    res.statusCode = code
                    return res
                  }
                  res.json = (data) => {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(data))
                    return res
                  }
                  await handler(req, res)
                })
              } else {
                res.status = (code) => {
                  res.statusCode = code
                  return res
                }
                res.json = (data) => {
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(data))
                  return res
                }
                await handler(req, res)
              }
            } catch (err) {
              console.error('Dev API Error:', err)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: 'Internal server error in dev API' }))
            }
          })
        }
      }
    ],
  }
})

