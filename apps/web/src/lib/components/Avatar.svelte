<script lang="ts">
    import { type RoleID, roles } from '$lib/util'

    export let avatar: string | undefined = undefined
    export let alt: string = ''
    export let role: RoleID | undefined = undefined
    export let size = 10
    export let shadow = false
</script>

<div class="avatar" class:shadow style:--size={size}>
    <img src={avatar ?? '/assets/default-avatar.png'} {alt} />
    {#if role}
        <iconify-icon class="role" icon={roles.get(role)?.icon} width={(size * 16) / 4} />
    {/if}
</div>

<style lang="scss">
    .avatar {
        position: relative;
        border-radius: 9999px;
        border: calc(var(--size) * 1px / 3) solid var(--gray-900);
        flex-shrink: 0;

        > img {
            width: calc(var(--size) * 1rem);
            height: calc(var(--size) * 1rem);
            pointer-events: none;
            border-radius: 9999px;
            object-fit: cover;
        }

        &.shadow {
            box-shadow: var(--elevation-6);
        }

        > iconify-icon {
            position: absolute;
            right: 0;
            bottom: 0;
            translate: 5% 5%;
            background-color: var(--gray-900);
            border-radius: 9999px;
            padding: 6%;
            box-shadow: var(--elevation-6);
        }
    }
</style>
