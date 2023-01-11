<script lang="ts">
    export let variant: 'success' | 'warning' | 'danger' | undefined = undefined
    export let icon: string = 'ic:baseline-error'
    export let hidden = false
    export let hideable = false
</script>

{#if !hidden}
    <div class="alert {variant}">
        {#if icon}
            <iconify-icon class="icon" {icon} width={24} />
        {/if}
        <slot />
        {#if hideable}
            <button class="close" on:click={() => (hidden = true)}>
                <iconify-icon icon="ic:baseline-close" width={16} />
            </button>
        {/if}
    </div>
{/if}

<style lang="scss">
    .alert {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        background-color: var(--content-bg);
        color: var(--gray-000);
        padding: 0.4rem 0.6rem;
        box-shadow: var(--elevation-2);
        border-radius: 0.6rem;

        > .icon {
            float: left;
        }

        > .close {
            float: right;
            margin-left: auto;
            align-items: center;
        }

        &.danger {
            background-color: var(--red);
            color: var(--gray-900);
        }
    }
</style>
