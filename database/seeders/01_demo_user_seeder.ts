import { BaseSeeder } from '@adonisjs/lucid/seeders'

import User from '#models/user'
import UserRoles from '#enums/user_roles'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'James Smithson',
      email: 'super.admin@si.edu',
      password: 'password',
      userRoleId: UserRoles.SUPER_ADMIN,
    })
    await User.create({
      fullName: 'Mary Vaux Walcott',
      email: 'admin@si.edu',
      password: 'password',
      userRoleId: UserRoles.ADMIN,
    })
    await User.create({
      fullName: 'Dr. Charles Doolittle Walcott',
      email: 'user@si.edu',
      password: 'password',
      userRoleId: UserRoles.USER,
    })
  }
}
