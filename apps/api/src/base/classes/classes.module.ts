import { Module } from '@nestjs/common'
import { ClassesService } from './classes.service'
import { ClassesController } from './classes.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Class } from 'src/entities/class.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Class])],
    controllers: [ClassesController],
    providers: [ClassesService],
})
export class ClassesModule {}
