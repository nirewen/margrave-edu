import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import configuration from './configuration'

type Configuration = typeof configuration

@Injectable()
export default class ConfigService extends NestConfigService<Configuration, true> {}
