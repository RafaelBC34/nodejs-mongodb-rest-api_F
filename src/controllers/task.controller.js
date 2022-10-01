import Task from '../models/Tasks.js'

export const findAllTasks = async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
}

export const createTask = async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        done: req.body.done ? req.body.done : false
    })
    const savedTask = await newTask.save()
    res.json(savedTask)
}

export const findOneTask = async (req, res) => {
    const task = await Task.findById(req.params.id)
    res.json(task)
}

export const deleteTask = async (req, res) => {
    const data = await Task.findByIdAndDelete(req.params.id)    
    res.json({
        message: `Task with id=${data.id} was deleted successfully`
    })
}