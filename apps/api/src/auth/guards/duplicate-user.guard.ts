import { BadRequestException, CanActivate, ExecutionContext, Inject } from '@nestjs/common'
import { Request } from 'express'
import { UsersService } from 'src/base/users/users.service'

export class DuplicateUserGuard implements CanActivate {
    constructor(@Inject(UsersService) private users: UsersService) {}

    public async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>()

        try {
            const user = await this.users.findOne(req.body.email)

            if (user) {
                throw new BadRequestException('There is already an user with this email registered')
            }
        } catch (error) {}

        return true
    }
}
