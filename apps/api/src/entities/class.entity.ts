import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm'
import { ClassSubject } from './class-subject.entity'
import { Classroom } from './classroom.entity'
import { User } from './user.entity'

export enum Shift {
    MATUTINE = 'MATUTINE',
    VESPERTINE = 'VESPERTINE',
}

@Entity({ name: 'classes' })
export class Class {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    number: string

    @Column()
    period: string

    @Column({ type: 'enum', enum: Shift })
    shift: Shift

    @ManyToOne(() => Classroom, classroom => classroom.classes)
    classroom: Classroom

    @OneToMany(() => ClassSubject, classSubject => classSubject.class)
    classSubjects: ClassSubject[]

    @ManyToMany(() => User, user => user.classes)
    users: User[]
}
