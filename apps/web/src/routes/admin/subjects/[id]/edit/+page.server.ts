import { z } from 'zod'
import dot from 'dot-object'

import { actionWrapper as wrap } from '$lib/api'
import type { Classroom } from '$lib/types/api/Classroom'
import { APIError } from '$lib/types/APIError'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

const schema = z.object({
    name: z.string(),
    color: z.string().regex(/^#[0-9a-f]{3,6}$/i),
    icon: z.string(),
    type: z.string(),
    hours: z.coerce.number(),
    teacherId: z.string().uuid(),
})

export const actions: Actions = {
    default: wrap(async ({ request, api, params }) => {
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
            const response = await api.patch<Classroom>(`/api/subjects/${params.id}`, result.data)

            throw redirect(302, `/admin/subjects`)
        } catch (error: unknown) {
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
