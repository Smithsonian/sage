import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import type { ManyToMany, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import Organization from '#models/organization'
import UserRole from '#models/user_role'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userRoleId: number

  @hasOne(() => UserRole, {
    localKey: 'userRoleId',
    foreignKey: 'id',
  })
  declare role: HasOne<typeof UserRole>

  @manyToMany(() => Organization, {
    pivotTable: 'user_organization',
  })
  declare organizations: ManyToMany<typeof Organization>

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)
}
