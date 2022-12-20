import { Profile } from 'src/entities/profile.entity'
import { User } from 'src/entities/user.entity'
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    listenTo() {
        return User
    }

    async afterInsert(event: InsertEvent<User>) {
        const profile = new Profile()
        profile.user = event.entity

        await event.manager.getRepository(Profile).save(profile)
    }
}
