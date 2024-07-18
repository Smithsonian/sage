import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import ResourceTypes from '#enums/resource_types'

const messages = {
  'required': "We're going to need a {{ field }} here, thx.",
  'sourceUri.required':
    "A resource isn't a resource without a source Uniform <em>Resource</em> Identifier.",
  'organizationId.required': 'Who does this resource belong to?',
  'url': "There's something wrong with this URL. 🤔",
}

const fields = {
  sourceUri: 'source URI',
  canonicalId: 'canonical ID',
  organizationId: 'organization ID',
}

vine.messagesProvider = new SimpleMessagesProvider(messages, fields)

/**
 * Validates the Resource's creation action
 */
export const createResourceValidator = vine.compile(
  vine.object({
    title: vine.string().trim().nullable(),
    sourceUri: vine.string().trim().url().normalizeUrl(),
    canonicalId: vine.string().trim(),
    resourceTypeId: vine.enum(ResourceTypes),
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
