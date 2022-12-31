import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Assignment } from './assignment.entity'
import { User } from './user.entity'

@Entity({ name: 'answers' })
export class Answer {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    content: string

    @Column({ default: false })
    final: boolean

    @ManyToOne(() => Assignment, assignment => assignment.answers)
    assignment: Assignment

    @ManyToOne(() => User, user => user.answers)
    user: User
}
