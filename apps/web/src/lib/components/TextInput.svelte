<script lang="ts">
    import type { HTMLInputTypeAttribute } from 'svelte/elements'
    export let name: string
    export let id: string | undefined = undefined
    export let label: string | undefined = undefined
    export let type: HTMLInputTypeAttribute = 'text'
    export let required = false
</script>

{#if !!label}
    <label for={id}>{label}</label>
{/if}
{#if type === 'email'}
    <input type="email" {name} {id} {required} />
{:else if type === 'password'}
    <input type="password" {name} {id} {required} />
{:else}
    <input type="text" {name} {id} {required} />
{/if}

<style lang="scss" scoped>
    input {
        padding: 0.4rem 0.6rem;
        border-radius: 0.4rem;
        border: 1px solid var(--gray-500);
    }
</style>
