<script lang="ts">
    import { applyAction, enhance } from '$app/forms'
    import Button from '$lib/components/Button.svelte'
    import TextInput from '$lib/components/TextInput.svelte'
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

<h2><span>Registrar conta</span></h2>

<form
    action="?/login"
    method="POST"
    use:enhance={({ form }) => {
        return async ({ result, update }) => {
            if (result.type === 'failure') {
                await applyAction(result)
            }

            update()
        }
    }}
>
    <div class="form-group">
        <TextInput type="email" label="Email" id="email" name="email" required />
    </div>
    <div class="form-group">
        <TextInput type="password" label="Password" id="password" name="password" required />
    </div>
    <!-- TODO: fazer elemento de erro -->
    {#if form?.error}
        <span>{form?.message}</span>
    {/if}
    <Button type="submit">Submit</Button>
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

        > .form-group {
            display: flex;
            flex-direction: column;
        }
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
