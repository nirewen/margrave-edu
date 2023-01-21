<script lang="ts">
    import { createMenu } from 'svelte-headlessui'

    import { page } from '$app/stores'
    import type { User } from '$lib/types/User'

    import { clickOutside } from '$lib/directives/clickOutside'
    import { boolean } from '$lib/hooks/boolean'
    import Avatar from '$lib/components/Avatar.svelte'

    const user: User = $page.data.user

    let open = boolean(false)

    const menu = createMenu({ label: 'Actions' })

    function onSelect(e: Event) {
        console.log('select', (e as CustomEvent).detail)
    }

    const groups = [
        [
            { href: '/profile', icon: 'ic:baseline-account-circle', text: `Perfil` },
            { href: '/logout', icon: 'ic:baseline-logout', text: `Encerrar sessão`, preload: 'off' as const },
        ],
    ]
</script>

<menu>
    <button use:menu.button on:select={onSelect}>
        <Avatar avatar={user.profile.avatar} alt="seu avatar" size={2} />
        <span>{user.profile.name || user.email}</span>
        <iconify-icon icon="fluent:chevron-down-24-filled" width="18" height="18" />
    </button>

    {#if $menu.expanded}
        <div class="menu" use:menu.items>
            {#each groups as group}
                <div class="menu-group">
                    {#each group as option}
                        {@const active = $menu.active === option.text}
                        <a
                            use:menu.item
                            class="menu-item"
                            class:active
                            href={option.href}
                            data-sveltekit-preload-data={option.preload}
                        >
                            <iconify-icon icon={option.icon} width="1.2rem" />
                            {option.text}
                        </a>
                    {/each}
                </div>
            {/each}
        </div>
    {/if}
</menu>

<style lang="scss" scoped>
    menu {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        text-align: right;

        > button {
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.4rem 0.8rem 0.4rem 0.4rem;
            color: var(--gray-000);
            width: 100%;
            border-radius: 9999px;
            background-color: #f7f7f7;
        }

        > .menu {
            position: absolute;
            right: 0;
            margin-top: 8.5rem;
            background-color: #ffffff;
            transform-origin: top right;
            width: 14rem;
            border-radius: 0.375rem;
            border-top-width: 1px;
            border-color: #f3f4f6;
            box-shadow: var(--elevation-2);

            > .menu-group {
                padding: 0.25rem;

                > a.menu-item {
                    display: flex;
                    gap: 0.4rem;
                    padding: 0.5rem;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                    align-items: center;
                    width: 100%;
                    border-radius: 0.375rem;
                    color: var(--gray-000);

                    &.active {
                        background-color: var(--primary);
                        color: #ffffff;
                    }
                }
            }
        }
    }
</style>
