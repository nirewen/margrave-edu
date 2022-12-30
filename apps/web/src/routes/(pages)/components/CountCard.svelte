<script lang="ts">
    export let count: number
    export let icon = ''
    export let label: string
    export let href: string | undefined = undefined
    export let style: string | undefined = undefined

    $: element = !!href ? 'a' : 'div'
</script>

<svelte:element this={element} class="count-card" {...{ href, style }}>
    <h1>{count}</h1>
    <iconify-icon {icon} />
    <p class="label">
        {label}
    </p>
</svelte:element>

<style lang="scss">
    .count-card {
        display: flex;
        flex-direction: column;
        padding: 1rem 1.4rem;
        border-radius: 8px;
        box-shadow: var(--elevation-3);

        h1 {
            font-size: 1.6rem;
        }

        .label {
            color: var(--gray-300);
        }
    }
</style>
