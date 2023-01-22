import { Module } from '@nestjs/common'
import { ClassroomsService } from './classrooms.service'
import { ClassroomsController } from './classrooms.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Classroom } from 'src/entities/classroom.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Classroom])],
    controllers: [ClassroomsController],
    providers: [ClassroomsService],
    exports: [ClassroomsService],
})
export class ClassroomsModule {}
