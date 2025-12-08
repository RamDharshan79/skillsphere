import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import './firebaseAdmin.js'
import coursesRoutes from './routes/coursesRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express()

const corsOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000'
// Allow multiple origins for development
const allowedOrigins = [corsOrigin, 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))
app.use(express.json())

app.use('/api', coursesRoutes)
app.use('/api/admin', adminRoutes)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})
