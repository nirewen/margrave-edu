<script lang="ts">
    import { roles } from '$lib/util'

    import Menu from '$lib/components/Menu.svelte'
    import NavBar from '$lib/components/NavBar.svelte'
</script>

<Menu
    links={[
        { name: 'Dashboard', route: '/admin/dashboard/', icon: 'mdi:view-grid' },
        {
            name: 'Usuários',
            route: '/admin/users/',
            icon: 'mdi:account-multiple',
            routes: [...roles].map(([id, { name, icon }]) => ({
                name: name.formal.plural,
                route: `/admin/users/\\?role=${id}`,
                icon,
            })),
        },
        { name: 'Salas de aula', route: '/admin/classrooms/', icon: 'mdi:google-classroom' },
        { name: 'Aulas', route: '/admin/lessons/', icon: 'mdi:book-play' },
        { name: 'Disciplinas', route: '/admin/subjects/', icon: 'mdi:book-open-variant' },
        { name: 'Turmas', route: '/admin/classes/', icon: 'mdi:account-group' },
    ]}
/>
<NavBar />
<main class="content">
    <slot />
</main>
