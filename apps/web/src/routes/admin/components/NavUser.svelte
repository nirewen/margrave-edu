<script lang="ts">
    import { page } from '$app/stores'
    import type { User } from '$lib/types/User'

    import { clickOutside } from '$lib/directives/clickOutside'
    import { boolean } from '$lib/hooks/boolean'
    import Avatar from '$lib/components/Avatar.svelte'

    const user: User = $page.data.user

    let open = boolean(false)
</script>

<div class="nav-user" class:open={$open} use:clickOutside={() => $open && open.setFalse()}>
    <button type="button" class="user" on:click={open.toggle}>
        <Avatar avatar={user.profile.avatar} alt="seu avatar" size={2} />
        {user.profile.name || user.email}
        <iconify-icon icon="fluent:chevron-down-24-filled" width="18" height="18" />
    </button>
    {#if $open}
        <menu>
            <li>
                <a href="/profile">Perfil</a>
            </li>
            <li>
                <a href="/logout" data-sveltekit-preload-data="off">Logout</a>
            </li>
        </menu>
    {/if}
</div>

<style lang="scss" scoped>
    .nav-user {
        position: relative;

        iconify-icon {
            rotate: 0deg;
            transition: rotate 200ms linear;
        }
        &.open iconify-icon {
            rotate: 180deg;
        }

        .user {
            display: flex;
            align-items: center;
            gap: 0.25rem;

            padding: 0.4rem;
            padding-right: 1rem;

            background-color: #f7f7f7;
            border-radius: 9999px;
        }

        menu {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: calc(100% + 0.4rem);
            background-color: #ffffff;
            width: 12rem;
            right: 0;
            border-radius: 0.5rem;
            box-shadow: var(--elevation-6);
            overflow: hidden;

            > li {
                display: flex;
                text-align: left;

                a {
                    flex: 1;
                    padding: 0.4rem 0.6rem;
                }

                &:hover {
                    background-color: rgba(0, 0, 0, 0.02);
                }
            }
        }
    }
</style>
