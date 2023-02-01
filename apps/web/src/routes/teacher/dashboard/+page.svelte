<script lang="ts">
    import CalendarView from '$lib/components/CalendarView.svelte'
    import type { PageData } from './$types'

    export let data: PageData
</script>

<svelte:head>
    <title>Dashboard | Margrave</title>
</svelte:head>

<header>
    <h1>Dashboard</h1>
    <h2>Bem vindo ao dashboard</h2>
</header>

<CalendarView
    items={data.lessons.map(l => ({
        href: `../lessons/${l.id}/`,
        title: l.title,
        subtitle: l.description,
        subitems: l.assignments.map(a => ({
            href: `../lessons/${l.id}/assignments/${a.id}/`,
            title: a.description,
            date: new Date(a.expiresAt),
        })),
        className: 'task--info',
        date: new Date(l.date),
        len: 1,
    }))}
/>

<style lang="scss">
    header {
        h1 {
            font-size: 1.8rem;
            font-weight: 700;
        }

        h2 {
            color: var(--gray-400);
        }
    }
</style>
