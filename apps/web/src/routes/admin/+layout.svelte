<script lang="ts">
    import Menu from './components/Menu.svelte'
    import NavBar from './components/NavBar.svelte'
</script>

<Menu />
<NavBar />
<main class="content">
    <slot />
</main>
