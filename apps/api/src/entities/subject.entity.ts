import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ClassSubject } from './class-subject.entity'
import { Lesson } from './lesson.entity'
import { User } from './user.entity'

@Entity({ name: 'subjects' })
export class Subject {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: '#0288d1' })
    color: string

    @Column({ default: 'ic:round-school' })
    icon: string

    @Column({ default: '' })
    type: string

    @Column({ default: 20 })
    hours: number

    @ManyToOne(() => User, user => user.subjects)
    teacher: User

    @OneToMany(() => Lesson, lesson => lesson.subject)
    lessons: Lesson[]

    @OneToMany(() => ClassSubject, classSubject => classSubject.subject)
    classSubjects: ClassSubject[]
}
