import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

@Entity({ name: 'profiles' })
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ default: '' })
    name: string

    @Column({ default: '' })
    bio: string

    @Column({ default: null, nullable: true })
    avatar: string

    @Column({ type: 'date', nullable: true })
    birthdate: string

    @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
    gender: Gender

    @Column({ default: 0 })
    level: number

    @OneToOne(() => User, user => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User
}
