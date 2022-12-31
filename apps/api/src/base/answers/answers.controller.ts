import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { Payload } from 'src/auth/auth.interface'
import { ReqUser, Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { AnswersService } from './answers.service'
import { CreateAnswerDTO } from './dto/create-answer.dto'
import { UpdateAnswerDTO } from './dto/update-answer.dto'

@Controller('answers')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) {}

    @Post()
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
    findOne(@Param('id', ParseIntPipe) id: string) {
        return this.answersService.findOne(id)
    }

    @Get(':id/@me')
    findMinesByAssignmentId(@Param('id', ParseIntPipe) id: string, @ReqUser() user: Payload) {
        return this.answersService.findMine(user.id, id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: string, @Body() body: UpdateAnswerDTO) {
        return this.answersService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: string) {
        return this.answersService.remove(id)
    }
}
