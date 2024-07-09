/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
// Lazy load controllers.
const LogoutController = () => import('#controllers/auth/logout_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('../app/controllers/auth/register_controller.js')
const DashboardController = () => import('#controllers/dashboard_controller')
const RepresentationsController = () => import('#controllers/representations_controller')
const ResourcesController = () => import('#controllers/resources_controller')
const ApiResourcesController = () => import('#controllers/api/v1/resources_controller')
const OrganizationsController = () => import('#controllers/organizations_controller')

// Home.
router.on('/').renderInertia('home').as('home')
// Authentication Group.
router
  .group(() => {
    router.get('/register', [RegisterController, 'show']).as('register.show')
    // router.post('/register', [RegisterController, 'store']).as('register.store')
    router.get('/login', [LoginController, 'show']).use(middleware.guest()).as('login.show')
    router.post('/login', [LoginController, 'store']).as('login.store')
    router.post('/logout', [LogoutController, 'handle']).as('logout')
    // TODO: Allow users to disable/delete their account?
  })
  .as('auth')
// Admin Dashboard Group.
router
  .group(() => {
    router.get('/', [DashboardController, 'show']).as('index')
    router
      .resource('representations', RepresentationsController)
      .as('representations')
      .only(['store', 'destroy'])
    router.resource('resources', ResourcesController).as('resources')
    router.resource('organizations', OrganizationsController).as('organizations')
  })
  .use(middleware.auth())
  .prefix('dashboard')
  .as('dashboard')
// JSON API.
router
  .group(() => {
    router
      .group(() => {
        router.resource('resources', ApiResourcesController).only(['index', 'show'])
      })
      .prefix('v1')
  })
  .prefix('api')
