import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ClassSubject } from './class-subject.entity'
import { Classroom } from './classroom.entity'
import { Lesson } from './lesson.entity'
import { User } from './user.entity'

export enum Shift {
    MORNING = 'MORNING',
    AFTERNOON = 'AFTERNOON',
    NIGHT = 'NIGHT',
}

@Entity({ name: 'classes' })
export class Class {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    number: string

    @Column()
    period: string

    @Column({ type: 'enum', enum: Shift })
    shift: Shift

    @ManyToOne(() => Classroom, classroom => classroom.classes)
    classroom: Classroom

    @OneToMany(() => Lesson, lesson => lesson.class)
    lessons: Lesson[]

    @OneToMany(() => ClassSubject, classSubject => classSubject.class, { cascade: true })
    classSubjects: ClassSubject[]

    @ManyToMany(() => User, user => user.classes)
    users: User[]
}
