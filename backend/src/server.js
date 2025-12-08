import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import './firebaseAdmin.js'
import coursesRoutes from './routes/coursesRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express()

const corsOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000'
app.use(cors({ origin: corsOrigin }))
app.use(express.json())

app.use('/api', coursesRoutes)
app.use('/api/admin', adminRoutes)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})
