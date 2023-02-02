import { fail, redirect } from '@sveltejs/kit'
import { actionWrapper as wrap } from '$lib/api'

import { type User, profileSchema as schema } from '$lib/types/User'

import { encodeBase64, formatData } from '$lib/util'

import type { Actions } from './$types'

export const actions: Actions = {
    save: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = formatData(formData, schema)

        const result = schema.safeParse(data)

        if (!result.success) {
            const { user, avatar, ...profile } = data

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
            ...data,
            avatar: data.avatar.size > 0 ? await encodeBase64(data.avatar) : null,
        })

        throw redirect(302, `/admin/users/`)
    }),
    delete: wrap(async ({ request, api, params }) => {
        await api.delete(`/api/profiles/${params.id}`)

        throw redirect(302, `/admin/users/`)
    }),
}
