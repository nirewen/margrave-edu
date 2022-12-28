import { Body, Controller, Get, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common'
import { Response } from 'express'

import { CreateUserDTO } from 'src/base/users/dto/create-user.dto'
import { UsersService } from 'src/base/users/users.service'
import { Cookies, Public, ReqUser } from 'src/common/decorators'
import { User } from 'src/entities/user.entity'
import { Payload } from './auth.interface'
import { AuthService } from './auth.service'
import { DuplicateUserGuard, JwtRefreshGuard, LocalAuthGuard } from './guards'

@Controller('/auth')
export class AuthController {
    constructor(private auth: AuthService, private users: UsersService) {}

    @Public()
    @Post('/signin')
    @UseGuards(LocalAuthGuard)
    public signin(@Res() res: Response, @ReqUser() user: User) {
        const tokens = this.auth.jwtSign(user)

        res.cookie('access_token', tokens.access_token, {
            httpOnly: true,
            secure: true,
        })
        res.cookie('refresh_token', tokens.refresh_token, {
            httpOnly: true,
            secure: true,
        })

        res.json(user)
    }

    @Public()
    @Post('/signup')
    @UseGuards(DuplicateUserGuard)
    public async signup(@Res() res: Response, @Body() newUser: CreateUserDTO) {
        const user = await this.users.create(newUser)

        this.signin(res, user)
    }

    @Get('/logout')
    public async logout(@Res() res: Response) {
        res.clearCookie('access_token')
        res.clearCookie('refresh_token')

        res.json({ ok: true })
    }

    @Post('/refresh')
    @UseGuards(JwtRefreshGuard)
    public async refreshToken(
        @Res() res: Response,
        @ReqUser() payload: Payload,
        @Cookies('refresh_token') token: string
    ) {
        if (!token || !this.auth.validateRefreshToken(payload, token)) {
            throw new UnauthorizedException('InvalidRefreshToken')
        }

        const user = await this.users.findOneById(payload.id)

        this.signin(res, user)
    }
}
