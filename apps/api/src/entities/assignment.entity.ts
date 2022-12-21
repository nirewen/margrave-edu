import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Lesson } from './lesson.entity'

@Entity({ name: 'assignments' })
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    expiresAt: Date

    @ManyToOne(() => Lesson)
    lesson: Lesson
}
