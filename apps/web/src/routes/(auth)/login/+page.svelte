<script lang="ts">
    import { applyAction, enhance } from '$app/forms'
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

<svelte:head>
    <title>Login | Magrave</title>
</svelte:head>

<h2><span>Acessar conta</span></h2>

<form
    action="?/login"
    method="POST"
    use:enhance={() => {
        return async ({ result, update }) => {
            if (result.type === 'failure') {
                await applyAction(result)
            }

            update()
        }
    }}
>
    <label>
        <span>Email</span>
        <input type="email" name="email" required />
    </label>
    <label>
        <span>Senha</span>
        <input type="password" name="password" required />
    </label>
    <!-- TODO: fazer elemento de erro -->
    {#if form?.error}
        <span>{form?.message}</span>
    {/if}
    <button type="submit">Fazer login</button>
</form>

<footer>
    <span>Não possui uma conta?</span>
    <a href="/register">Criar conta</a>
</footer>

<style lang="scss" scoped>
    h2 {
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #000;
        line-height: 0.1em;
        margin: 10px 0 20px;
        opacity: 60%;
        text-transform: uppercase;
        font-weight: 600;
    }

    h2 span {
        background: #fff;
        padding: 0 10px;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    footer {
        margin-top: auto;
        color: var(--gray-300);

        > a {
            text-decoration: underline;
            text-underline-offset: 3px;
        }
    }
</style>
