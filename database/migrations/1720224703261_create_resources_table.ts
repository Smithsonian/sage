import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'resources'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('source_uri').notNullable()
      table.string('title').nullable()
      table.string('canonical_id').index().nullable()
      table
        .enum('resource_type', ['IMAGE', 'TEXT', 'AUDIO', 'VIDEO'], {
          enumName: 'resource_type',
          useNative: true,
        })
        .defaultTo('IMAGE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('organization_id').unsigned().references('organizations.id').onDelete('CASCADE')
      table.unique(['source_uri', 'canonical_id'])
    })
  }

  async down() {
    this.schema.raw('DROP TYPE IF EXISTS "resource_type"')
    this.schema.dropTable(this.tableName)
  }
}
