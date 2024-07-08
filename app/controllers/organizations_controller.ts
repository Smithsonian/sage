import Organization from '#models/organization'

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
  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'description'])
    const organization = await Organization.create(data)
    // await cache.set(`$page:${page.id}`, page)
    // session.flash('notification', {
    //   id: page.id,
    //   type: 'success',
    //   message: `Published page! <em>${page.title}</em>`,
    // })
    return response.redirect().toRoute('dashboard.organizations.show', { id: organization.id })
  }

  /**
   * Show individual record
   */
  async show({ params, inertia }: HttpContext) {
    const organization = await Organization.findByOrFail('id', params.id)
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
  async destroy({ params, response }: HttpContext) {
    const organization = await Organization.findByOrFail('id', params.id)
    await organization.delete()
    // TODO: Add a flash message.
    return response.redirect().toRoute('dashboard.organizations.index')
  }

}
