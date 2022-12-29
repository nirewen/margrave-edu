import { writable } from 'svelte/store'

export function boolean(initialValue?: boolean) {
    const { subscribe, update, set } = writable(initialValue ?? false)

    return {
        subscribe,
        setTrue() {
            set(true)
        },
        setFalse() {
            set(false)
        },
        toggle() {
            update(current => !current)
        },
    }
}
