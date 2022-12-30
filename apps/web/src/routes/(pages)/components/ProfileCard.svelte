<script lang="ts">
    import type { User } from '$lib/types/User'
    import { dateFormat } from '$lib/util'

    export let href: string | undefined = undefined
    export let user: User

    $: element = !!href ? 'a' : 'div'
</script>

<svelte:element this={element} class="profile-card">
    <img
        class="avatar"
        src="/api/avatar/{user.profile.avatar}"
        alt="avatar de {user.profile.name || user.email}"
    />
    <div class="info">
        <p>{user.profile.name}</p>
        <span>aluno desde {dateFormat.format(new Date(user.createdAt))}</span>
    </div>
</svelte:element>

<style lang="scss">
    .profile-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: var(--elevation-3);

        img.avatar {
            width: 3rem;
            height: 3rem;
        }

        h1 {
            font-size: 1.6rem;
        }

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
