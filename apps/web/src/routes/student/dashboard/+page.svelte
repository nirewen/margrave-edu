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
    <h2>Bem vindo ao dashboard! Aqui você encontra estatísticas sobre o sistema.</h2>
</header>
<div class="page">
    <CalendarView
        items={data.assignments.map(a => ({
            title: a.description,
            className: 'task--info',
            date: new Date(a.expiresAt),
            len: 1,
        }))}
    />
</div>

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

    .page {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
