import { z } from 'zod'
import dot from 'dot-object'

import { actionWrapper as wrap } from '$lib/api'
import { APIError } from '$lib/types/APIError'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import type { Lesson } from '$lib/types/api/Lesson'

const schema = z.object({
    description: z.string(),
    expiresAt: z.string(),
    lessonId: z.string().uuid(),
})

export const actions: Actions = {
    default: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const obj = dot.object(data) as z.infer<typeof schema>

        obj.lessonId = params.id!

        const result = schema.safeParse(obj)
        console.log('🚀 ~ file: +page.server.ts:25 ~ default:wrap ~ result', result)

        if (!result.success) {
            return fail(400, {
                error: true,
                data: obj,
                errors: result.error.formErrors.fieldErrors,
            })
        }

        try {
            const response = await api.post<Lesson>(`/api/assignments`, result.data)

            throw redirect(302, `/teacher/lessons/${params.id}/assignments/${response.id}/edit/`)
        } catch (error: unknown) {
            console.log('🚀 ~ file: +page.server.ts:39 ~ default:wrap ~ error', error)
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
