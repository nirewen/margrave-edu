<script lang="ts">
    import InfoCard from '$lib/components/InfoCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
</script>

<svelte:head>
    <title>{data.lesson.title} | Margrave</title>
</svelte:head>

<header>
    <a role="button" class="ghost icon" href="../" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </a>
    <hgroup>
        <h1>{data.lesson.title}</h1>
    </hgroup>
</header>
<div class="page">
    <div class="box">
        <div class="box">
            <b>Descrição</b>
            <span>{data.lesson.description}</span>
        </div>
    </div>
    <div class="box">
        <div class="box">
            <div class="box row" style:justify-content="space-between" style:align-items="center">
                <b>Tarefas dessa aula</b>
            </div>
            {#each data.lesson.assignments as assignment}
                <InfoCard>
                    <svelte:fragment slot="title">{assignment.description}</svelte:fragment>
                </InfoCard>
            {:else}
                <span>Nenhuma tarefa para essa aula</span>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    header {
        display: flex;
        align-items: center;
        gap: 1rem;

        hgroup {
            h1 {
                font-size: 1.8rem;
                font-weight: 700;
            }
        }
    }

    .box {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        background-color: var(--gray-900);
        box-shadow: var(--elevation-3);
        border-radius: 0.8rem;
        height: fit-content;

        &.row {
            flex-direction: row;
        }

        > .box {
            box-shadow: none;
            padding: 0;
            gap: 0;
        }
    }

    .page {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-right: 20rem;
    }
</style>
