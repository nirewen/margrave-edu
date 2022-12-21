import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Classroom } from './classroom.entity'

export enum Shift {
    MATUTINE = 'MATUTINE',
    VESPERTINE = 'VESPERTINE',
}

@Entity({ name: 'classes' })
export class Class {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    number: string

    @Column()
    period: string

    @Column({ type: 'enum', enum: Shift })
    shift: Shift

    @ManyToOne(() => Classroom, classroom => classroom.classes)
    classroom: Classroom
}
