<script lang="ts">
    import { page } from '$app/stores'
    import { slide } from 'svelte/transition'

    export let links: any[]
    export let child = false
    export let open: boolean
</script>

<ul class:child transition:slide>
    {#each links as { name, route, icon, routes }}
        <li class:nested={routes && routes.length > 0}>
            <a
                class="label"
                class:open
                class:active={($page.url.pathname + '?' + $page.url.searchParams).startsWith(route)}
                href={route}
            >
                <iconify-icon {icon} width={28} />
                <span>{name}</span>
            </a>
            {#if routes && routes.length > 0 && open}
                <svelte:self links={routes} child {open} />
            {/if}
        </li>
    {/each}
</ul>

<style lang="scss">
    ul {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        overflow-y: clip;
        transition: all 200ms linear;

        li {
            display: flex;
            flex-direction: column;
            justify-content: center;

            > .label {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                padding: 0.4rem 0.8rem;
                border-radius: 0.7rem;
                font-weight: 600;
                transition: all 200ms linear;
                height: 50px;
                max-width: 54px;

                > span {
                    flex: 1;
                    transition: all 200ms linear;
                    max-width: 0;
                    overflow: hidden;
                }

                &.open {
                    max-width: 220px;

                    > span {
                        max-width: 300px;
                    }
                }

                &.active {
                    position: relative;
                    color: var(--accent);
                    background-color: var(--primary-text);
                }
            }

            &.nested {
                gap: 0.2rem;
                position: relative;
            }
        }

        &.child {
            margin-left: 1.4rem;

            > li:has(.active) {
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    bottom: 1.2rem;
                    left: -0.8rem;
                    border-width: 0 0 0.2rem 0.2rem;
                    border-radius: 0 0 0 1rem;
                    width: calc(13px - 0.2rem);
                    height: 200px;
                }
            }
        }
    }
</style>
