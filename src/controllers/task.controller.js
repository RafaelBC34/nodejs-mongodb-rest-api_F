import Task from '../models/Tasks.js'
import { getPagination } from '../libs/getPagination.js'


export const findOneTask = async (req, res) => {
    const { id } = req.params

    try {    
        const task = await Task.findById(id)

        if (!task) 
            return res
                .status(404)
                .json({message: `Task with id = ${id} does not exist`})
        
        res.json(task)

    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving the task with id = ${id}`
        })
    }
}

export const findAllTasks = async (req, res) => {
    try {

        const {page, size, title} = req.query

        const condition = title ? {
            title: {$regex: new RegExp(title), $options: "i"}
        } : {}

        const {limit, offset} = getPagination(page, size)

        const data = await Task.paginate(condition, {offset, limit})
        
        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something went wrong when retrieving the tasks'
        })
    }
}

export const findAllDoneTasks = async (req, res) => {
    
    try {
        const tasks = await Task.find({done: true})

        if (!tasks) {
            return res
                .status(404)
                .json({
                    message: 'No done tasks were found'
                })
        }

        res.json(tasks)

    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something went wrong when retrieving the tasks'
        })
    }
}

export const createTask = async (req, res) => {

    if (!req.body.title) {
        return res.status(500).json({message: 'Content cannot be empty'})
    }

    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            done: req.body.done ? req.body.done : false
        })
        const savedTask = await newTask.save()
        res.json(savedTask)

    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something went wrong when creating the task'
        })
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params

    try {
        await Task.findByIdAndUpdate(req.params.id, req.body)
        res.json({message: `Task with id = ${id} was updated successfully`})

    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something went wrong when updating the task'
        })
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params

    try {
        const data = await Task.findByIdAndDelete(id)

        if (!data) {
            return res.status(404)
                .json({
                    message: `Task with id = ${id} does not exist`
                })
        }
        res.json({
            message: `Task with id=${data.id} was deleted successfully`
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something went wrong when deleting the task'
        })
    }
    
}