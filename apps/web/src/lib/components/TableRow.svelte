<script lang="ts">
    export let href: string
    export let columns: string = '1fr 1fr'
    export let shadow = true
</script>

<a class="table-row" {href} class:shadow>
    <div class="content" style:grid-template-columns={columns}>
        <slot />
    </div>
    <slot name="action" />
</a>

<style lang="scss">
    .table-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.4rem;
        height: fit-content;
        width: 100%;
        border-radius: 8px;
        background-color: var(--gray-900);
        text-align: left;
        transition: scale 50ms linear;
        color: var(--gray-000);
        text-transform: none;
        font-weight: 400;
        color: var(--color);
        overflow: hidden;
        box-shadow: var(--elevation-0);

        &.shadow {
            box-shadow: var(--elevation-3);
        }

        .content {
            display: grid;
            gap: 1rem;
            flex: 1;
        }
    }
</style>
