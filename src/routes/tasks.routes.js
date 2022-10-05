import { Router } from 'express'
import * as TaskController from '../controllers/task.controller.js'

const router = Router()


router.get('/done', TaskController.findAllDoneTasks)

router.get('/', TaskController.findAllTasks)

router.get('/:id', TaskController.findOneTask)

router.post('/', TaskController.createTask)

router.put('/:id', TaskController.updateTask)

router.delete('/:id', TaskController.deleteTask)

export default router