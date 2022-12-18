import { Reflector } from '@nestjs/core'
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common'
import { User } from 'src/entities/user.entity'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler()) || []
        const rolesClass = this.reflector.get<string[]>('roles', context.getClass()) || []

        const req = context.switchToHttp().getRequest()

        if (!roles.length && !rolesClass.length) {
            return true
        }

        const allRoles = [...roles, ...rolesClass]

        const user: User = req.user

        if (!user) {
            throw new InternalServerErrorException('Cannot verify user authorization')
        }

        if (!allRoles.includes(user.role)) {
            throw new UnauthorizedException("You don't have enough permission")
        }

        return true
    }
}
