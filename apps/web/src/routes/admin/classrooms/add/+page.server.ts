import { actionWrapper as wrap } from '$lib/api'
import type { Classroom } from '$lib/types/api/Classroom'
import { APIError } from '$lib/types/APIError'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
    default: wrap(async ({ request, api, url }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)

        try {
            const response = await api.post<Classroom>('/api/classrooms', {
                building: data.building,
                capacity: parseInt(String(data.capacity)),
                type: data.type,
            })

            throw redirect(303, `/admin/classrooms/${response.id}/edit`)
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
