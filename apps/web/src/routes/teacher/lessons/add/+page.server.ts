import { z } from 'zod'
import dot from 'dot-object'

import { actionWrapper as wrap } from '$lib/api'
import { APIError } from '$lib/types/APIError'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { Lesson } from '$lib/types/api/Lesson'

const schema = z.object({
    title: z.string(),
    description: z.string(),
    timespan: z.string(),
    tags: z.string().transform(tags => tags.split(',')),
})

export const actions: Actions = {
    default: wrap(async ({ request, api }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const obj = dot.object(data) as z.infer<typeof schema>

        const result = schema.safeParse(obj)
        console.log('🚀 ~ file: +page.server.ts:24 ~ default:wrap ~ result', result)

        if (!result.success) {
            return fail(400, {
                error: true,
                data: obj,
                errors: result.error.formErrors.fieldErrors,
            })
        }

        try {
            const response = await api.post<Lesson>(`/api/lessons`, result.data)

            throw redirect(302, `/admin/lesosns/${response.id}/edit`)
        } catch (error: unknown) {
            console.log('🚀 ~ file: +page.server.ts:38 ~ default:wrap ~ error', error)
            if (error instanceof APIError) {
                return fail(error.status, {
                    error: true,
                    message: error.message,
                    data: result.data,
                })
            }

            throw error
        }
    }),
}
