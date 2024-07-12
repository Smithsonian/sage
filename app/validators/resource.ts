import vine from '@vinejs/vine'

/**
 * Validates the Resource's creation action
 */
export const createResourceValidator = vine.compile(
  vine.object({
    title: vine.string().trim().nullable(),
    sourceUri: vine.string().trim().url().normalizeUrl(),
    canonicalId: vine.string().trim(),
    type: vine.enum(['IMAGE', 'TEXT', 'AUDIO', 'VIDEO']),
    organizationId: vine.number().positive(),
  })
)

/**
 * Validates the Resource's update action
 */
export const updateResourceValidator = vine.compile(
  vine.object({
    title: vine.string().trim().nullable(),
    sourceUri: vine.string().trim().url().normalizeUrl(),
    canonicalId: vine.string().trim(),
    type: vine.enum(['IMAGE', 'TEXT', 'AUDIO', 'VIDEO']),
    organizationId: vine.number().positive(),
  })
)
