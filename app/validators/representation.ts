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
    type: vine.enum(['ALTTEXT', 'TEXT', 'EMBEDDING']),
    prompt: vine.string().trim(),
  })
)
