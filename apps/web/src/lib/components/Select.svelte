<script lang="ts">
    import { nanoid } from 'nanoid'

    export let label: string | undefined = undefined
    export let id: string = nanoid()
    export let options: string[]
    export let parseOption: (option: string) => string = (option: string) => option
    export let value: any = undefined
</script>

<div class="form-group">
    {#if !!label}
        <label for={id}>{label}</label>
    {/if}
    <select {id} bind:value {...$$props}>
        {#each options as value}
            <option {value}>{parseOption(value)}</option>
        {/each}
    </select>
</div>

<style lang="scss" scoped>
    div.form-group {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        select {
            padding: 0.4rem 0.6rem;
            border-radius: 0.4rem;
            border: 1px solid rgba(0, 0, 0, 0.16);
            color: var(--gray-300);

            outline-offset: 2px;
        }
    }
</style>
