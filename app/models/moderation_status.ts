import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Representation from '#models/representation'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class ModerationStatus extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => Representation)
  declare representations: HasMany<typeof Representation>

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

}
