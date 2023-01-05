<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import { dateFormat, getRole, roles } from '$lib/util'
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
    <div class="add-user">
        <iconify-icon icon="mdi:account-multiple-plus" width={28} />
        <span>Adicionar</span>
        <div class="buttons">
            {#each Object.entries(roles) as [id, { icon, name }]}
                <Button href="/admin/users/add?role={id}" icon round variant="ghost">
                    <iconify-icon {icon} width={24} />
                </Button>
            {/each}
        </div>
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
                    selected={$selected.id === user.id}
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
        gap: 1rem;

        h1 {
            font-size: 1.8rem;
            font-weight: 700;
        }

        h2 {
            color: var(--gray-400);
        }

        .add-user {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.2rem;
            padding-left: 1rem;
            background-color: var(--gray-900);
            text-transform: uppercase;
            border-radius: 9999px;
            font-weight: 600;

            > .buttons {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                padding: 0.3rem;
                background-color: var(--primary);
                border-radius: 9999px;
            }
        }
    }

    .page {
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 20rem;
    }

    .page .grid {
        display: grid;
        gap: 0.8rem;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        height: fit-content;
    }
</style>
