<script lang="ts">
    import { plural as p } from '$lib/util'
    import CountCard from '../components/CountCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
</script>

<svelte:head>
    <title>Dashboard | Margrave</title>
</svelte:head>
<main>
    <header>
        <h1>Dashboard</h1>
        <h2>Bem vindo ao dashboard! Aqui você encontra estatísticas sobre o sistema.</h2>
    </header>
    <section class="stats">
        <CountCard
            href="/dashboard/students"
            count={data.stats.students}
            label={`estudante${p(data.stats.students)}`}
        />
        <CountCard
            href="/dashboard/teachers"
            count={data.stats.teachers}
            label={`professor${p(data.stats.teachers, 'es')}`}
        />
        <CountCard
            href="/dashboard/students"
            count={data.stats.students}
            label={`estudante${p(data.stats.students)}`}
            style="grid-row: span 2;"
        />
        <CountCard
            href="/dashboard/classes"
            count={data.stats.lessons}
            label={`turma${p(data.stats.lessons)}`}
        />
        <CountCard
            href="/dashboard/lessons"
            count={data.stats.subjects}
            label={`aula${p(data.stats.subjects)}`}
        />
    </section>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        header {
            h1 {
                font-size: 1.8rem;
                font-weight: 700;
            }

            h2 {
                color: var(--gray-400);
            }
        }

        section.stats {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr 1fr 2fr;
            grid-template-rows: 1fr 1fr;
        }
    }
</style>
