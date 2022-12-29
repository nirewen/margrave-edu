import { Global, Module } from '@nestjs/common'

import { ConfigService } from './providers/config.service'
import { SupabaseService } from './providers/supabase.service'

@Global()
@Module({
    providers: [ConfigService, SupabaseService],
    exports: [ConfigService, SupabaseService],
})
export class CommonModule {}
