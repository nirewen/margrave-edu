<script lang="ts">
    export let big = false
    export let count: number
    export let icon = ''
    export let label: string
    export let href: string | undefined = undefined
    export let style: string | undefined = undefined

    $: element = !!href ? 'a' : 'div'
</script>

<svelte:element this={element} class="count-card" class:big {...{ href, style }}>
    <h1>{count}</h1>
    <iconify-icon {icon} width={big ? '4rem' : '2rem'} />
    <p>
        {label}
    </p>
</svelte:element>

<style lang="scss">
    .count-card {
        display: grid;
        grid-template-areas: 'count space icon' 'label label label';
        grid-template-columns: auto 1fr auto;
        padding: 1rem 1.4rem;
        border-radius: 8px;
        box-shadow: var(--elevation-3);
        background-color: var(--gray-900);

        &.big {
            grid-row: span 2;

            h1 {
                font-size: 4rem;
            }

            p {
                font-size: 2rem;
            }
        }

        h1 {
            grid-area: count;
            font-size: 1.6rem;
            align-self: center;
            justify-self: center;
        }

        p {
            grid-area: label;
            color: var(--gray-300);
        }

        iconify-icon {
            grid-area: icon;
            align-self: center;
            justify-self: center;
        }
    }
</style>
