<script lang="ts">
    import { enhance } from '$app/forms'
    import Avatar from '$lib/components/Avatar.svelte'
    import InfoCard from '$lib/components/InfoCard.svelte'
    import TableRow from '$lib/components/TableRow.svelte'
    import type { PageData } from './$types'

    export let data: PageData
</script>

<svelte:head>
    <title>{data.lesson.title} | Margrave</title>
</svelte:head>

<div class="page">
    <header>
        <a role="button" class="ghost icon" href="../" title="Voltar">
            <iconify-icon icon="mdi:chevron-left" width={32} />
        </a>
        <hgroup>
            <h1>{data.lesson.title}</h1>
        </hgroup>
        <a role="button" class="ghost round" href="./edit/" title="Editar" style:margin-left="auto">
            <iconify-icon icon="mdi:edit" width={24} />
            Editar
        </a>
    </header>
    <div class="box row" style:gap="1rem">
        <div class="box" style:flex="1">
            <b>Disciplina</b>
            <InfoCard color={data.lesson.subject?.color}>
                <iconify-icon class="inverted" slot="icon" icon={data.lesson.subject?.icon} width="42" />
                <svelte:fragment slot="title">{data.lesson.subject?.name}</svelte:fragment>
                <svelte:fragment slot="subtitle">
                    <Avatar avatar={data.lesson.subject?.teacher.profile.avatar} size={1} />
                    {data.lesson.subject?.teacher.profile.name}
                </svelte:fragment>
            </InfoCard>
        </div>
        <div class="box" style:flex="1">
            <b>Turma</b>
            <InfoCard>
                <svelte:fragment slot="title">{data.lesson.class.number}</svelte:fragment>
                <svelte:fragment slot="subtitle">{data.lesson.class.period}</svelte:fragment>
            </InfoCard>
        </div>
    </div>
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
