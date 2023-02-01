<script lang="ts">
    import Menu from '$lib/components/Menu.svelte'
    import NavBar from '$lib/components/NavBar.svelte'
</script>

<Menu
    links={[
        { name: 'Dashboard', route: '/student/dashboard/', icon: 'ic:round-grid-view' },
        { name: 'Turmas', route: '/student/classes/', icon: 'ic:baseline-groups-2' },
        {
            name: 'Aulas',
            route: '/student/lessons/',
            icon: 'ic:baseline-play-lesson',
            routes: [
                {
                    name: 'Aula',
                    route: '/student/lessons/.+?/',
                    icon: 'material-symbols:play-circle',
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
