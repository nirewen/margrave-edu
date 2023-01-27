<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import Option from '$lib/components/Option.svelte'
    import { classroomTypes } from '$lib/util'
    import { merge } from 'merge-anything'
    import { writable } from 'svelte/store'
    import type { ActionData, PageData } from './$types'

    export let data: PageData
    export let form: ActionData

    const classroom = writable(merge(form?.data ?? {}, data.classroom))
</script>

<svelte:head>
    <title>Editar sala de aula | Margrave</title>
</svelte:head>

<header>
    <a role="button" class="ghost icon" href="../" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </a>
    <hgroup>
        <h1>Editar sala de aula</h1>
        <h2>Preencha o formulário para editar a sala de aula</h2>
    </hgroup>
</header>
{#if form?.errored && form?.error}
    <Alert variant="danger">{form?.error}</Alert>
{/if}
<form method="POST" use:enhance>
    <label>
        <span>Prédio</span>
        <input type="text" name="building" value={form?.data?.building ?? data.classroom.building} required />
    </label>
    <label>
        <span>Capacidade</span>
        <input
            type="number"
            name="capacity"
            min="0"
            value={form?.data?.capacity ?? data.classroom.capacity}
            required
        />
    </label>
    <label for="type">
        <span>Tipo de sala</span>
        <fieldset class="inline" id="type" role="radiogroup">
            {#each [...classroomTypes] as [value, { icon, name }]}
                <Option name="type" bind:group={$classroom.type} {value}>
                    <iconify-icon {icon} width="1.6rem" slot="icon" />
                    {name}
                </Option>
            {/each}
        </fieldset>
    </label>
    <button type="submit">Salvar</button>
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
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: max-content;
    }
</style>
