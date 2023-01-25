export const plural = (num: number, suffix = 's') => (num === 1 ? '' : suffix)

export type GenderID = 'MALE' | 'FEMALE' | 'OTHER' | string
export type RoleID = 'ADMIN' | 'TEACHER' | 'STUDENT' | string
type GenderInfo = {
    icon: string
    name: string
    color: string
    bgColor: string
}

type RoleInfo = {
    icon: string
    name: {
        single: string
        plural: string
        formal: {
            single: string
            plural: string
        }
    }
}

export type Role = [RoleID, RoleInfo]
export type Gender = [RoleID, RoleInfo]

export const genders = new Map<GenderID, GenderInfo>([
    [
        'MALE',
        {
            icon: 'ic:baseline-male',
            name: 'Masculino',
            color: '#226699',
            bgColor: '#ffffff',
        },
    ],
    [
        'FEMALE',
        {
            icon: 'ic:baseline-female',
            name: 'Feminino',
            color: '#ea596e',
            bgColor: '#ffffff',
        },
    ],
    [
        'OTHER',
        {
            icon: 'ic:baseline-transgender',
            name: 'Outro',
            color: '#000000',
            bgColor: '#ffffff',
        },
    ],
])

export const roles = new Map<RoleID, RoleInfo>([
    [
        'ADMIN',
        {
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
    ],
    [
        'TEACHER',
        {
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
    ],
    [
        'STUDENT',
        {
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
    ],
])

export const classroomTypes = new Map([
    [
        'REGULAR',
        {
            icon: 'ic:baseline-edit-note',
            name: 'Padrão',
        },
    ],
    [
        'COMPUTER',
        {
            icon: 'ic:baseline-computer',
            name: 'Informática',
        },
    ],
    [
        'LABORATORY',
        {
            icon: 'ic:baseline-science',
            name: 'Laboratório',
        },
    ],
    [
        'GYMNASIUM',
        {
            icon: 'ic:baseline-sports-gymnastics',
            name: 'Ginásio',
        },
    ],
])

export const shifts = new Map([
    [
        'MORNING',
        {
            name: 'Manhã',
            icon: 'vaadin:morning',
        },
    ],
    [
        'AFTERNOON',
        {
            name: 'Tarde',
            icon: 'vaadin:sun-o',
        },
    ],
    [
        'NIGHT',
        {
            name: 'Noite',
            icon: 'vaadin:moon-o',
        },
    ],
])

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
