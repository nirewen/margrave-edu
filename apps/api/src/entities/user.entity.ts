import { Exclude } from 'class-transformer'
import { Allow } from 'class-validator'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Profile } from './profile.entity'

export enum UserRole {
    ADMIN,
    TEACHER,
    STUDENT,
}

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    @Allow()
    @Exclude({ toPlainOnly: true })
    password: string

    @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
    role: UserRole

    @OneToOne(() => Profile)
    @JoinColumn({ name: 'id' })
    profile: Profile

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
