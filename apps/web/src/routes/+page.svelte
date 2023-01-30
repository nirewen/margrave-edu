<script lang="ts">
</script>

<svelte:head>
    <title>Início | Margrave</title>
</svelte:head>

<div class="navbar">
    <a class="brand" href="/">Margrave</a>
    <ul>
        <li>
            <a href="/">Início</a>
        </li>
        <li>
            <a class="ghost" href="./login/" role="button">Login</a>
        </li>
    </ul>
</div>

<style lang="scss">
    .navbar {
        display: flex;
        align-items: center;
        grid-area: navbar;

        padding: 1rem 15vw;

        color: var(--gray-900);
        background-color: var(--primary);

        .brand {
            font-size: 1.5rem;
            font-weight: 600;
        }

        ul {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-left: auto;
        }
    }
</style>
