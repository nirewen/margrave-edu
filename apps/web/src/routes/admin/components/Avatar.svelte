<script lang="ts">
    import type { PartialUser } from '$lib/types/User'
    import { getRole } from '$lib/util'

    export let user: PartialUser
    export let size = 10
    export let shadow = false
</script>

<div class="avatar" class:shadow>
    <img src="/api/avatar/{user.profile.avatar}" alt="avatar de {user.profile.name}" style:--size={size} />
    <iconify-icon class="role" icon={getRole(user.role).icon} width={(size * 16) / 3.5} />
</div>

<style lang="scss">
    .avatar {
        position: relative;
        border-radius: 9999px;
        border: 3px solid var(--gray-900);
        flex-shrink: 0;

        > img {
            width: calc(var(--size) * 1rem);
            height: calc(var(--size) * 1rem);
            pointer-events: none;
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
