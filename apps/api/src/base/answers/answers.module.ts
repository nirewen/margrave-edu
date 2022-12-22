import { Module } from '@nestjs/common'
import { AnswersService } from './answers.service'
import { AnswersController } from './answers.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Answer } from 'src/entities/answer.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Answer])],
    controllers: [AnswersController],
    providers: [AnswersService],
})
export class AnswersModule {}
