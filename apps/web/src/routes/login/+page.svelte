<script lang="ts">
    import { applyAction, enhance } from '$app/forms'
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
    <input type="email" name="email" />
    <input type="password" name="password" />
    {#if form?.error}
        <span>{form?.message}</span>
    {/if}
    <button type="submit">Submit</button>
</form>
