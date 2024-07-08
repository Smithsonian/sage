import User from '#models/user'
import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async show({ inertia, auth, response }: HttpContext) {
    if (auth.isAuthenticated) {
      return response.redirect().toRoute('dashboard.index')
    }
    return inertia.render('auth/login')
  }

  async store({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user, !!request.input('remember'))

    return response.redirect().toRoute('dashboard.index')
  }
}
