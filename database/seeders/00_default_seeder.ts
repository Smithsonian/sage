import { BaseSeeder } from '@adonisjs/lucid/seeders'

import UserRole from '#models/user_role'
import UserRoles from '#enums/user_roles'
import RepresentationType from '#models/representation_type'
import RepresentationTypes from '#enums/representation_types'
import ResourceType from '#models/resource_type'
import ResourceTypes from '#enums/resource_types'
import ModerationStatus from '#models/moderation_status'
import ModerationStatuses from '#enums/moderation_statuses'

export default class extends BaseSeeder {
  async run() {
    await UserRole.createMany([
      {
        id: UserRoles.USER,
        name: 'User',
      },
      {
        id: UserRoles.ADMIN,
        name: 'Admin',
      },
      {
        id: UserRoles.SUPER_ADMIN,
        name: 'Super Admin',
      },
    ])
    await RepresentationType.createMany([
      {
        id: RepresentationTypes.ALTTEXT,
        name: 'Alt Text',
      },
      {
        id: RepresentationTypes.TEXT,
        name: 'Text',
      },
      {
        id: RepresentationTypes.EMBEDDING,
        name: 'Embedding',
      },
    ])
    await ResourceType.createMany([
      {
        id: ResourceTypes.IMAGE,
        name: 'Image',
      },
      {
        id: ResourceTypes.TEXT,
        name: 'Text',
      },
      {
        id: ResourceTypes.AUDIO,
        name: 'Audio',
      },
      {
        id: ResourceTypes.VIDEO,
        name: 'Video',
      },
    ])
    await ModerationStatus.createMany([
      {
        id: ModerationStatuses.WAITING_APPROVAL,
        name: 'Waiting Approval',
      },
      {
        id: ModerationStatuses.APPROVED,
        name: 'Approved',
      },
      {
        id: ModerationStatuses.REJECTED,
        name: 'Rejected',
      },
      {
        id: ModerationStatuses.FLAGGED,
        name: 'Flagged',
      },
    ])
  }
}
