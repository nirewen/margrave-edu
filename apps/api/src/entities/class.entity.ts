import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Classroom } from './classroom.entity'
import { Lesson } from './lesson.entity'
import { Subject } from './subject.entity'
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

    @ManyToMany(() => Subject, subject => subject.classes, { cascade: true })
    @JoinTable({ name: 'class_subjects' })
    subjects: Subject[]

    @ManyToMany(() => User, user => user.classes)
    users: User[]
}
