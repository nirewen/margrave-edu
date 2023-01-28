<script lang="ts">
    import Menu from '$lib/components/Menu.svelte'
    import NavBar from '$lib/components/NavBar.svelte'
</script>

<Menu
    links={[
        { name: 'Dashboard', route: '/teacher/dashboard/', icon: 'ic:round-grid-view' },
        { name: 'Calendário', route: '/teacher/schedule/', icon: 'ic:baseline-calendar-month' },
        { name: 'Turmas', route: '/teacher/classes/', icon: 'ic:baseline-groups-2' },
        { name: 'Aulas', route: '/teacher/lessons/', icon: 'ic:baseline-play-lesson' },
    ]}
/>
<NavBar />
<main class="content">
    <slot />
</main>
