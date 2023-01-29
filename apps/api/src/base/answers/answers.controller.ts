import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { Payload } from 'src/auth/auth.interface'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser, Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { AnswersService } from './answers.service'
import { CreateAnswerDTO } from './dto/create-answer.dto'
import { UpdateAnswerDTO } from './dto/update-answer.dto'

@Controller('answers')
@UseGuards(RolesGuard)
export class AnswersController {
    constructor(private readonly answersService: AnswersService) {}

    @Post()
    @Roles(UserRole.STUDENT)
    create(@ReqUser() user: Payload, @Body() body: CreateAnswerDTO) {
        return this.answersService.create(user.id, body)
    }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    findAll() {
        return this.answersService.findAll()
    }

    @Get(':id')
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    findOne(@Param('id') id: string) {
        return this.answersService.findOne(id)
    }

    @Get(':id/@me')
    findMinesByAssignmentId(@Param('id') id: string, @ReqUser() user: Payload) {
        return this.answersService.findMine(user.id, id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateAnswerDTO) {
        return this.answersService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.answersService.remove(id)
    }
}
