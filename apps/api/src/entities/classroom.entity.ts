import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Class } from './class.entity'

export enum ClassroomType {
    REGULAR = 'REGULAR',
    COMPUTER = 'COMPUTER',
    LABORATORY = 'LABORATORY',
    GYMNASIUM = 'GYMNASIUM',
}

@Entity({ name: 'classrooms' })
export class Classroom {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true })
    building: string

    @Column()
    capacity: number

    @Column({ type: 'enum', enum: ClassroomType })
    type: ClassroomType

    @OneToMany(() => Class, entity => entity.classroom)
    classes: Class[]
}
