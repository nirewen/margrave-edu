export function decodeBase64(data: string) {
    const [, type, base64] = data.split(/data:image\/|;base64,/)

    return { type, buffer: Buffer.from(base64, 'base64') }
}
