import Task from '#models/task'
import { createTaskValidator, UpdateTaskValidator } from '#validators/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  async index({ auth }: HttpContext) {
    const user = auth.user!
    await user.preload('tasks')
    return user.tasks
  }
  async store({ auth, request, response }: HttpContext) {
    try {
      const { title, description } = await request.validateUsing(createTaskValidator)
      const user = auth.user!
      await user.related('tasks').create({
        title,
        description,
      })
      return user
    } catch (error) {
      return response.status(400).json({ error: 'Error' })
    }
  }
  async show({ params, response }: HttpContext) {
    try {
      const task = await Task.findByOrFail('id', params.id)
      return task
    } catch (error) {
      return response.status(400).json({ error: 'Task not faund' })
    }
  }
  async update({ params, response, request }: HttpContext) {
    try {
      const task = await Task.findByOrFail('id', params.id)
      const { title, description, done } = await request.validateUsing(UpdateTaskValidator)
      task.merge({ title, description, done })
      return task
    } catch (error) {
      return response.status(400).json({ error: 'Task not faund' })
    }
  }
  async destroy({ params, response }: HttpContext) {
    try {
      const task = await Task.findByOrFail('id', params.id)
      task.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json({ error: 'Task not faund' })
    }
  }
}
