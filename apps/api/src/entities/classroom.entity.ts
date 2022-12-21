import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Class } from './class.entity'
import { Lesson } from './lesson.entity'

export enum ClassroomType {
    REGULAR = 'REGULAR',
    COMPUTER = 'COMPUTER',
    LABORATORY = 'LABORATORY',
    GYMNASIUM = 'GYMNASIUM',
}

@Entity({ name: 'classrooms' })
export class Classroom {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    building: string

    @Column()
    capacity: number

    @Column({ type: 'enum', enum: ClassroomType })
    type: ClassroomType

    @OneToMany(() => Class, entity => entity.classroom)
    classes: Class[]

    @OneToMany(() => Lesson, lesson => lesson.classroom)
    lessons: Lesson[]
}
