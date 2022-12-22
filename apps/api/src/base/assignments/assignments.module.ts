import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Assignment } from 'src/entities/assignment.entity'
import { AssignmentsController } from './assignments.controller'
import { AssignmentsService } from './assignments.service'

@Module({
    imports: [TypeOrmModule.forFeature([Assignment])],
    controllers: [AssignmentsController],
    providers: [AssignmentsService],
    exports: [AssignmentsService],
})
export class AssignmentsModule {}
