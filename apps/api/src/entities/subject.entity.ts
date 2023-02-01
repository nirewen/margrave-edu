import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Class } from './class.entity'
import { Lesson } from './lesson.entity'
import { User } from './user.entity'

@Entity({ name: 'subjects' })
export class Subject {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ default: '#0288d1' })
    color: string

    @Column({ default: 'mdi:school' })
    icon: string

    @Column({ default: '' })
    type: string

    @Column({ default: 20 })
    hours: number

    @ManyToOne(() => User, user => user.subjects)
    teacher: User

    @OneToMany(() => Lesson, lesson => lesson.subject, { cascade: true })
    lessons: Lesson[]

    @ManyToMany(() => Class, entity => entity.subjects)
    classes: Class[]
}
