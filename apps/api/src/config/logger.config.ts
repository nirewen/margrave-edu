import type { Request } from 'express'
import type { IncomingMessage } from 'http'
import { nanoid } from 'nanoid'
import type { Params } from 'nestjs-pino'
import { multistream } from 'pino'
import type { ReqId } from 'pino-http'

export const loggerOptions: Params = {
    pinoHttp: [
        {
            quietReqLogger: true,
            genReqId: (req: IncomingMessage): ReqId => (<Request>req).header('X-Request-Id') || nanoid(),
            ...(process.env.NODE_ENV === 'production'
                ? {}
                : {
                      level: 'debug',
                      transport: {
                          target: 'pino-pretty',
                          options: { sync: true, singleLine: true },
                      },
                  }),
        },
        multistream(
            [
                { level: 'debug', stream: process.stdout },
                { level: 'error', stream: process.stderr },
                { level: 'fatal', stream: process.stderr },
            ],
            { dedupe: true }
        ),
    ],
}
