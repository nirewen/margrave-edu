<script lang="ts">
    import Menu from './components/Menu.svelte'
    import NavBar from './components/NavBar.svelte'
</script>

<main>
    <Menu />
    <NavBar />
    <div class="content">
        <slot />
    </div>
</main>

<style lang="scss">
    main {
        display: grid;
        grid-template-areas:
            'sidebar navbar'
            'sidebar content';
        grid-template-columns: 20rem auto;
        grid-template-rows: 4rem auto;
        height: 100%;

        > .content {
            grid-area: content;
            overflow-y: auto;
            padding: 0.8rem 1.4rem;
            background-color: rgba(0, 0, 0, 0.025);
        }
    }
</style>
