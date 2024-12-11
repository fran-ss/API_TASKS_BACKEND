import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        name: 'Franciane',
        email: 'franciane@gmail.com',
        password: 'segret',
      },
      {
        name: 'Moana',
        email: 'Moana@gmail.com',
        password: 'segret',
      },
    ])
  }
}
