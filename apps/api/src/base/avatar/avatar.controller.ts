import { Controller, Get, Param, Res } from '@nestjs/common'
import { Response } from 'express'
import { Public } from 'src/common/decorators'
import { SupabaseService } from 'src/common/providers/supabase.service'

@Controller('avatar')
export class AvatarController {
    constructor(private readonly supabase: SupabaseService) {}

    @Public()
    @Get(':key')
    downloadAvatar(@Param('key') key: string, @Res() res: Response) {
        const { data } = this.supabase.storage.from('avatars').getPublicUrl(key)

        res.redirect(data.publicUrl)
    }
}
