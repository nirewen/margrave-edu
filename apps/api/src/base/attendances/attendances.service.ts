import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Attendance } from 'src/entities/attendance.entity'
import { Repository } from 'typeorm'
import { CreateAttendanceDTO } from './dto/create-attendance.dto'

@Injectable()
export class AttendancesService {
    constructor(@InjectRepository(Attendance) private readonly attendances: Repository<Attendance>) {}

    create(body: CreateAttendanceDTO) {
        const attendance = this.attendances.create(body)

        return this.attendances.save(attendance)
    }

    findOne(id: number) {
        return this.attendances.findOneBy({ id })
    }
}
