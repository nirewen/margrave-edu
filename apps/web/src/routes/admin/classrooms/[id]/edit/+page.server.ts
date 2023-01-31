import dot from 'dot-object'
import { z } from 'zod'
import { fail, redirect } from '@sveltejs/kit'

import { actionWrapper as wrap } from '$lib/api'
import type { Classroom } from '$lib/types/api/Classroom'
import { APIError } from '$lib/types/APIError'

import type { Actions } from './$types'

const schema = z.object({
    building: z.string(),
    capacity: z.coerce.number(),
    type: z.enum(['REGULAR', 'COMPUTER', 'LABORATORY', 'GYMNASIUM']),
})

export const actions: Actions = {
    default: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const obj = dot.object(data) as z.infer<typeof schema>

        const result = schema.safeParse(obj)

        if (!result.success) {
            return fail(401, {
                error: true,
                data: obj,
                errors: result.error.formErrors.fieldErrors,
            })
        }

        try {
            const response = await api.patch<Classroom>(`/api/classrooms/${params.id}`, result.data)

            throw redirect(302, '/admin/classrooms/')
        } catch (error: unknown) {
            if (error instanceof APIError) {
                return fail(error.status, {
                    errored: true,
                    error: error.message,
                    data: obj,
                })
            }

            throw error
        }
    }),
}
