<script lang="ts">
    import { nanoid } from 'nanoid'
    import ButtonSelect from './ButtonSelect.svelte'

    export let id: string = nanoid()
    export let name: string
    export let label: string | undefined = undefined
    export let options: {
        value: string
        icon?: string
        color?: string
        bgColor?: string
    }[]
    export let group: string
    export let parseOption: (option: string) => string = (option: string) => option
</script>

<div class="form-group">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <div class="button-group" {id} role="radiogroup">
        {#each options as option, i}
            <ButtonSelect {name} bind:group {...option} {parseOption} />
        {/each}
    </div>
</div>

<style lang="scss">
    div.form-group {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        .button-group {
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }
    }
</style>
