import { cron } from '@elysiajs/cron'
import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { lucia } from '@/server/auth/lucia'
import { postRoute } from '@/server/routes/post.route'
import { userRoute } from '@/server/routes/user.route'

const app = new Elysia({ prefix: '/api' })
  .use(
    // cron job to delete expired sessions every week
    cron({
      name: 'delete expired sessions',
      pattern: '0 0 * * 0',
      run: async () => {
        await lucia.deleteExpiredSessions()
      },
    }),
  )
  .use(swagger())
  .use(userRoute)
  .use(postRoute)
  .compile()

export const handler = app.handle

export type App = typeof app
