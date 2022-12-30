<script lang="ts">
    import { page } from '$app/stores'

    const links = [
        { name: 'Dashboard', route: '/dashboard', icon: '' },
        { name: 'Estudantes', route: '/dashboard/students', icon: '' },
        { name: 'Professores', route: '/dashboard/teachers', icon: '' },
        { name: 'Aulas', route: '/dashboard/lessons', icon: '' },
        { name: 'Disciplinas', route: '/dashboard/subjects', icon: '' },
        { name: 'Turmas', route: '/dashboard/classes', icon: '' },
    ]
</script>

<nav>
    <header>
        <h1>Margrave</h1>
    </header>
    <p>Menu principal</p>
    <ul>
        {#each links as link}
            <li class:active={$page.url.pathname === link.route}>
                <a href={link.route}>{link.name}</a>
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
            margin: 0.6rem 0;
        }

        ul {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;

            li {
                display: flex;
                border-radius: 8px;
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
