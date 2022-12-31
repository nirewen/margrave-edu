<script lang="ts">
    import { enhance } from '$app/forms'
    import Button from '$lib/components/Button.svelte'
    import TextInput from '$lib/components/TextInput.svelte'
</script>

<header>
    <div>
        <h1>Novo usuário</h1>
        <h2>Preencha o formulário para adicionar um novo usuário</h2>
    </div>
</header>
<form method="POST" use:enhance>
    <TextInput type="email" name="email" label="Email" placeholder="email@margrave.edu" />
    <TextInput type="password" name="password" label="Senha" placeholder="passwordpassword" />
    <Button type="submit">Criar usuário</Button>
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
