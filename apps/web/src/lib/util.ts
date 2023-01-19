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
    ADMIN: {
        icon: 'ic:baseline-shield',
        name: {
            single: 'administrador',
            plural: 'administradores',
            formal: {
                single: 'Administrador',
                plural: 'Administradores',
            },
        },
    },
    TEACHER: {
        icon: 'mdi:human-male-board',
        name: {
            single: 'professor',
            plural: 'professores',
            formal: {
                single: 'Professor',
                plural: 'Professores',
            },
        },
    },
    STUDENT: {
        icon: 'ic:round-school',
        name: {
            single: 'estudante',
            plural: 'estudantes',
            formal: {
                single: 'Estudante',
                plural: 'Estudantes',
            },
        },
    },
}

export type Role = keyof typeof roles

export const getRole = (role: Role) => roles[role]

export const classroomTypes = {
    REGULAR: {
        icon: 'ic:baseline-edit-note',
        name: 'Padrão',
    },
    COMPUTER: {
        icon: 'ic:baseline-computer',
        name: 'Informática',
    },
    LABORATORY: {
        icon: 'ic:baseline-science',
        name: 'Laboratório',
    },
    GYMNASIUM: {
        icon: 'ic:baseline-sports-gymnastics',
        name: 'Ginásio',
    },
}

export const capitalize = (string: string) => {
    const [first, ...rest] = string.split('')

    return [first.toUpperCase(), rest.join('').toLowerCase()].join('')
}

export async function encodeBase64(file: File | Blob): Promise<string> {
    if (typeof Buffer === 'function') {
        const buffer = Buffer.from(await file.arrayBuffer())

        return 'data:' + file.type + ';base64,' + buffer.toString('base64')
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
    })
}
