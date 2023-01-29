import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Assignment } from './assignment.entity'
import { Class } from './class.entity'
import { Subject } from './subject.entity'
import { User } from './user.entity'

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

    @Column({ default: '1:00' })
    timespan: string

    @Column('text', { array: true, nullable: true, default: [] })
    tags: string[]

    @ManyToOne(() => Subject, subject => subject.lessons)
    subject: Subject

    @ManyToOne(() => Class, entity => entity.lessons)
    class: Class

    @OneToMany(() => Assignment, assignment => assignment.lesson)
    assignments: Assignment[]

    @ManyToMany(() => User, user => user.attendances, { cascade: true })
    @JoinTable({ name: 'attendances' })
    attendances: User[]
}
