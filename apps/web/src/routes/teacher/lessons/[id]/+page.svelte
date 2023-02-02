<script lang="ts">
    import { enhance } from '$app/forms'
    import TableRow from '$lib/components/TableRow.svelte'
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
        <div class="box row" style:justify-content="space-between" style:align-items="center">
            <b>Tarefas dessa aula</b>
            <a href="./assignments/add/" role="button" class="ghost icon">
                <iconify-icon icon="mdi:add" />
            </a>
        </div>
        {#each data.lesson.assignments as assignment}
            <TableRow href="./assignments/{assignment.id}/" shadow={false}>
                <span class="text-trim">{assignment.description}</span>
                <span class="text-right">{assignment.answers.length} respostas</span>
            </TableRow>
        {:else}
            <span>Nenhuma tarefa para essa aula</span>
        {/each}
    </div>
    <form method="POST" action="?/saveAttendances" class="box" use:enhance>
        <b>Lista de presenças</b>
        <div class="box" style:gap="0.6rem">
            {#each data.students.sort((a, b) => a.profile.name.localeCompare(b.profile.name)) as student, i}
                <label>
                    <input
                        type="checkbox"
                        name="attendances.{student.id}"
                        checked={!!data.lesson.attendances.find(u => u.id === student.id)}
                    />
                    <span>{student.profile.name}</span>
                </label>
            {/each}
        </div>
        <div class="box sticky">
            <button type="submit">Salvar lista de presenças</button>
        </div>
    </form>
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
        gap: 0.6rem;
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
        }
    }

    .page {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-right: 20rem;

        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
        }

        label {
            flex-direction: row;
            gap: 0.5rem;
        }
    }

    .sticky {
        position: sticky;
        bottom: 0;
    }
</style>
