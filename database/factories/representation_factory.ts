import factory from '@adonisjs/lucid/factories'
import Representation from '#models/representation'

export const RepresentationFactory = factory
  .define(Representation, async ({ faker }) => {
    return {}
  })
  .build()