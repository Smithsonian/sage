import ModerationStatuses from '#enums/moderation_statuses'
import RepresentationTypes from '#enums/representation_types'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'type.required': 'What type are we doing here? 🤔',
  'prompt.required': 'This only works if you tell me what to do. 🙂',
})

/**
 * Validates the Representation's creation action
 */
export const createRepresentationValidator = vine.compile(
  vine.object({
    representationTypeId: vine.enum(RepresentationTypes),
    moderationStatusId: vine.enum(ModerationStatuses),
    prompt: vine.string().trim(),
  })
)
