<script lang="ts">
    import TableRow from '$lib/components/TableRow.svelte'
    import { format } from '$lib/util'
    import { compareDesc } from 'date-fns'
    import type { PageData } from './$types'

    export let data: PageData
</script>

<svelte:head>
    <title>Aulas | Margrave</title>
</svelte:head>

<header>
    <hgroup>
        <h1>Aulas</h1>
        <h2>Aulas das suas turmas</h2>
    </hgroup>
</header>

{#if !data.classes.length}
    <div class="page">Nenhuma aula encontrada</div>
{/if}
<div class="page">
    {#each data.classes as it}
        <div class="box">
            <span>
                <b>{it.number}</b>
                <small>{it.period}</small>
            </span>
            <div class="page">
                {#each it.lessons.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))) as lesson}
                    <TableRow href="./{lesson.id}/" columns="auto 1fr auto" shadow={false}>
                        <span>{lesson.title}</span>
                        <span class="description">{lesson.description}</span>
                        <span>{format(lesson.date)}</span>
                    </TableRow>
                {:else}
                    <span>Nenhuma aula para essa turma</span>
                {/each}
            </div>
        </div>
    {/each}
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

        .box {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            background-color: var(--gray-900);
            box-shadow: var(--elevation-3);
            border-radius: 0.8rem;
            height: fit-content;
        }
    }
</style>
