import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AssignmentsService } from './assignments.service'
import { CreateAssignmentDTO } from './dto/create-assignment.dto'
import { UpdateAssignmentDTO } from './dto/update-assignment.dto'

@Controller('assignments')
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
