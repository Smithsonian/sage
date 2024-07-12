import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'title.required': "I've never seen an organization without a title. 😆",
  'description.required': "Please add a short description of the organization. I'm interested!",
})

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
