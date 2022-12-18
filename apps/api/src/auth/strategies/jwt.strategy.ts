import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'src/common/jwt/ExtractJwt'
import { JwtPayload, Payload } from '../auth.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromCookie(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        })
    }

    validate(payload: JwtPayload): Payload {
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
        }
    }
}
