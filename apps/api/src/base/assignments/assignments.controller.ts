import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Payload } from 'src/auth/auth.interface'
import { ReqUser, Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { AssignmentsService } from './assignments.service'
import { CreateAssignmentDTO } from './dto/create-assignment.dto'
import { UpdateAssignmentDTO } from './dto/update-assignment.dto'

@Controller('assignments')
@Roles(UserRole.ADMIN, UserRole.TEACHER)
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) {}

    @Post()
    create(@Body() body: CreateAssignmentDTO) {
        return this.assignmentsService.create(body)
    }

    @Get()
    findAll() {
        return this.assignmentsService.findAll()
    }

    @Get('@me')
    @Roles(UserRole.STUDENT)
    findAllMe(@ReqUser() payload: Payload) {
        return this.assignmentsService.findAllMe(payload.id)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.assignmentsService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateAssignmentDTO) {
        return this.assignmentsService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.assignmentsService.remove(id)
    }
}
