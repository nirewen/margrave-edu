<script lang="ts">
    import Menu from './components/Menu.svelte'
</script>

<main>
    <Menu />
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
        grid-template-rows: 3rem auto;
        gap: 1rem;
        height: 100%;

        > .content {
            grid-area: content;
        }
    }
</style>
