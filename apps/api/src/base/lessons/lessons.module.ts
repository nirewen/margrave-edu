import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lesson } from 'src/entities/lesson.entity'
import { LessonsController } from './lessons.controller'
import { LessonsService } from './lessons.service'

@Module({
    imports: [TypeOrmModule.forFeature([Lesson])],
    controllers: [LessonsController],
    providers: [LessonsService],
    exports: [LessonsService],
})
export class LessonsModule {}
