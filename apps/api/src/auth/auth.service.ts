import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { JwtPayload, JwtSign, Payload } from './auth.interface'

import { User } from 'src/base/users/users.interface'
import { UsersService } from 'src/base/users/users.service'

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService, private users: UsersService, private config: ConfigService) {}

    public async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.users.findOne(username)

        if (!user) {
            return null
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (checkPassword) {
            const { password, ...result } = user

            return result
        }

        return null
    }

    public validateRefreshToken(data: Payload, refreshToken: string): boolean {
        if (!this.jwt.verify(refreshToken, { secret: this.config.get('jwtRefreshSecret') })) {
            return false
        }

        const payload = this.jwt.decode(refreshToken) as { sub: number }
        return payload.sub === data.id
    }

    public jwtSign(data: Payload): JwtSign {
        const payload: JwtPayload = {
            sub: data.id,
            email: data.email,
            role: data.role,
        }

        return {
            access_token: this.jwt.sign(payload),
            refresh_token: this.getRefreshToken(payload.sub),
        }
    }

    private getRefreshToken(sub: number): string {
        return this.jwt.sign(
            { sub },
            {
                secret: this.config.get('jwtRefreshSecret'),
                expiresIn: '7d', // must be > access_token.expiresIn
            }
        )
    }
}
