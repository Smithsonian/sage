import type { HttpContext } from '@adonisjs/core/http'
import Representation from '#models/representation'
import { createRepresentationValidator } from '#validators/representation'
import VisionService from '#services/vision_service'
export default class RepresentationsController {
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'resourceId',
      'representationTypeId',
      'moderationStatusId',
      'prompt',
      'uri',
    ])
    console.log(data)
    await createRepresentationValidator.validate(data)
    const vision = new VisionService()
    const generatedMessageData = await vision.generate(data.prompt, data.uri)
    const representation = await Representation.create({
      resourceId: data.resourceId,
      representationTypeId: data.representationTypeId,
      moderationStatusId: data.moderationStatusId,
      contents: generatedMessageData,
    })
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
