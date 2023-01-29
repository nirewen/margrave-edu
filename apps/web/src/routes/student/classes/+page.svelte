<script lang="ts">
    import InfoCard from '$lib/components/InfoCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
</script>

<svelte:head>
    <title>Turmas | Margrave</title>
</svelte:head>

<header>
    <hgroup>
        <h1>Turmas</h1>
        <h2>Turmas que você pertence</h2>
    </hgroup>
</header>

{#if !data.classes.length}
    <div class="page">Nenhuma turma encontrada</div>
{/if}
<div class="page">
    <div class="grid">
        {#each data.classes as it}
            <InfoCard>
                <svelte:fragment slot="title">{it.number}</svelte:fragment>
                <svelte:fragment slot="subtitle">{it.period}</svelte:fragment>
            </InfoCard>
        {/each}
    </div>
</div>

<style lang="scss">
    header {
        display: grid;
        grid-template-columns: 1fr auto auto;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        hgroup {
            h1 {
                font-size: 1.8rem;
                font-weight: 700;
            }

            h2 {
                color: var(--gray-400);
            }
        }
    }

    .page {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .grid {
            display: grid;
            gap: 0.8rem;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            height: fit-content;
        }
    }
</style>
