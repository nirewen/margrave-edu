import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'profiles' })
export class Profile {
    @PrimaryColumn()
    @OneToOne(() => User, user => user.id)
    id: number

    @Column({ default: '' })
    name: string

    @Column({ default: '' })
    bio: string

    @Column({ default: 'default-avatar.png' })
    avatar: string

    @Column({ nullable: true })
    birthdate: Date

    @Column({ default: 0 })
    level: number
}
