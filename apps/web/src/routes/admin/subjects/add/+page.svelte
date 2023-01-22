<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
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
                    <label>
                        <span>Nome</span>
                        <input type="text" name="name" value={form?.data?.name ?? ''} required />
                    </label>
                </div>
                <label>
                    <span>Cor</span>
                    <input type="color" name="color" value={form?.data?.color ?? ''} required />
                </label>
                <label>
                    <span>Ícone</span>
                    <input type="text" name="icon" value={form?.data?.icon ?? ''} required />
                </label>
            </div>
            <div class="box row">
                <label>
                    <span>Tipo da disciplina</span>
                    <input type="text" name="type" value={form?.data?.type ?? ''} placeholder="Exatas" />
                </label>
                <label>
                    <span>Hora de demanda</span>
                    <input type="number" name="hours" value={form?.data?.hours ?? ''} />
                </label>
            </div>
        </div>
        <div class="box">
            <button type="submit">Salvar</button>
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
