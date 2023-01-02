<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import { dateFormat } from '$lib/util'
    import { writable } from 'svelte/store'
    import Profile from '../components/Profile.svelte'
    import ProfileCard from '../components/ProfileCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
    let selected = writable(data.users[0])
</script>

<svelte:head>
    <title>Usuários | Margrave</title>
</svelte:head>

<header>
    <div>
        <h1>Usuários</h1>
        <h2>Lista de todos os usuários registrados</h2>
    </div>
    <div>
        <Button href="/admin/users/add">
            <iconify-icon icon="mdi:account-multiple-plus" width={28} />
            Adicionar
        </Button>
    </div>
</header>
<div class="page">
    {#if data.users.length > 0}
        <div class="grid">
            {#each data.users as user}
                <ProfileCard
                    {user}
                    subtitle="usuário desde {dateFormat.format(new Date(user.createdAt))}"
                    on:click={() => ($selected = user)}
                />
            {/each}
        </div>
        {#if $selected}
            <Profile title="Perfil de usuário" user={$selected} editable />
        {/if}
    {:else}
        <h3>Nenhum usuário registrado...</h3>
    {/if}
</div>

<style lang="scss">
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h1 {
            font-size: 1.8rem;
            font-weight: 700;
        }

        h2 {
            color: var(--gray-400);
        }
    }

    .page {
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 20rem;
    }

    .page .grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
        height: fit-content;
    }
</style>
