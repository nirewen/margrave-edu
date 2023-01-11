import { z } from 'zod'
import dot from 'dot-object'
import { fail, redirect } from '@sveltejs/kit'

import { actionWrapper as wrap } from '$lib/api'
import type { User } from '$lib/types/User'
import type { Actions } from './$types'

const schema = z.object({
    user: z.object({
        email: z.string().email({ message: 'Email inváido' }),
        password: z.string().optional(),
    }),
    name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
    bio: z.string().optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    birthdate: z.string(),
    level: z.coerce.number(),
})

export const actions: Actions = {
    default: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const obj = dot.object(data) as z.infer<typeof schema>

        const result = schema.safeParse(obj)

        if (!result.success) {
            const { user, ...profile } = obj

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

        await api.patch<User>(`/api/profiles/${params.id}`, obj)

        throw redirect(301, `/admin/users`)
    }),
}
