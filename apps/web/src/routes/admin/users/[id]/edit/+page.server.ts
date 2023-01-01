import { actionWrapper as wrap } from '$lib/api'
import type { User } from '$lib/types/User'
import { redirect } from '@sveltejs/kit'
import dot from 'dot-object'
import type { Actions } from './$types'

export const actions: Actions = {
    default: wrap(async ({ request, api, params }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)
        const obj = dot.object(data)

        await api.patch<User>(`/api/profiles/${params.id}`, obj)

        throw redirect(301, `/admin/users`)
    }),
}
