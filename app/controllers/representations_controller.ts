import type { HttpContext } from '@adonisjs/core/http'
import Representation from '#models/representation'
export default class RepresentationsController {
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['type', 'resourceId', 'contents'])
    console.log(data)
    const representation = await Representation.create(data)
    return response
      .redirect()
      .toRoute('dashboard.resources.show', { id: representation.resourceId })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const representation = await Representation.findByOrFail('id', params.id)
    const resourceId = representation.resourceId
    await representation.delete()
    return response.redirect().toRoute('dashboard.resources.show', { id: resourceId })
  }
}
