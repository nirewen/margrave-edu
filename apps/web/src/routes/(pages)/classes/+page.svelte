<script lang="ts">
    import type { PageData } from './$types'

    export let data: PageData
</script>

<svelte:head>
    <title>Turmas | Margrave</title>
</svelte:head>

<pre>{JSON.stringify(data, null, 4)}</pre>
