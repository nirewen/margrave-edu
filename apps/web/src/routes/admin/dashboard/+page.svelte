<script lang="ts">
    import { plural as p } from '$lib/util'
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
        icon="ic:round-school"
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
        icon="ic:baseline-groups-2"
        label={`turma${p(data.stats.classes)}`}
    />
    <CountCard
        href="../lessons/"
        count={data.stats.lessons}
        icon="ic:baseline-play-lesson"
        label={`aula${p(data.stats.lessons)}`}
    />
</section>

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

    section.stats {
        display: grid;
        gap: 1rem;
        grid-template-columns: 2fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }
</style>
