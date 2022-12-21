import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Class } from './class.entity'
import { Subject } from './subject.entity'

export enum Weekday {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
}

@Entity({ name: 'class_subjects' })
export class ClassSubject {
    @PrimaryGeneratedColumn()
    id: number

    @Column('enum', { enum: Weekday })
    weekday: Weekday

    @ManyToOne(() => Subject, subject => subject.classSubjects)
    subject: Subject

    @ManyToOne(() => Class, entity => entity.classSubjects)
    class: Class
}
