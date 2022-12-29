<script>
    import NavUser from './NavUser.svelte'
</script>

<nav>
    <NavUser />
</nav>

<style lang="scss">
    nav {
        display: flex;
        align-items: center;
        justify-content: end;
        padding: 1rem;
        grid-area: navbar;
    }
</style>
