import vine from '@vinejs/vine'

/**
 * Validates the Organization's creation action
 */
export const createOrganizationValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim().escape(),
  })
)

/**
 * Validates the Organization's update action
 */
export const updateOrganizationValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim().escape(),
  })
)
