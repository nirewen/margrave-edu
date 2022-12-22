import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Subject } from 'src/entities/subject.entity'
import { SubjectsController } from './subjects.controller'
import { SubjectsService } from './subjects.service'

@Module({
    imports: [TypeOrmModule.forFeature([Subject])],
    controllers: [SubjectsController],
    providers: [SubjectsService],
})
export class SubjectsModule {}
