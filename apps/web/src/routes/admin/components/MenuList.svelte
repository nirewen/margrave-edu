<script lang="ts">
    import { page } from '$app/stores'

    export let links: any[]
    export let child = false
</script>

<ul class:child>
    {#each links as { name, route, icon, routes }}
        <li class:nested={routes && routes.length > 0}>
            <span class="label" class:active={$page.url.pathname.startsWith(route)}>
                <iconify-icon {icon} width={28} />
                <a href={route}>{name}</a>
            </span>
            {#if routes && routes.length > 0}
                <svelte:self links={routes} child />
            {/if}
        </li>
    {/each}
</ul>

<style lang="scss">
    ul {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        width: 16rem;
        overflow-y: clip;

        li {
            display: flex;
            flex-direction: column;
            justify-content: center;

            > .label {
                display: flex;
                align-items: center;
                padding: 0.4rem 0.8rem;
                border-radius: 0.7rem;
                font-weight: 600;

                a {
                    flex: 1;
                    padding: 0.4rem 0.6rem;
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
                    height: 100px;
                }
            }
        }
    }
</style>
