import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async show({ inertia, auth }: HttpContext) {
    await auth.check()
    const user = auth.user?.serialize()
    return inertia.render('dashboard/index', { user })
  }
}
