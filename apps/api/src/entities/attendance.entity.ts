import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Lesson } from './lesson.entity'
import { User } from './user.entity'

@Entity({ name: 'attendances' })
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: true })
    present: boolean

    @ManyToOne(() => User, user => user.attendances)
    user: User

    @ManyToOne(() => Lesson, lesson => lesson.attendances)
    lesson: Lesson
}
