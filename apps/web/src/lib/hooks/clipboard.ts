export const clipboard = {
    push: (text: string) => navigator.clipboard.writeText(text),
    read: () => navigator.clipboard.readText(),
}
