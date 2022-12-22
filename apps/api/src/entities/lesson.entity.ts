import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Assignment } from './assignment.entity'
import { Attendance } from './attendance.entity'
import { Classroom } from './classroom.entity'
import { Subject } from './subject.entity'

@Entity({ name: 'lessons' })
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ nullable: true })
    description: string

    @Column()
    date: Date

    @Column({ default: 1 })
    timespan: number

    @Column('text', { array: true, nullable: true, default: [] })
    tags: string[]

    @ManyToOne(() => Subject, subject => subject.lessons)
    subject: Subject

    @ManyToOne(() => Classroom, classroom => classroom.lessons)
    classroom: Classroom

    @OneToMany(() => Assignment, assignment => assignment.lesson)
    assignments: Assignment[]

    @OneToMany(() => Attendance, attendance => attendance.lesson)
    attendances: Attendance[]
}
