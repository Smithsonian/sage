import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Organization from '#models/organization'
import Representation from '#models/representation'
export default class Resource extends BaseModel {
  @hasMany(() => Representation)
  declare representations: HasMany<typeof Representation>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare organizationId: number

  @belongsTo(() => Organization)
  declare organization: BelongsTo<typeof Organization>

  @column()
  declare title: string | null

  @column()
  declare sourceUri: string

  @column()
  declare canonicalId: string

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
