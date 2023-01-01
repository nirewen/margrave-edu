<script lang="ts">
    export let key: string
    export let alt = key
    export let size = 10
    export let shadow = false
</script>

<img class="avatar" src="/api/avatar/{key}" {alt} style:--size={size} class:shadow />

<style lang="scss">
    img.avatar {
        width: calc(var(--size) * 1rem);
        height: calc(var(--size) * 1rem);
        border-radius: 9999px;
        border: 3px solid var(--gray-900);

        &.shadow {
            box-shadow: var(--elevation-6);
        }
    }
</style>
