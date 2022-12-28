<script lang="ts">
    import { applyAction, enhance } from '$app/forms'
    import Button from '$lib/components/Button.svelte'
    import TextInput from '$lib/components/TextInput.svelte'
    import type { ActionData } from './$types'

    export let form: ActionData
</script>

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

<style lang="scss" scoped>
    form {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        > .form-group {
            display: flex;
            flex-direction: column;
        }
    }
</style>
