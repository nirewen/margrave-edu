import { Injectable } from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { ConfigService } from './config.service'

@Injectable()
export class SupabaseService extends SupabaseClient {
    constructor(config: ConfigService) {
        super(config.get('storage.url'), config.get('storage.key'))
    }
}
