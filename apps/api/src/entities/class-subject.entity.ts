import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm'
import { Class } from './class.entity'
import { Subject } from './subject.entity'

@Entity({ name: 'class_subjects' })
@Unique(['subject', 'class'])
export class ClassSubject {
    @PrimaryColumn('uuid')
    id: string

    @Column('boolean', { array: true, default: [] })
    weekdays: boolean[]

    @ManyToOne(() => Subject, subject => subject.classSubjects)
    subject: Subject

    @ManyToOne(() => Class, entity => entity.classSubjects)
    class: Class
}
