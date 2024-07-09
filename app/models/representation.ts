import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Resource from '#models/resource'

export default class Representation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare resourceId: number

  @belongsTo(() => Resource)
  declare resource: BelongsTo<typeof Resource>

  @column()
  declare type: string

  @column({ prepare: (value) => JSON.stringify(value) })
  declare contents: object

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
