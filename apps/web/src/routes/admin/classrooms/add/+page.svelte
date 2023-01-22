<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import Option from '$lib/components/Option.svelte'
    import { classroomTypes } from '$lib/util'
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

<svelte:head>
    <title>Adicionar nova sala de aula | Magrave</title>
</svelte:head>

<header>
    <div>
        <h1>Nova sala de aula</h1>
        <h2>Preencha o formulário para adicionar uma nova sala de aula</h2>
    </div>
</header>
{#if form?.errored && form?.error}
    <Alert variant="danger">{form?.error}</Alert>
{/if}
<form method="POST" use:enhance>
    <label>
        <span>Prédio</span>
        <input type="text" name="building" value={form?.data?.building ?? ''} required />
    </label>
    <label>
        <span>Capacidade</span>
        <input type="number" name="capacity" min="0" value={form?.data?.capacity ?? ''} required />
    </label>
    <label for="type">
        <span>Tipo de sala</span>
        <fieldset class="inline" id="type" role="radiogroup">
            {#each [...classroomTypes] as [value, { icon, name }]}
                <Option name="type" group={String(form?.data.type) ?? ''} {value}>
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
        justify-content: space-between;

        h1 {
            font-size: 1.8rem;
            font-weight: 700;
        }

        h2 {
            color: var(--gray-400);
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: max-content;
    }
</style>
