<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import { roles, type RoleID } from '$lib/util'
    import type { ActionData, PageData } from './$types'

    export let data: PageData
    export let form: ActionData

    const role = (form?.data?.role || data.query.role) as RoleID

    $: roleName = roles.get(role)?.name.single
</script>

<svelte:head>
    <title>Adicionar novo {roleName} | Magrave</title>
</svelte:head>

<header>
    <div>
        <h1>Novo {roleName}</h1>
        <h2>Preencha o formulário para adicionar um novo {roleName}</h2>
    </div>
</header>
{#if form?.errored && form?.error}
    <Alert variant="danger">{form?.error}</Alert>
{/if}
<form method="POST" use:enhance>
    <label data-error={form?.errors?.email?.at(0)}>
        <span>Email</span>
        <input type="email" name="email" placeholder="email@margrave.edu" value={form?.data?.email ?? ''} />
    </label>
    <label data-error={form?.errors?.password?.at(0)}>
        <span>Senha</span>
        <input
            type="password"
            name="password"
            placeholder={'•'.repeat(16)}
            value={form?.data?.password ?? ''}
        />
    </label>
    <button type="submit">Criar {roleName}</button>
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
        width: 40rem;
    }
</style>
