import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { ClassesService } from './classes.service'
import { CreateClassDTO } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'

@Controller('classes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}

    @Post()
    create(@Body() createClassDto: CreateClassDTO) {
        return this.classesService.create(createClassDto)
    }

    @Get()
    findAll() {
        return this.classesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.classesService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
        return this.classesService.update(+id, updateClassDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.classesService.remove(+id)
    }
}
