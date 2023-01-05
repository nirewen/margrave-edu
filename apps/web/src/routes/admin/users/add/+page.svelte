<script lang="ts">
    import { enhance } from '$app/forms'
    import Button from '$lib/components/Button.svelte'
    import TextInput from '$lib/components/TextInput.svelte'
    import { getRole, type Role } from '$lib/util'
    import type { PageData } from './$types'

    export let data: PageData

    const role = data.query.role as Role
    $: roleName = getRole(role).name
</script>

<svelte:head>
    <title>Adicionar novo {roleName.toLowerCase()} | Magrave</title>
</svelte:head>

<header>
    <div>
        <h1>Novo {roleName.toLowerCase()}</h1>
        <h2>Preencha o formulário para adicionar um novo {roleName.toLowerCase()}</h2>
    </div>
</header>
<form method="POST" use:enhance>
    <TextInput type="email" name="email" label="Email" placeholder="email@margrave.edu" />
    <TextInput type="password" name="password" label="Senha" placeholder={'•'.repeat(16)} />
    <Button type="submit">Criar {roleName}</Button>
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
        width: 20rem;
    }
</style>
