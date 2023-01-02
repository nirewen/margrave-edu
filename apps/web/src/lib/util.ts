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
        ADMIN: { icon: 'ic:baseline-shield', name: 'Admin' },
        TEACHER: { icon: 'mdi:human-male-board', name: 'Professor' },
        STUDENT: { icon: 'ic:round-school', name: 'Estudante' },
    }[role]!)
