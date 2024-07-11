import { BaseCommand, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class StoreUser extends BaseCommand {
  static commandName = 'store:user'
  static description = 'Create a new user.'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
  }

  @flags.string()
  declare password: string

  @flags.string()
  declare email: string

  @flags.string({
    flagName: 'name',
  })
  declare fullName: string

  async run() {
    this.logger.info('Running store:user command')
    // Commands cannot have top level imports, so we must import within the run method.
    const { default: User } = await import('#models/user')
    const user = await User.create({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
    })
    if (user) {
      this.logger.success('User created successfully')
    } else {
      this.logger.error('Failed to create user')
    }
  }
}
