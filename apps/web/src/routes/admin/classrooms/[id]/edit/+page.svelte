<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import RadioGroup from '$lib/components/RadioGroup.svelte'
    import { classroomTypes } from '$lib/util'
    import { merge } from 'merge-anything'
    import { writable } from 'svelte/store'
    import type { ActionData, PageData } from './$types'

    export let data: PageData
    export let form: ActionData

    const classroom = writable(merge(form?.data ?? {}, data.classroom))

    function resolveType(type: string) {
        return classroomTypes[type as keyof typeof classroomTypes].name
    }
</script>

<svelte:head>
    <title>Editar sala de aula | Magrave</title>
</svelte:head>

<header>
    <div>
        <h1>Editar sala de aula</h1>
        <h2>Preencha o formulário para editar a sala de aula</h2>
    </div>
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
    <RadioGroup
        name="type"
        label="Tipo de sala"
        bind:group={$classroom.type}
        options={Object.entries(classroomTypes).map(([value, { icon }]) => ({ value, icon }))}
        parseOption={resolveType}
    />
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
