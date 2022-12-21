import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Answer } from './answer.entity'
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

    @OneToMany(() => Answer, answer => answer.assignment)
    answers: Answer[]
}
