import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Roles } from 'src/common/decorators'
import { UserRole } from 'src/entities/user.entity'
import { AttendancesService } from './attendances.service'
import { CreateAttendanceDTO } from './dto/create-attendance.dto'

@Controller('attendances')
@Roles(UserRole.ADMIN, UserRole.TEACHER)
export class AttendancesController {
    constructor(private readonly attendancesService: AttendancesService) {}

    @Post()
    create(@Body() body: CreateAttendanceDTO) {
        return this.attendancesService.create(body)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.attendancesService.findOne(id)
    }
}
