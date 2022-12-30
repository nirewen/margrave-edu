<script lang="ts">
    import { dateFormat } from '$lib/util'
    import { writable } from 'svelte/store'
    import Profile from '../../components/Profile.svelte'
    import ProfileCard from '../../components/ProfileCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
    let selected = writable(data.students[0])
</script>

<svelte:head>
    <title>Estudantes | Margrave</title>
</svelte:head>

<header>
    <div>
        <h1>Estudantes</h1>
        <h2>Lista de todos os estudantes registrados</h2>
    </div>
</header>
<div class="page">
    <div class="grid">
        {#each data.students as student}
            <ProfileCard
                user={student}
                subtitle="aluno desde {dateFormat.format(new Date(student.createdAt))}"
                on:click={() => ($selected = student)}
            />
        {/each}
    </div>
    <Profile title="Perfil de estudante" user={$selected} />
</div>

<style lang="scss">
    header {
        display: flex;
        justify-content: space-between;

        h1 {
            font-size: 1.8rem;
            font-weight: 700;
        }

        h2 {
            color: var(--gray-400);
        }
    }

    .page {
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 20rem;
    }

    .page .grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
    }
</style>
