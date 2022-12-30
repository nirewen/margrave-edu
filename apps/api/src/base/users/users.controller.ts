import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { Payload } from 'src/auth/auth.interface'
import { RolesGuard } from 'src/auth/guards'
import { ReqUser } from 'src/common/decorators'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UserRole } from 'src/entities/user.entity'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('/users')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Get('/teachers')
    findAllTeachers() {
        return this.userService.findAllByRole(UserRole.TEACHER)
    }

    @Get('/students')
    findAllStudents() {
        return this.userService.findAllByRole(UserRole.STUDENT)
    }

    @Post()
    create(@Body() body: CreateUserDTO) {
        return this.userService.create(body)
    }

    @Get('/@me')
    @Roles(UserRole.STUDENT, UserRole.TEACHER)
    public async me(@ReqUser() payload: Payload) {
        const user = await this.userService.findOneById(payload.id)

        return user
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOneById(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
        return this.userService.update(id, body)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id)
    }
}
