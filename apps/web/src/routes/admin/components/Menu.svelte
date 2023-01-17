<script lang="ts">
    import MenuList from './MenuList.svelte'

    import { roles } from '$lib/util'
    import { slide } from 'svelte/transition'
    import { boolean } from '$lib/hooks/boolean'
    import Button from '$lib/components/Button.svelte'

    const links = [
        { name: 'Dashboard', route: '/admin/dashboard', icon: 'ic:round-grid-view' },
        {
            name: 'Usuários',
            route: '/admin/users',
            icon: 'mdi:account-multiple',
            routes: Object.entries(roles).map(([id, { namePlural, icon }]) => ({
                name: namePlural,
                route: `/admin/users?role=${id}`,
                icon,
            })),
        },
        { name: 'Aulas', route: '/admin/lessons', icon: 'ic:baseline-play-lesson' },
        { name: 'Disciplinas', route: '/admin/subjects', icon: 'ic:round-menu-book' },
        { name: 'Turmas', route: '/admin/classes', icon: 'ic:baseline-groups-2' },
    ]

    let open = boolean(true)
</script>

<nav class:open={$open}>
    <header>
        <Button variant="ghost" icon on:click={open.toggle}>
            <iconify-icon icon="ic:baseline-menu" width="2rem" />
        </Button>
        <h1>Margrave</h1>
    </header>
    {#if $open}
        <p transition:slide>Menu principal</p>
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
