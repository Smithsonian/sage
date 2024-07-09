import Resource from '#models/resource'

import type { HttpContext } from '@adonisjs/core/http'

export default class ResourcesController {
  /**
   * Display a list of records
   */
  async index({}: HttpContext) {
    const resources = await Resource.all()
    return resources
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const resource = await Resource.query()
      .where('id', params.id)
      .preload('organization')
      .preload('representations')
      .firstOrFail()
    return resource
  }
}
