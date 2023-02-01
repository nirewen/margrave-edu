<script lang="ts">
    import Menu from '$lib/components/Menu.svelte'
    import NavBar from '$lib/components/NavBar.svelte'
</script>

<Menu
    links={[
        { name: 'Dashboard', route: '/student/dashboard/', icon: 'mdi:view-grid' },
        { name: 'Turmas', route: '/student/classes/', icon: 'mdi:account-group' },
        {
            name: 'Aulas',
            route: '/student/lessons/',
            icon: 'mdi:book-play',
            routes: [
                {
                    name: 'Aula',
                    route: '/student/lessons/.+?/',
                    icon: 'mdi:play-circle',
                    hide: true,
                    blank: true,
                },
            ],
        },
    ]}
/>
<NavBar />
<main class="content">
    <slot />
</main>
