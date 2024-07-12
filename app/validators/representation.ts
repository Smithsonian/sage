import vine from '@vinejs/vine'

/**
 * Validates the Representation's creation action
 */
export const createRepresentationValidator = vine.compile(
  vine.object({
    type: vine.enum(['ALTTEXT', 'TEXT', 'EMBEDDING']),
    prompt: vine.string().trim(),
  })
)
