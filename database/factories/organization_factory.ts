import factory from '@adonisjs/lucid/factories'
import Organization from '#models/organization'

export const OrganizationFactory = factory
  .define(Organization, async ({ faker }) => {
    return {}
  })
  .build()