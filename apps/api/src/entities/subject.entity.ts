import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Lesson } from './lesson.entity'
import { User } from './user.entity'

@Entity({ name: 'subjects' })
export class Subject {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    color: string

    @Column()
    icon: string

    @Column()
    type: string

    @Column()
    hours: number

    @ManyToOne(() => User, user => user.subjects)
    teacher: User

    @OneToMany(() => Lesson, lesson => lesson.subject)
    lessons: Lesson[]
}
