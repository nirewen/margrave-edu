import { z } from 'zod'
import dot from 'dot-object'

import { actionWrapper as wrap } from '$lib/api'
import type { Classroom } from '$lib/types/api/Classroom'
import { APIError } from '$lib/types/APIError'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

const schema = z.object({
    number: z.string(),
    period: z.string().regex(/^\d{4}\/\d$/, 'período deve seguir o padrão ano/frac'),
    shift: z.enum(['MORNING', 'AFTERNOON', 'NIGHT']),
    classroomId: z.string().uuid(),
})

export const actions: Actions = {
    default: wrap(async ({ request, api }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const obj = dot.object(data) as z.infer<typeof schema>

        const result = schema.safeParse(obj)

        if (!result.success) {
            return fail(400, {
                error: true,
                data: obj,
                errors: result.error.formErrors.fieldErrors,
            })
        }

        try {
            const response = await api.post<Classroom>(`/api/classes`, result.data)

            console.log('🚀 ~ file: +page.server.ts:36 ~ default:wrap ~ response', response)
            throw redirect(302, `/admin/classes/${response.id}/edit`)
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
