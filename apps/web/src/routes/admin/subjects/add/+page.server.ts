import { actionWrapper as wrap } from '$lib/api'
import type { Classroom } from '$lib/types/api/Classroom'
import { APIError } from '$lib/types/APIError'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
    default: wrap(async ({ request, api }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)

        try {
            const response = await api.post<Classroom>('/api/subjects', {
                name: data.name,
                color: data.color,
                icon: data.icon,
                type: data.type,
                hours: Number(data.hours),
                teacherId: data.teacherId,
            })

            throw redirect(302, `/admin/subjects/${response.id}/edit`)
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
