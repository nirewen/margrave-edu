<script lang="ts">
    import { applyAction, enhance } from '$app/forms'
    import Button from '$lib/components/Button.svelte'
    import TextInput from '$lib/components/TextInput.svelte'
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

<svelte:head>
    <title>Registrar conta | Magrave</title>
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
    <TextInput type="email" label="Email" id="email" name="email" required />
    <TextInput type="password" label="Senha" id="password" name="password" required />
    <!-- TODO: fazer elemento de erro -->
    {#if form?.error}
        <span>{form?.message}</span>
    {/if}
    <Button type="submit">Registrar conta</Button>
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
