import { actionWrapper as wrap } from '$lib/api'
import { fail, redirect } from '@sveltejs/kit'
import { APIError } from '$lib/types/APIError'
import type { Actions } from './$types'
import { z } from 'zod'

const schema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
        confirmPassword: z.string(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'As senhas não coincidem',
            })
        }
    })

export const actions: Actions = {
    register: wrap(async ({ request, api }) => {
        const formData = await request.formData()
        const data = Object.fromEntries(formData)

        const result = schema.safeParse(data)

        if (!result.success) {
            return fail(401, {
                validationError: true,
                errors: result.error.errors,
                data: {
                    email: data.email,
                    password: '',
                },
            })
        }

        try {
            await api.post('/api/auth/signup', {
                email: data.email,
                password: data.password,
            })
        } catch (error: unknown) {
            if (error instanceof APIError) {
                return fail(error.status, {
                    apiError: true,
                    message: error.message,
                    data: {
                        email: data.email,
                        password: '',
                    },
                })
            }
        }

        throw redirect(301, '/dashboard')
    }),
}
