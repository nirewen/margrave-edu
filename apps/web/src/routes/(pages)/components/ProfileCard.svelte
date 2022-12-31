<script lang="ts">
    import type { User } from '$lib/types/User'
    import Avatar from './Avatar.svelte'

    export let user: User
    export let subtitle = ''
</script>

<button class="profile-card" on:click>
    <Avatar key={user.profile.avatar} alt="avatar de {user.profile.name}" size={3} />
    <div class="info">
        <p>{user.profile.name}</p>
        <span>{subtitle}</span>
    </div>
</button>

<style lang="scss">
    .profile-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        height: fit-content;
        border-radius: 8px;
        box-shadow: var(--elevation-3);
        cursor: pointer;
        background-color: var(--gray-900);
        text-align: left;

        .info {
            p {
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 15ch;
                overflow: hidden;
            }

            span {
                color: var(--gray-300);
                font-size: 0.8rem;
            }
        }
    }
</style>
