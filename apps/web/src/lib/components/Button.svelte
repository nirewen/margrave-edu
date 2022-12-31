<script lang="ts">
    export let href: string | undefined = undefined
    export let type: 'button' | 'submit' | 'reset' | undefined | null = 'button'
</script>

{#if href}
    <a class="button" {href} role="button"><slot /></a>
{:else}
    <button class="button" {type}><slot /></button>
{/if}

<style lang="scss" scoped>
    .button {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        padding: 0.6rem 1rem;
        background-color: var(--accent);
        color: #ffffff;
        border-radius: 0.7rem;
        text-transform: uppercase;
        font-weight: 600;
    }
</style>
