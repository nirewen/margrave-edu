<script lang="ts">
    import { nanoid } from 'nanoid'
    import { setContext } from 'svelte'

    export let id: string = nanoid()
    export let bgColor: string = '#FFFFFF'
    export let color: string = '#000000'
    export let name: string
    export let value: string
    export let icon: string | undefined = undefined
    export let group: string | undefined
    export let parseOption: (option: string) => string = (option: string) => option
</script>

<div
    role="radio"
    aria-checked={group === value}
    class="button-select"
    style="--color: {color}; --bgColor: {bgColor};"
>
    <input type="radio" {id} {name} {value} bind:group />
    <label for={id} class:icon>
        {#if icon}
            <iconify-icon {icon} width={24} />
        {/if}
        {parseOption(value)}
    </label>
</div>

<style lang="scss">
    .button-select {
        border-radius: 0.5rem;
        border: 1px solid var(--color);
        color: var(--color);
        background-color: var(--bgColor);

        > input {
            display: none;
        }

        > label {
            display: flex;
            align-items: center;
            gap: 0.2rem;
            padding: 0.4rem 0.6rem;

            &.icon {
                padding-left: 0.4rem;
            }
        }

        &:has(:checked) {
            color: var(--bgColor);
            background-color: var(--color);
        }
    }
</style>
