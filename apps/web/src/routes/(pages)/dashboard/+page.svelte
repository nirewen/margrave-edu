<script lang="ts">
    import type { PageData } from './$types'

    export let data: PageData
</script>

<h1>Dashboard</h1>
<h2>Bem vindo ao dashboard</h2>
<pre>{JSON.stringify(data, null, 4)}</pre>

<style lang="scss">
    h1 {
        font-size: 1.6rem;
        font-weight: 700;
    }

    h2 {
        color: var(--gray-400);
    }
</style>
