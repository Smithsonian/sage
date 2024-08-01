import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Organization from '#models/organization'
import { registerValidator, updateValidator } from '#validators/auth'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const users = await User.query()
      .preload('role')
      .preload('organizations')
      .orderBy('updatedAt', 'desc')
    return inertia.render('dashboard/users/index', { users })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    // TODO: Add permissions. Only super users, and organization admins can create or edit new users?
    const organizations = await Organization.query().select(['id', 'title']).orderBy('title')
    return inertia.render('dashboard/users/create', { organizations })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password', 'userRoleId', 'organizations'])
    await registerValidator.validate(data)
    const user = await User.create(data)
    // Update the User's organizations.
    await user.related('organizations').attach(data.organizations)
    return response.redirect().toRoute('dashboard.users.show', { id: user.id })
  }

  /**
   * Show individual record
   */
  async show({ inertia, params }: HttpContext) {
    const user = await User.query()
      .where('id', params.id)
      .preload('role')
      .preload('organizations')
      .firstOrFail()
    return inertia.render('dashboard/users/show', { user })
  }

  /**
   * Edit individual record
   */
  async edit({ inertia, params }: HttpContext) {
    const organizations = await Organization.query().select(['id', 'title']).orderBy('title')
    const user = await User.query()
      .where('id', params.id)
      .preload('role')
      .preload('organizations')
      .firstOrFail()
    return inertia.render('dashboard/users/edit', { user, organizations })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'userRoleId', 'organizations'])
    await updateValidator.validate(data)
    const user = await User.findByOrFail('id', params.id)
    const { organizations, ...userInfo } = data
    await user.merge(userInfo).save()
    // Update the User's organizations.
    await user.related('organizations').sync(organizations)
    return response.redirect().toRoute('dashboard.users.show', { id: user.id })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findByOrFail('id', params.id)
    await user.related('organizations').detach()
    await user.delete()
    // TODO: Add a flash message.
    return response.redirect().toRoute('dashboard.users.index')
  }
}
