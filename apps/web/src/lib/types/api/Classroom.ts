import type { Class } from './Class'

export enum ClassroomType {
    REGULAR = 'REGULAR',
    COMPUTER = 'COMPUTER',
    LABORATORY = 'LABORATORY',
    GYMNASIUM = 'GYMNASIUM',
}

export type Classroom = {
    id: string
    building: string
    capacity: number
    type: ClassroomType
    classes: Class[]
}
