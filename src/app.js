import express from 'express'
import TasksRoutes from './routes/tasks.routes.js'

const app = express()

// Settings
app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.use('/api/tasks', TasksRoutes)


// Routes
app.get('/', (req, res) => {
    res.json({message: 'Welcome to my application'})
})

export default app