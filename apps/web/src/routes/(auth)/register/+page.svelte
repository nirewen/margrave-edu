<script lang="ts">
    import { applyAction, enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

<svelte:head>
    <title>Registrar conta | Margrave</title>
</svelte:head>

<h2><span>Registrar conta</span></h2>

<form
    action="?/register"
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
        <input type="email" name="email" value={form?.data.email ?? ''} required />
    </label>
    <label>
        <span>Senha</span>
        <input type="password" name="password" value={form?.data.password ?? ''} required />
    </label>
    <label>
        <span>Confirmar senha</span>
        <input type="password" name="confirmPassword" value={form?.data.password ?? ''} required />
    </label>
    <!-- TODO: fazer elemento de erro -->
    {#if form?.validationError}
        {#each form?.errors as error}
            <Alert icon="ic:baseline-error" variant="danger">{error.message}</Alert>
        {/each}
    {/if}
    {#if form?.apiError}
        <Alert icon="ic:baseline-error" variant="danger">{form.message}</Alert>
    {/if}
    <button type="submit">Registrar conta</button>
</form>

<footer>
    <span>Já possui uma conta?</span>
    <a href="/login">Acessar conta</a>
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
