<script lang="ts">
    import { nanoid } from 'nanoid'

    import type { HTMLInputTypeAttribute } from 'svelte/elements'
    export let id: string = nanoid()
    export let label: string | undefined = undefined
    export let type: HTMLInputTypeAttribute | 'textarea' = 'text'
    export let value: any = undefined
</script>

<div class="form-group">
    {#if !!label}
        <label for={id}>{label}</label>
    {/if}
    {#if type === 'email'}
        <input type="email" bind:value {id} {...$$props} />
    {:else if type === 'password'}
        <input type="password" bind:value {id} {...$$props} />
    {:else if type === 'number'}
        <input type="number" bind:value {id} {...$$props} />
    {:else if type === 'date'}
        <input type="date" bind:value {id} {...$$props} />
    {:else if type === 'datetime-local'}
        <input type="datetime-local" bind:value {id} {...$$props} />
    {:else if type === 'textarea'}
        <textarea bind:value {id} {...$$props} />
    {:else}
        <input type="text" bind:value {id} {...$$props} />
    {/if}
</div>

<style lang="scss" scoped>
    div.form-group {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        input,
        textarea {
            padding: 0.4rem 0.6rem;
            border-radius: 0.4rem;
            border: 1px solid rgba(0, 0, 0, 0.16);
            color: var(--gray-300);

            outline-offset: 2px;
        }
    }
</style>
