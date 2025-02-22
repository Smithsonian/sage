import { DateTime } from 'luxon'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Resource from '#models/resource'
import User from '#models/user'

/**
 * Organizations which own resources.
 */
export default class Organization extends BaseModel {
  @hasMany(() => Resource)
  declare resources: HasMany<typeof Resource>

  @manyToMany(() => User, {
    pivotTable: 'user_organization',
  })
  declare users: ManyToMany<typeof User>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
