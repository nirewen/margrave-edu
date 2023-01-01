<script lang="ts">
    import { page } from '$app/stores'
    import MenuList from './MenuList.svelte'

    const links = [
        { name: 'Dashboard', route: '/admin/dashboard', icon: 'ic:round-grid-view' },
        {
            name: 'Usuários',
            route: '/admin/users',
            icon: 'mdi:account-multiple',
            routes: [
                { name: 'Estudantes', route: '/admin/users/students', icon: 'ic:round-school' },
                { name: 'Professores', route: '/admin/users/teachers', icon: 'mdi:human-male-board' },
            ],
        },
        { name: 'Aulas', route: '/admin/lessons', icon: 'ic:baseline-play-lesson' },
        { name: 'Disciplinas', route: '/admin/subjects', icon: 'ic:round-menu-book' },
        { name: 'Turmas', route: '/admin/classes', icon: 'ic:baseline-groups-2' },
    ]
</script>

<nav>
    <header>
        <h1>Margrave</h1>
    </header>
    <p>Menu principal</p>
    <MenuList {links} />
</nav>

<style lang="scss">
    nav {
        grid-area: sidebar;
        padding: 2rem 4rem 2rem 1rem;

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
    }
</style>
