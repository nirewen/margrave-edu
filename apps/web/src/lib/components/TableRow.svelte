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
        padding-left: 0.8rem;
        height: fit-content;
        width: 100%;
        max-width: min-content;
        border-radius: 8px;
        background-color: var(--gray-900);
        text-align: left;
        transition: scale 50ms linear;
        color: var(--gray-000);
        text-transform: none;
        font-weight: 400;
        color: var(--color);

        &.shadow {
            box-shadow: var(--elevation-3);
        }

        .content {
            display: grid;
            gap: 1rem;
            flex: 1;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 15ch;
            overflow: hidden;
        }
    }
</style>
