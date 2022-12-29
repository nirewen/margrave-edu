<script lang="ts">
    import { page } from '$app/stores'
    import type { User } from 'src/types/user'

    const user: User = $page.data.user
</script>

<div class="user">
    <img src="/api/avatar/{user.profile.avatar}" alt="seu avatar" class="avatar" />
    {user.profile.name || user.email}
</div>

<style lang="scss">
    .user {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.4rem;
        padding-right: 1rem;

        background-color: #f7f7f7;
        border-radius: 9999px;

        > img {
            width: 32px;
            height: 32px;
            border-radius: 9999px;
        }
    }
</style>
