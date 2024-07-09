import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Organization from '#models/organization'
import Resource from '#models/resource'

export default class extends BaseSeeder {
  async run() {
    await Organization.createMany([
      {
        title: 'Smithsonian American Art Museum',
        description:
          'The Smithsonian American Art Museum is home to one of the largest and most inclusive collections of American art in the world.',
      },
      {
        title: 'Hirshhorn Museum and Sculpture Garden',
        description:
          "Smithsonian's Hirshhorn Museum is a leading voice for contemporary art and culture and provides a national platform for the art and artists of our time.",
      },
    ])
    await Resource.createMany([
      {
        title: 'Pa-lan-te',
        sourceUri: 'https://ids.si.edu/ids/deliveryService?id=SAAM-2020.25.1_1',
        canonicalId: 'SAAM-2020.25.1',
        organizationId: 1,
      },
      {
        title: 'Untitled',
        sourceUri: 'https://ids.si.edu/ids/deliveryService?id=HMSG-66.2747-000001',
        canonicalId: 'HMSG-66.2747',
        organizationId: 2,
      },
    ])
  }
}
