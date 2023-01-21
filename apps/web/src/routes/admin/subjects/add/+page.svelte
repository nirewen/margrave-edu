<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import Button from '$lib/components/Button.svelte'
    import RadioGroup from '$lib/components/RadioGroup.svelte'
    import TextInput from '$lib/components/TextInput.svelte'
    import { classroomTypes } from '$lib/util'
    import type { ActionData, PageData } from './$types'

    export let form: ActionData
    export let data: PageData

    function resolveType(type: string) {
        return classroomTypes[type as keyof typeof classroomTypes].name
    }
</script>

<svelte:head>
    <title>Adicionar nova disciplina | Magrave</title>
</svelte:head>

<header>
    <div>
        <h1>Nova disciplina</h1>
        <h2>Preencha o formulário para adicionar uma nova disciplina</h2>
    </div>
</header>
{#if form?.errored && form?.error}
    <Alert variant="danger">{form?.error}</Alert>
{/if}
<div class="page">
    <form method="POST" use:enhance>
        <div class="box">
            <div class="box row">
                <div class="box" style:flex={1}>
                    <TextInput type="text" name="name" label="Nome" value={form?.data?.name ?? ''} required />
                </div>
                <TextInput type="color" name="color" label="Cor" value={form?.data?.color ?? ''} required />
                <TextInput type="text" name="icon" label="Ícone" value={form?.data?.icon ?? ''} required />
            </div>
            <div class="box row">
                <TextInput
                    type="text"
                    name="type"
                    label="Tipo da disciplina"
                    value={form?.data?.type ?? ''}
                    placeholder="Exatas"
                />
                <TextInput
                    type="number"
                    name="hours"
                    label="Hora de demanda"
                    value={form?.data?.hours ?? ''}
                />
            </div>
        </div>
        <div class="box">
            <Button type="submit">Salvar</Button>
        </div>
    </form>
    <div class="teacher-list">
        {#each data.teachers as teacher}
            <span>{teacher.profile.name}</span>
        {/each}
    </div>
</div>

<style lang="scss">
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h1 {
            font-size: 1.8rem;
            font-weight: 700;
        }

        h2 {
            color: var(--gray-400);
        }
    }

    .page {
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 20rem;
        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;

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
    }
</style>
