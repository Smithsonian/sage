import factory from '@adonisjs/lucid/factories'
import Resource from '#models/resource'

export const ResourceFactory = factory
  .define(Resource, async ({ faker }) => {
    return {}
  })
  .build()