import { Controller, Get } from '@nestjs/common'

import { AssignmentsService } from '../assignments/assignments.service'
import { ClassesService } from '../classes/classes.service'
import { LessonsService } from '../lessons/lessons.service'
import { SubjectsService } from '../subjects/subjects.service'
import { UsersService } from '../users/users.service'

@Controller('stats')
export class StatsController {
    constructor(
        private readonly assignmentsService: AssignmentsService,
        private readonly classesService: ClassesService,
        private readonly lessonsService: LessonsService,
        private readonly subjectsService: SubjectsService,
        private readonly usersService: UsersService
    ) {}

    @Get()
    async countAll() {
        const [assignments, classes, lessons, subjects, users] = await Promise.all([
            this.countAssignments(),
            this.countClasses(),
            this.countLessons(),
            this.countSubjects(),
            this.countUsers(),
        ])

        return { assignments, classes, lessons, subjects, users }
    }

    @Get('/assignments')
    async countAssignments() {
        return this.assignmentsService.count()
    }

    @Get('/classes')
    async countClasses() {
        return this.classesService.count()
    }

    @Get('/lessons')
    async countLessons() {
        return this.lessonsService.count()
    }

    @Get('/subjects')
    async countSubjects() {
        return this.subjectsService.count()
    }

    @Get('/users')
    async countUsers() {
        return this.usersService.count()
    }
}
