import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Class } from './class.entity'
import { Subject } from './subject.entity'

export enum Weekday {
    SUNDAY = 1,
    MONDAY = 2,
    TUESDAY = 3,
    WEDNESDAY = 4,
    THURSDAY = 5,
    FRIDAY = 6,
    SATURDAY = 7,
}

@Entity({ name: 'class_subjects' })
export class ClassSubject {
    @PrimaryGeneratedColumn()
    id: number

    @Column('enum', { enum: Weekday, array: true, default: [] })
    weekdays: Weekday[]

    @ManyToOne(() => Subject, subject => subject.classSubjects)
    subject: Subject

    @ManyToOne(() => Class, entity => entity.classSubjects)
    class: Class
}
