import { Module } from '@nestjs/common'
import { ClassSubjectsService } from './class-subjects.service'
import { ClassSubjectsController } from './class-subjects.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClassSubject } from 'src/entities/class-subject.entity'

@Module({
    imports: [TypeOrmModule.forFeature([ClassSubject])],
    controllers: [ClassSubjectsController],
    providers: [ClassSubjectsService],
})
export class ClassSubjectsModule {}
