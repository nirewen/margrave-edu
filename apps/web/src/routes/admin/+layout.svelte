<script lang="ts">
    import { roles } from '$lib/util'

    import Menu from '$lib/components/Menu.svelte'
    import NavBar from './components/NavBar.svelte'
</script>

<Menu
    links={[
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
    ]}
/>
<NavBar />
<main class="content">
    <slot />
</main>
