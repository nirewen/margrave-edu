export const plural = (num: number, suffix = 's') => (num === 1 ? '' : suffix)

export const dateFormat = new Intl.DateTimeFormat('pt-BR')

export const getGender = (gender: string) =>
    ({
        MALE: 'Masculino',
        FEMALE: 'Feminino',
        OTHER: 'Outro',
    }[gender]!)

export const getRole = (role: string) =>
    ({
        ADMIN: 'Admin',
        TEACHER: 'Professor',
        STUDENT: 'Estudante',
    }[role]!)
