import { Exclude } from 'class-transformer'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Answer } from './answer.entity'
import { Profile } from './profile.entity'
import { Subject } from './subject.entity'

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

    @OneToMany(() => Subject, subject => subject.teacher)
    @JoinColumn({ name: 'teacherId' })
    subjects: Subject[]

    @OneToMany(() => Answer, answer => answer.user)
    answers: Answer[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
