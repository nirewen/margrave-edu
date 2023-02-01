<script lang="ts">
    import TableRow from '$lib/components/TableRow.svelte'
    import { format } from '$lib/util'
    import { compareDesc } from 'date-fns'
    import type { PageData } from './$types'

    export let data: PageData

    $: lessons = data.lessons.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
</script>

<svelte:head>
    <title>Aulas | Margrave</title>
</svelte:head>

<header>
    <hgroup>
        <h1>Aulas</h1>
        <h2>Aulas registradas no sistema</h2>
    </hgroup>

    <a role="button" class="ghost round" href="./add/">
        <iconify-icon icon="ic:baseline-add" width={24} />
        Adicionar
    </a>
</header>
{#if !data.lessons.length}
    <div class="page">Nenhuma aula encontrada</div>
{:else}
    <div class="page">
        {#each lessons as lesson}
            <TableRow href="./{lesson.id}/" columns="auto 1fr auto auto">
                <span class="ml-2">{lesson.title}</span>
                <span class="description">{lesson.description}</span>
                <span data-tooltip="Turma">{lesson.class.number}</span>
                <span>{format(lesson.date)}</span>
                <a role="button" href="./{lesson.id}/edit/" class="ghost icon" slot="action">
                    <iconify-icon icon="ic:baseline-edit" width="28" />
                </a>
            </TableRow>
        {/each}
    </div>
{/if}

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
        gap: 0.6rem;
    }

    span.description {
        opacity: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
