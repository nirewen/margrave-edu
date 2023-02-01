<script lang="ts">
    import { plural as p } from '$lib/util'
    import CalendarView from '$lib/components/CalendarView.svelte'
    import CountCard from '../components/CountCard.svelte'
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
    <section class="stats">
        <CountCard
            big
            href="../users/"
            count={data.stats.users}
            icon="mdi:account"
            label={`usuário${p(data.stats.users)}`}
        />
        <CountCard
            href="../users/?role=STUDENT"
            count={data.stats.students}
            icon="mdi:school"
            label={`estudante${p(data.stats.students)}`}
        />
        <CountCard
            href="../users/?role=TEACHER"
            count={data.stats.teachers}
            icon="mdi:human-male-board"
            label={`professor${p(data.stats.teachers, 'es')}`}
        />
        <CountCard
            href="../classes/"
            count={data.stats.classes}
            icon="mdi:account-group"
            label={`turma${p(data.stats.classes)}`}
        />
        <CountCard
            href="../lessons/"
            count={data.stats.lessons}
            icon="mdi:book-play"
            label={`aula${p(data.stats.lessons)}`}
        />
    </section>

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

        section.stats {
            display: grid;
            gap: 1rem;
            grid-template-columns: 2fr 1fr 1fr;
            grid-template-rows: 1fr 1fr;
        }
    }
</style>
