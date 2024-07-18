import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'representations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('representation_type_id')
        .unsigned()
        .references('representation_types.id')
        .notNullable()
      table
        .integer('moderation_status_id')
        .unsigned()
        .references('moderation_statuses.id')
        .defaultTo(1)
      table.json('contents')
      table.integer('resource_id').unsigned().references('resources.id').onDelete('CASCADE')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
