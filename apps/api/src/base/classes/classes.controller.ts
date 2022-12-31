import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { ClassesService } from './classes.service'
import { CreateClassDTO } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'

@Controller('classes')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}

    @Post()
    create(@Body() body: CreateClassDTO) {
        return this.classesService.create(body)
    }

    @Get()
    findAll() {
        return this.classesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.classesService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: UpdateClassDto) {
        return this.classesService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.classesService.remove(id)
    }
}
