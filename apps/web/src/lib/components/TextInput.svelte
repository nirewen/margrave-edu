<script lang="ts">
    import { nanoid } from 'nanoid'

    import type { HTMLInputTypeAttribute } from 'svelte/elements'
    export let id: string = nanoid()
    export let label: string | undefined = undefined
    export let type: HTMLInputTypeAttribute | 'textarea' = 'text'
    export let value: any = undefined
    export let errored = false
    export let error: string | undefined = undefined
</script>

<div class="form-group" class:errored>
    {#if !!label}
        <label for={id}>
            {label}
            {#if errored}
                <span>
                    <iconify-icon icon="ic:baseline-error" width="1.2rem" />
                    {error}
                </span>
            {/if}
        </label>
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

        label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        &.errored {
            color: var(--red);

            > label > span {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                font-weight: 500;

                border-left: 2px solid currentColor;
                padding-left: 0.5rem;
            }

            > :is(input, textarea) {
                outline-style: solid;
                border-color: var(--red);
                outline-color: var(--red);
                outline-width: 2px;
            }
        }
    }
</style>
