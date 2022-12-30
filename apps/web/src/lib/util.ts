export const plural = (num: number, suffix = 's') => (num === 1 ? '' : suffix)

export const dateFormat = new Intl.DateTimeFormat('pt-BR')
