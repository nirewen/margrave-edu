import { PartialType } from '@nestjs/swagger'
import { User } from 'src/entities/user.entity'

export class CreateUserDTO extends PartialType(User) {}
