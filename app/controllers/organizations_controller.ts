import Organization from '#models/organization'
import { createOrganizationValidator } from '#validators/organization'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrganizationsController {
  /**
   * Display a list of records
   */
  async index({ inertia }: HttpContext) {
    const organizations = await Organization.all()
    return inertia.render('dashboard/organizations/index', { organizations })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('dashboard/organizations/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const data = request.only(['title', 'description'])
    await createOrganizationValidator.validate(data)
    const organization = await Organization.create(data)
    session.flash('notification', {
      id: organization.id,
      type: 'success',
      message: `Created! <em>${organization.title}</em>`,
    })
    return response.redirect().toRoute('dashboard.organizations.show', { id: organization.id })
  }

  /**
   * Show individual record
   */
  async show({ params, inertia }: HttpContext) {
    const organization = await Organization.query()
      .where('id', params.id)
      .preload('users')
      .firstOrFail()
    return inertia.render('dashboard/organizations/show', { organization })
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
  async destroy({ params, response, session }: HttpContext) {
    const organization = await Organization.findByOrFail('id', params.id)
    await organization.delete()
    session.flash('notification', {
      id: params.id,
      type: 'info',
      message: `Deleted! <em>${organization.title}</em>`,
    })
    return response.redirect().toRoute('dashboard.organizations.index')
  }
}
