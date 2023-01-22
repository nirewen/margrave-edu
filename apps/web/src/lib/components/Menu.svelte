<script lang="ts">
    import { slide } from 'svelte/transition'

    import { boolean } from '$lib/hooks/boolean'

    import MenuList from './MenuList.svelte'

    type Routes = {
        name: string
        route: string
        icon: string
        routes?: Routes[]
    }

    export let links: Routes[]

    let open = boolean(true)
</script>

<nav class:open={$open}>
    <header>
        <button class="ghost icon" on:click={open.toggle}>
            <iconify-icon icon="ic:baseline-menu" width="2rem" />
        </button>
        <h1>Margrave</h1>
    </header>
    {#if $open}
        <p transition:slide={{ duration: 300 }}>Menu principal</p>
    {/if}
    <MenuList open={$open} {links} />
</nav>

<style lang="scss">
    nav {
        grid-area: sidebar;
        padding: 1rem;

        color: var(--primary-text);
        background-color: var(--primary);
        width: 5.5rem;
        transition: width 200ms linear;
        overflow: hidden;

        &.open {
            width: 20rem;
        }

        header {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 1rem;
            color: var(--gray-900);
            padding: 0.25rem;

            > h1 {
                font-size: 2rem;
                font-weight: 700;
            }
        }

        p {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0.6rem 0.8rem;
            white-space: nowrap;
        }
    }
</style>
