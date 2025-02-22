import Resource from '#models/resource'
import Organization from '#models/organization'
import { createResourceValidator } from '#validators/resource'
import type { HttpContext } from '@adonisjs/core/http'

export default class ResourcesController {
  /**
   * Display a list of records
   */
  async index({ inertia }: HttpContext) {
    const resources = await Resource.query().preload('type').orderBy('updatedAt', 'desc')
    return inertia.render('dashboard/resources/index', { resources })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    const organizations = await Organization.query().select(['id', 'title']).orderBy('title')
    return inertia.render('dashboard/resources/create', { organizations })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'title',
      'sourceUri',
      'canonicalId',
      'resourceTypeId',
      'organizationId',
    ])
    await createResourceValidator.validate(data)
    const resource = await Resource.create(data)
    return response.redirect().toRoute('dashboard.resources.show', { id: resource.id })
  }

  /**
   * Show individual record
   */
  async show({ params, inertia }: HttpContext) {
    const resource = await Resource.query()
      .where('id', params.id)
      .preload('type')
      .preload('organization')
      .preload('representations', (representationQuery) => {
        representationQuery.preload('type').preload('status').orderBy('createdAt', 'desc')
      })
      .firstOrFail()
    return inertia.render('dashboard/resources/show', { resource })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const resource = await Resource.findByOrFail('id', params.id)
    await resource.delete()
    // TODO: Add a flash message.
    return response.redirect().toRoute('dashboard.resources.index')
  }
}
