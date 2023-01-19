<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import Button from '$lib/components/Button.svelte'
    import RadioGroup from '$lib/components/RadioGroup.svelte'
    import TextInput from '$lib/components/TextInput.svelte'
    import { classroomTypes } from '$lib/util'
    import type { ActionData } from './$types'

    export let form: ActionData

    function resolveType(type: string) {
        return classroomTypes[type as keyof typeof classroomTypes].name
    }
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
    <TextInput type="text" name="building" label="Prédio" value={form?.data?.building ?? ''} required />
    <TextInput
        type="number"
        name="capacity"
        label="Capacidade"
        value={form?.data?.capacity ?? ''}
        required
        min={0}
    />
    <RadioGroup
        name="type"
        label="Tipo de sala"
        group={String(form?.data.type) ?? ''}
        options={Object.entries(classroomTypes).map(([value, { icon }]) => ({ value, icon }))}
        parseOption={resolveType}
    />
    <Button type="submit">Salvar</Button>
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
