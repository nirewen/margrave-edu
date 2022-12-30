<script lang="ts">
    import ProfileCard from '../../components/ProfileCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
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
            <ProfileCard user={student} />
        {/each}
    </div>
    <div class="selected" />
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
        grid-template-columns: auto 1fr;
    }

    .page .grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
    }
</style>
