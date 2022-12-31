import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Assignment } from './assignment.entity'
import { Attendance } from './attendance.entity'
import { Class } from './class.entity'
import { Subject } from './subject.entity'

@Entity({ name: 'lessons' })
export class Lesson {
    @PrimaryGeneratedColumn('uuid')
    id: string

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

    @ManyToOne(() => Class, entity => entity.lessons)
    class: Class

    @OneToMany(() => Assignment, assignment => assignment.lesson)
    assignments: Assignment[]

    @OneToMany(() => Attendance, attendance => attendance.lesson)
    attendances: Attendance[]
}
