import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'representations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .enum('type', ['ALTTEXT', 'TEXT', 'EMBEDDING'], {
          enumName: 'representation_type',
          useNative: true,
        })
        .defaultTo('ALTTEXT')
      table.json('contents')
      table.integer('resource_id').unsigned().references('resources.id').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.raw('DROP TYPE IF EXISTS representation_type').dropTable(this.tableName)
  }
}
