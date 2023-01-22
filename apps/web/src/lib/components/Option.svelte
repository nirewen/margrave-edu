<script lang="ts">
    export let bgColor: string = '#FFFFFF'
    export let color: string = '#000000'
    export let name: string
    export let value: string
    export let group: string | undefined = undefined
</script>

<label
    role="radio"
    aria-checked={group === value}
    class="button-select"
    style="--color: {color}; --bgColor: {bgColor};"
>
    <input type="radio" {name} {value} bind:group />
    <slot name="icon" />
    <p><slot /></p>
</label>

<style lang="scss">
    label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.2rem;

        padding: 0.4rem 0.6rem;
        border: 1px solid var(--color);
        border-radius: 0.5rem;
        color: var(--color);
        background-color: var(--bgColor);

        > input {
            opacity: 0;
            width: 0;
            height: 0;
            margin-right: -0.2rem;
        }

        > p {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
        }

        &.icon {
            padding-left: 0.4rem;
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
