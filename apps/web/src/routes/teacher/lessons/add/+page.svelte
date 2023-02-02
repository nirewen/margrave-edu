<script lang="ts">
    //@ts-ignore
    import Tags from 'svelte-tags-input'
    import Avatar from '$lib/components/Avatar.svelte'
    import InfoCard from '$lib/components/InfoCard.svelte'
    import type { Class } from '$lib/types/api/Class'
    import type { Subject } from '$lib/types/api/Subject'
    import { createMenu } from 'svelte-headlessui'
    import { slide } from 'svelte/transition'

    import type { ActionData, PageData } from './$types'
    import { format } from '$lib/util'
    import { enhance } from '$app/forms'

    export let data: PageData
    export let form: ActionData

    const subjectMenu = createMenu({ label: 'Subjects' })
    const classesMenu = createMenu({ label: 'Classes' })

    let selection = {
        subject: form?.data ? data.subjects.find(s => s.id === form?.data.subjectId) : null,
        class: form?.data ? data.classes.find(s => s.id === form?.data.classId) : null,
    } as { subject: Subject | null; class: Class | null }
    let tags: string[] = form?.data.tags ?? []

    $: availableClasses = data.classes.filter(c => c.subjects.find(s => s.id === selection.subject?.id))
</script>

<svelte:head>
    <title>Adicionar aula | Margrave</title>
</svelte:head>

<header>
    <a role="button" class="ghost icon" href="../" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </a>
    <hgroup>
        <h1>Adicionar aula</h1>
        <h2>Preencha o formulário para adicionar uma aula</h2>
    </hgroup>
</header>
<form method="POST" use:enhance>
    <div class="form">
        <div class="box row">
            <div class="box" style:flex="1">
                <span>Selecione a disciplina</span>
                <button type="button" use:subjectMenu.button>
                    {#if selection.subject}
                        <InfoCard color={selection.subject?.color}>
                            <iconify-icon
                                class="inverted"
                                slot="icon"
                                icon={selection.subject?.icon}
                                width="42"
                            />
                            <svelte:fragment slot="title">{selection.subject?.name}</svelte:fragment>
                            <svelte:fragment slot="subtitle">
                                <Avatar avatar={selection.subject?.teacher.profile.avatar} size={1} />
                                {selection.subject?.teacher.profile.name}
                            </svelte:fragment>
                        </InfoCard>
                    {:else}
                        <InfoCard>
                            <iconify-icon slot="action" icon="mdi:chevron-down" width="42" />
                            <svelte:fragment slot="title">Disciplina</svelte:fragment>
                            <svelte:fragment slot="subtitle">Selecione uma disciplina</svelte:fragment>
                        </InfoCard>
                    {/if}
                    {#if $subjectMenu.expanded}
                        <div class="menu" use:subjectMenu.items transition:slide={{ duration: 150 }}>
                            {#each data.subjects as s}
                                <InfoCard
                                    color={s.color}
                                    on:click={() => ((selection.subject = s), (selection.class = null))}
                                >
                                    <iconify-icon class="inverted" slot="icon" icon={s.icon} width="42" />
                                    <svelte:fragment slot="title">{s.name}</svelte:fragment>
                                    <svelte:fragment slot="subtitle">
                                        <Avatar avatar={s.teacher.profile.avatar} size={1} />
                                        {s.teacher.profile.name}
                                    </svelte:fragment>
                                </InfoCard>
                            {/each}
                        </div>
                    {/if}
                </button>
            </div>
            <div class="box" style:flex="1">
                {#if selection.subject}
                    <span>Selecione a turma</span>
                    <button type="button" use:classesMenu.button disabled={availableClasses.length === 0}>
                        {#if selection.class}
                            <InfoCard>
                                <svelte:fragment slot="title">{selection.class.number}</svelte:fragment>
                                <svelte:fragment slot="subtitle">{selection.class.period}</svelte:fragment>
                            </InfoCard>
                        {:else if availableClasses.length > 0}
                            <InfoCard>
                                <iconify-icon slot="action" icon="mdi:chevron-down" width="42" />
                                <svelte:fragment slot="title">Turma</svelte:fragment>
                                <svelte:fragment slot="subtitle">Selecione uma turma</svelte:fragment>
                            </InfoCard>
                        {:else}
                            <InfoCard>
                                <iconify-icon slot="action" icon="mdi:close" width="42" />
                                <svelte:fragment slot="title">Nenhuma turma</svelte:fragment>
                                <svelte:fragment slot="subtitle">
                                    Nenhuma turma tem essa disciplina
                                </svelte:fragment>
                            </InfoCard>
                        {/if}
                        {#if $classesMenu.expanded}
                            <div class="menu" use:classesMenu.items transition:slide={{ duration: 150 }}>
                                {#each availableClasses as c}
                                    <InfoCard on:click={() => (selection.class = c)}>
                                        <svelte:fragment slot="title">{c.number}</svelte:fragment>
                                        <svelte:fragment slot="subtitle">{c.period}</svelte:fragment>
                                    </InfoCard>
                                {/each}
                            </div>
                        {/if}
                    </button>
                {/if}
            </div>
        </div>
        {#if selection.class && selection.subject}
            <div class="box">
                <input type="hidden" name="subjectId" value={selection.subject.id} />
                <input type="hidden" name="classId" value={selection.class.id} />
                <label data-error={form?.errors?.title}>
                    <span>Título</span>
                    <input type="text" name="title" value={form?.data?.title ?? ''} required />
                </label>
                <label data-error={form?.errors?.description}>
                    <span>Descrição</span>
                    <textarea name="description" value={form?.data?.description ?? ''} required />
                </label>
                <div class="box row">
                    <label data-error={form?.errors?.timespan} style:flex="1">
                        <span>Duração</span>
                        <input type="time" name="timespan" value={form?.data?.timespan ?? ''} required />
                    </label>
                    <label data-error={form?.errors?.timespan} style:flex="1">
                        <span>Data</span>
                        <input
                            type="date"
                            name="date"
                            value={form?.data?.date ?? format(new Date().toISOString(), true)}
                            required
                        />
                    </label>
                </div>
                <label data-error={form?.errors?.tags}>
                    <span>Tags</span>
                    <input type="hidden" name="tags" bind:value={tags} />
                    <Tags addKeys={[9, 13, 32, 188]} bind:tags />
                </label>
            </div>
            <div class="box">
                <button type="submit">Registrar aula</button>
            </div>
        {/if}
    </div>
</form>

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

            h2 {
                color: var(--gray-400);
            }
        }
    }

    form {
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 20rem;

        .form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
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

                > * {
                    justify-self: stretch;
                }
            }

            > .box {
                box-shadow: none;
                padding: 0;
            }
        }

        button[type='button'] {
            position: relative;
            padding: 0;
            color: #000000;

            .menu {
                display: flex;
                flex-direction: column;
                gap: 0.4rem;
                position: absolute;
                top: 5rem;
                background-color: #ffffff;
                transform-origin: top right;
                border-radius: 0.375rem;
                border-top-width: 1px;
                border-color: #f3f4f6;
                box-shadow: var(--elevation-6);
                width: 100%;
                max-height: 20rem;
                overflow: overlay;
            }
        }
    }
</style>
