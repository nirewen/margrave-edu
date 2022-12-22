import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators/roles.decorator'
import { UserRole } from 'src/entities/user.entity'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('/users')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Post()
    create(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.create(createUserDTO)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOneById(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() newUser: UpdateUserDTO) {
        return this.userService.update(id, newUser)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id)
    }
}
