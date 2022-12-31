<script lang="ts">
    import { page } from '$app/stores'

    const links = [
        { name: 'Dashboard', route: '/dashboard', icon: 'ic:round-grid-view' },
        { name: 'Estudantes', route: '/students', icon: 'ic:round-school' },
        { name: 'Professores', route: '/teachers', icon: 'ic:round-people-alt' },
        { name: 'Aulas', route: '/lessons', icon: 'ic:baseline-play-lesson' },
        { name: 'Disciplinas', route: '/subjects', icon: 'ic:round-menu-book' },
        { name: 'Turmas', route: '/classes', icon: 'ic:baseline-groups-2' },
    ]
</script>

<nav>
    <header>
        <h1>Margrave</h1>
    </header>
    <p>Menu principal</p>
    <ul>
        {#each links as { name, route, icon }}
            <li class:active={$page.url.pathname === route}>
                <iconify-icon {icon} width={28} />
                <a href={route}>{name}</a>
            </li>
        {/each}
    </ul>
</nav>

<style lang="scss">
    nav {
        grid-area: sidebar;
        padding: 2rem 6rem 2rem 1rem;

        color: var(--primary-text);
        background-color: var(--primary);

        header {
            margin-bottom: 1rem;
            color: var(--gray-900);

            > h1 {
                font-size: 2rem;
                font-weight: 700;
            }
        }

        p {
            font-size: 1.2rem;
            font-weight: 600;
            margin: 0.6rem 0.8rem;
        }

        ul {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;

            li {
                display: flex;
                align-items: center;
                padding: 0.4rem 0.6rem;
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
        }
    }
</style>
