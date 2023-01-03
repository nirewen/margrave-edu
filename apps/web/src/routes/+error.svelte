<script lang="ts">
    import { page } from '$app/stores'
</script>

<img src="https://http.cat/{$page.status}.jpg" alt="" />

<style lang="scss">
    img {
        grid-column: span 2;
        grid-row: span 2;
        place-self: center;
    }
</style>
