import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Assignment } from './assignment.entity'
import { User } from './user.entity'

@Entity({ name: 'answers' })
export class Answer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    final: boolean

    @ManyToOne(() => Assignment, assignment => assignment.answers)
    assignment: Assignment

    @ManyToOne(() => User, user => user.answers)
    user: User
}
