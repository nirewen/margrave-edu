export const plural = (num: number, suffix = 's') => (num === 1 ? '' : suffix)

export const dateFormat = new Intl.DateTimeFormat('pt-BR')

export const genders = {
    MALE: 'Masculino',
    FEMALE: 'Feminino',
    OTHER: 'Outro',
}

export type Gender = keyof typeof genders

export const getGender = (gender: string) => genders[gender as Gender]

export const roles = {
    ADMIN: { icon: 'ic:baseline-shield', name: 'Admin' },
    TEACHER: { icon: 'mdi:human-male-board', name: 'Professor' },
    STUDENT: { icon: 'ic:round-school', name: 'Estudante' },
}

export type Role = keyof typeof roles

export const getRole = (role: Role) => roles[role]
