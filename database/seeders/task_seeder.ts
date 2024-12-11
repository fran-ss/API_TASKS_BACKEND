import Task from '#models/task'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Task.createMany([
      {
        title: 'Estudar',
        description: 'Estudar nodeJS',
        userId: 1,
      },
      {
        title: 'Ir a Escola ',
        description: 'as 13:00',
        userId: 2,
      },
      {
        title: 'Ir a Academia',
        description: 'as 8:00',
        userId: 2,
      },
    ])
  }
}
