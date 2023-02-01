<script lang="ts">
    //@ts-ignore
    import Tags from 'svelte-tags-input'
    import type { Class } from '$lib/types/api/Class'
    import type { Subject } from '$lib/types/api/Subject'
    import { createMenu } from 'svelte-headlessui'
    import { slide } from 'svelte/transition'

    import type { ActionData, PageData } from './$types'
    import { format } from '$lib/util'
    import { enhance } from '$app/forms'
    import InfoCard from '$lib/components/InfoCard.svelte'
    import Avatar from '$lib/components/Avatar.svelte'

    export let data: PageData
    export let form: ActionData

    let tags: string[] = form?.data.tags ?? data.lesson.tags

    const subjectMenu = createMenu({ label: 'Subjects' })
    const classesMenu = createMenu({ label: 'Classes' })

    let selection = {
        subject: form?.data
            ? data.subjects.find(s => s.id === form?.data.subjectId)
            : data.subjects.find(s => s.id === data.lesson.subject.id),
        class: form?.data
            ? data.classes.find(s => s.id === form?.data.classId)
            : data.classes.find(s => s.id === data.lesson.class.id),
    } as { subject: Subject; class: Class }

    $: availableClasses = data.classes.filter(c => c.subjects.find(s => s.id === selection.subject?.id))
</script>

<svelte:head>
    <title>Editar aula | Margrave</title>
</svelte:head>

<header>
    <a role="button" class="ghost icon" href="../../" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </a>
    <hgroup>
        <h1>Editar aula</h1>
        <h2>Preencha o formulário para editar a aula</h2>
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
                    {/if}
                    {#if $subjectMenu.expanded}
                        <div class="menu" use:subjectMenu.items transition:slide={{ duration: 150 }}>
                            {#each data.subjects as s}
                                <InfoCard color={s.color} on:click={() => (selection.subject = s)}>
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
                    <button type="button" use:classesMenu.button>
                        {#if selection.class}
                            <InfoCard>
                                <svelte:fragment slot="title">{selection.class.number}</svelte:fragment>
                                <svelte:fragment slot="subtitle">{selection.class.period}</svelte:fragment>
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
        <div class="box">
            <input type="hidden" name="subjectId" value={selection.subject.id} />
            <input type="hidden" name="classId" value={selection.class.id} />
            <div class="box" style:flex="1">
                <label data-error={form?.errors?.title}>
                    <span>Título</span>
                    <input type="text" name="title" value={form?.data?.title ?? data.lesson.title} required />
                </label>
            </div>
            <label data-error={form?.errors?.description} style:flex="0">
                <span>Descrição</span>
                <textarea
                    name="description"
                    value={form?.data?.description ?? data.lesson.description}
                    required
                />
            </label>
            <div class="box row">
                <label data-error={form?.errors?.timespan} style:flex="1">
                    <span>Duração</span>
                    <input
                        type="time"
                        name="timespan"
                        value={form?.data?.timespan ?? data.lesson.timespan}
                        required
                    />
                </label>
                <label data-error={form?.errors?.timespan} style:flex="1">
                    <span>Data</span>
                    <input
                        type="date"
                        name="date"
                        value={form?.data?.date ?? format(data.lesson.date, 'yyyy-MM-dd')}
                        required
                    />
                </label>
            </div>
            <label data-error={form?.errors?.tags} style:flex="0">
                <span>Tags</span>
                <input type="hidden" name="tags" bind:value={tags} />
                <Tags addKeys={[9, 13, 32, 188]} bind:tags />
            </label>
        </div>
        <div class="box">
            <button type="submit">Salvar aula</button>
        </div>
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
