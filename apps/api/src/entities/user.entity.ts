import { Exclude } from 'class-transformer'
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Profile } from './profile.entity'

export enum UserRole {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
}

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string

    @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
    role: UserRole

    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
