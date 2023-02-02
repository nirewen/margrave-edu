<script lang="ts">
    import { createMenu } from 'svelte-headlessui'

    import { page } from '$app/stores'
    import type { User } from '$lib/types/User'

    import Avatar from '$lib/components/Avatar.svelte'
    import { slide } from 'svelte/transition'

    $: user = $page.data.user as User

    const menu = createMenu({ label: 'Actions' })

    $: groups = [
        [
            { href: `/${user?.role.toLowerCase()}/dashboard/`, icon: 'mdi:view-grid', text: `Painel` },
            {
                href: '/logout/',
                icon: 'mdi:logout-variant',
                text: `Encerrar sessão`,
                preload: 'off' as const,
            },
        ],
    ]
</script>

{#if user}
    <menu>
        <button type="button" use:menu.button>
            <Avatar avatar={user.profile.avatar} alt="seu avatar" size={2} />
            <span>{user.profile.name || user.email}</span>
            <iconify-icon icon="mdi:chevron-down" width="18" height="18" />
        </button>

        {#if $menu.expanded}
            <div class="menu" use:menu.items transition:slide={{ duration: 150 }}>
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
{:else}
    <a href="/login/" role="button">Login</a>
{/if}

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
            text-transform: none;
            font-weight: 400;
        }

        > .menu {
            position: absolute;
            right: 0;
            top: 3.5rem;
            background-color: #ffffff;
            transform-origin: top right;
            width: 14rem;
            border-radius: 0.375rem;
            border-top-width: 1px;
            border-color: #f3f4f6;
            box-shadow: var(--elevation-2);
            z-index: 2;

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
