import { fail, redirect } from '@sveltejs/kit'

import { actionWrapper as wrap } from '$lib/api'
import type { Classroom } from '$lib/types/api/Classroom'
import { APIError } from '$lib/types/APIError'
import type { Actions } from './$types'

export const actions: Actions = {
    default: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)

        try {
            const response = await api.patch<Classroom>(`/api/classrooms/${params.id}`, {
                building: data.building,
                capacity: parseInt(String(data.capacity)),
                type: data.type,
            })

            throw redirect(303, '/admin/classrooms')
        } catch (error: unknown) {
            if (error instanceof APIError) {
                return fail(error.status, {
                    errored: true,
                    error: error.message,
                    data,
                })
            }
        }
    }),
}
