import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'resources'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('source_uri').notNullable()
      table.string('title').nullable()
      table.string('canonical_id').index().nullable()
      table.integer('resource_type_id').unsigned().references('resource_types.id').notNullable()
      table.integer('organization_id').unsigned().references('organizations.id').onDelete('CASCADE')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
