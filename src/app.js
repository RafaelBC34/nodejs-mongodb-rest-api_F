import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import TasksRoutes from './routes/tasks.routes.js'

const app = express()

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
// Para la correcta interpretación de los mensajes en formato JSON
app.use(express.json())
// Para la correcta interpretación de formularios HTML
app.use(express.urlencoded({extended: false}))
// Para permitir peticiones desde otros dominios
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my application' })
})

app.use('/api/tasks', TasksRoutes)

export default app