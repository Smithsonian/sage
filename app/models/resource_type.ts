import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Resource from '#models/resource'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class ResourceType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => Resource)
  declare resources: HasMany<typeof Resource>

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
