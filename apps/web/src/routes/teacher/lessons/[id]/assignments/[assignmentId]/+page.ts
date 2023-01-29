import { loadWrapper as wrap } from '$lib/api'
import type { Assignment } from '$lib/types/api/Assignment'
import type { PageLoad } from './$types'

export const load = wrap(async ({ api, params }) => {
    return {
        assignment: api.get<Assignment>(`/api/assignments/${params.assignmentId}`),
    }
}) satisfies PageLoad
