<script lang="ts">
    export let title: string | undefined = undefined
    export let href: string | undefined = undefined
    export let variant: 'primary' | 'secondary' | 'ghost' = 'primary'
    export let type: 'button' | 'submit' | 'reset' | undefined | null = 'button'
    export let icon = false
</script>

{#if href}
    <a class="button {variant}" class:icon {href} {title} role="button"><slot /></a>
{:else}
    <button class="button {variant}" class:icon {type} {title}><slot /></button>
{/if}

<style lang="scss" scoped>
    .button {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        padding: 0.4rem 0.8rem;
        color: #ffffff;
        border-radius: 0.7rem;
        text-transform: uppercase;
        font-weight: 600;

        &.primary {
            background-color: var(--accent);

            &:hover {
                background-color: var(--accent-hover);
            }
            &:active {
                background-color: var(--accent-pressed);
            }
        }

        &.ghost {
            border: 1px solid var(--gray-700);
            background-color: var(--gray-900);
            color: var(--gray-000);

            &:hover {
                border-color: var(--gray-400);
            }
        }

        &.icon {
            padding: 0.2rem;
            border-radius: 0.4rem;
            color: #000;
        }
    }
</style>
