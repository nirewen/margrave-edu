import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'profiles' })
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, user => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

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
