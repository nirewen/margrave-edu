import { z } from 'zod'
import dot from 'dot-object'
import { fail, redirect } from '@sveltejs/kit'

import { actionWrapper as wrap } from '$lib/api'
import type { User } from '$lib/types/User'
import type { Actions } from './$types'
import { encodeBase64 } from '$lib/util'

const schema = z.object({
    user: z.object({
        email: z.string().email({ message: 'Email inváido' }),
        role: z.enum(['ADMIN', 'TEACHER', 'STUDENT']),
        password: z.string().optional(),
    }),
    name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
    bio: z.string().optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    birthdate: z.string().regex(/^\d{4}-[01]\d-[0-3]\d$/, 'Data deve ser uma data válida'),
    level: z.coerce.number(),
    avatar: z.instanceof(Blob),
})

export const actions: Actions = {
    save: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const obj = dot.object(data) as z.infer<typeof schema>

        const result = schema.safeParse(obj)

        if (!result.success) {
            const { user, avatar, ...profile } = obj

            return fail(400, {
                error: true,
                data: {
                    user: {
                        email: user.email,
                        password: '',
                        profile,
                    },
                },
                errors: result.error.formErrors,
            })
        }

        const response = await api.patch<User>(`/api/profiles/${params.id}`, {
            ...obj,
            avatar: obj.avatar.size > 0 ? await encodeBase64(obj.avatar) : null,
        })

        throw redirect(301, `/admin/users`)
    }),
    delete: wrap(async ({ request, api, params }) => {
        await api.delete(`/api/profiles/${params.id}`)

        throw redirect(301, `/admin/users`)
    }),
}
