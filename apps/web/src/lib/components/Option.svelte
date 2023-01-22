<script lang="ts">
    import { nanoid } from 'nanoid'

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
    <label class:icon>
        <input type="radio" {name} {value} bind:group />
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

        > label {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.2rem;
            padding: 0.4rem 0.6rem;

            > input {
                opacity: 0;
                width: 0;
                height: 0;
                margin-right: -0.2rem;
            }

            &.icon {
                padding-left: 0.4rem;
            }
        }

        &:has(:checked) {
            color: var(--bgColor);
            background-color: var(--color);
        }

        &:has(:focus) {
            outline: 2px solid black;
        }
    }
</style>
