<script lang="ts">
    import MenuList from './MenuList.svelte'

    import { roles } from '$lib/util'

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
</script>

<nav>
    <header>
        <h1>Margrave</h1>
    </header>
    <p>Menu principal</p>
    <MenuList {links} />
</nav>

<style lang="scss">
    nav {
        grid-area: sidebar;
        padding: 2rem 4rem 2rem 1rem;

        color: var(--primary-text);
        background-color: var(--primary);
        width: 20rem;

        header {
            margin-bottom: 1rem;
            color: var(--gray-900);

            > h1 {
                font-size: 2rem;
                font-weight: 700;
            }
        }

        p {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0.6rem 0.8rem;
        }
    }
</style>
