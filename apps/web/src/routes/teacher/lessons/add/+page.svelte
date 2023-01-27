<script lang="ts">
    import { enhance } from '$app/forms'
    //@ts-ignore
    import Tags from 'svelte-tags-input'
    import Alert from '$lib/components/Alert.svelte'
    import Avatar from '$lib/components/Avatar.svelte'
    import InfoCard from '$lib/components/InfoCard.svelte'
    import type { Subject } from '$lib/types/api/Subject'

    import type { ActionData, PageData } from './$types'
    import type { Class } from '$lib/types/api/Class'

    export let data: PageData
    export let form: ActionData

    let subject: Subject
    let selectedClass: Class
    let tags: string[]
</script>

<svelte:head>
    <title>Adicionar aula | Margrave</title>
</svelte:head>

<header>
    <a role="button" class="ghost icon" href="./" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </a>
    <hgroup>
        <h1>Adicionar aula</h1>
        <h2>Preencha o formulário para adicionar uma aula</h2>
    </hgroup>
</header>
{#if form?.error && form?.message}
    <Alert variant="danger">{form?.message}</Alert>
{/if}
{#if !subject}
    {#each data.subjects as s}
        <InfoCard color={s.color} on:click={() => (subject = s)}>
            <iconify-icon class="inverted" slot="icon" icon={s.icon} width="48" />
            <svelte:fragment slot="title">{s.name}</svelte:fragment>
            <svelte:fragment slot="subtitle">
                <Avatar avatar={s.teacher.profile.avatar} size={1} />
                {s.teacher.profile.name}
            </svelte:fragment>
        </InfoCard>
    {/each}
{/if}
{#if subject && !selectedClass}
    {#each data.classes as c}
        <InfoCard on:click={() => (selectedClass = c)}>
            <svelte:fragment slot="title">{c.number}</svelte:fragment>
            <svelte:fragment slot="subtitle">{c.period}</svelte:fragment>
        </InfoCard>
    {/each}
{/if}
{#if subject && selectedClass}
    <form method="POST" use:enhance>
        <input type="hidden" name="subjectId" value={subject.id} />
        <input type="hidden" name="classId" value={selectedClass.id} />
        <div class="form">
            <div class="box">
                <div class="box">
                    <div class="box" style:flex="1">
                        <label data-error={form?.errors?.title}>
                            <span>Título</span>
                            <input type="text" name="title" value={form?.data?.title ?? ''} required />
                        </label>
                    </div>
                    <label data-error={form?.errors?.description} style:flex="0">
                        <span>Descrição</span>
                        <textarea name="description" value={form?.data?.description ?? ''} required />
                    </label>
                    <label data-error={form?.errors?.timespan} style:flex="0">
                        <span>Duração</span>
                        <input type="time" name="timespan" value={form?.data?.timespan ?? ''} required />
                    </label>
                    <label data-error={form?.errors?.tags} style:flex="0">
                        <span>Tags</span>
                        <input type="hidden" name="tags" bind:value={tags} />
                        <Tags addKeys={[9, 13, 188]} bind:tags />
                    </label>
                </div>
            </div>
            <div class="box">
                <button type="submit">Registrar aula</button>
            </div>
        </div>
    </form>
{/if}

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
    }
</style>
