import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Organization from '#models/organization'
import Representation from '#models/representation'
import ResourceType from '#models/resource_type'
export default class Resource extends BaseModel {
  @hasMany(() => Representation)
  declare representations: HasMany<typeof Representation>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare organizationId: number

  @belongsTo(() => Organization, {
    foreignKey: 'organizationId',
  })
  declare organization: BelongsTo<typeof Organization>

  @column()
  declare resourceTypeId: number

  @belongsTo(() => ResourceType, {
    foreignKey: 'resourceTypeId',
  })
  declare type: BelongsTo<typeof ResourceType>

  @column()
  declare title: string | null

  @column()
  declare sourceUri: string

  @column()
  declare canonicalId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
