import { DateTime } from 'luxon'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
import Resource from '#models/resource'
import RepresentationType from '#models/representation_type'
import ModerationStatus from '#models/moderation_status'
export default class Representation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare resourceId: number

  @belongsTo(() => Resource)
  declare resource: BelongsTo<typeof Resource>

  @column()
  declare representationTypeId: number

  @belongsTo(() => RepresentationType)
  declare type: BelongsTo<typeof RepresentationType>

  @column()
  declare moderationStatusId: number

  @hasOne(() => ModerationStatus, {
    foreignKey: 'id',
    localKey: 'moderationStatusId',
  })
  declare status: HasOne<typeof ModerationStatus>

  @column({ prepare: (value) => JSON.stringify(value) })
  declare contents: object

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
