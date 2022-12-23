import { Module } from '@nestjs/common'
import { AttendancesService } from './attendances.service'
import { AttendancesController } from './attendances.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Attendance } from 'src/entities/attendance.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Attendance])],
    controllers: [AttendancesController],
    providers: [AttendancesService],
})
export class AttendancesModule {}
