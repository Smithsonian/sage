import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required': "It's hard to log someone in without a {{ field }}",
  'email': 'Is that a <em>real</em> email address? 🧐',
  'password.required': "A blank password? That's not very secure. 😅",
})

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(100),
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string(),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(100),
    email: vine.string().email().normalizeEmail(),
    userRoleId: vine.number(),
    organizations: vine.array(vine.number()),
  })
)
