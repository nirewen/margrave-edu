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
    <div class="box">
        {#each data.classes as it}
            <div class="box">
                <span>
                    <b>{it.number}</b>
                    <small>{it.period}</small>
                </span>
                <div class="page">
                    {#each it.lessons.sort( (a, b) => compareDesc(new Date(a.date), new Date(b.date)) ) as lesson}
                        <TableRow href="./{lesson.id}/" columns="auto 1fr auto" shadow={false}>
                            <span class="ml-2">{lesson.title}</span>
                            <span class="description">{lesson.description}</span>
                            <span>{format(lesson.date)}</span>
                            <a role="button" href="./{lesson.id}/edit/" class="ghost icon" slot="action">
                                <iconify-icon icon="ic:baseline-edit" width="28" />
                            </a>
                        </TableRow>
                    {/each}
                </div>
            </div>
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

        .box {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            background-color: var(--gray-900);
            box-shadow: var(--elevation-3);
            border-radius: 0.8rem;
            height: fit-content;

            > .box {
                box-shadow: none;
                padding: 0;
            }
        }
    }
</style>
