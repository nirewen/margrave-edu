<script lang="ts">
    import { writable } from 'svelte/store'
    import { flip } from 'svelte/animate'
    import { fade } from 'svelte/transition'
    import { queryParam } from 'sveltekit-search-params'

    import Button from '$lib/components/Button.svelte'
    import { type Role, dateFormat, getRole, roles } from '$lib/util'

    import Profile from '../components/Profile.svelte'
    import ProfileCard from '../components/ProfileCard.svelte'

    import type { PageData } from './$types'

    export let data: PageData

    const role = queryParam('role', {
        encode: (value: string) => value,
        decode: (value: string | null) => (value ? (value as Role) : null),
    })

    $: filteredRole = $role ? getRole($role) : null
    $: selected = writable(data.users.at(0))
</script>

<svelte:head>
    <title>Usuários | Margrave</title>
</svelte:head>

<header>
    <hgroup>
        <h1>{filteredRole?.namePlural ?? 'usuários'}</h1>
        <h2>Lista de todos os {filteredRole?.namePlural ?? 'usuários'} registrados</h2>
    </hgroup>
    <div class="filter">
        <iconify-icon icon="ic:baseline-filter-alt" width={28} />
        <div class="buttons">
            <Button href="/admin/users" round variant={!$role ? 'primary' : 'ghost'}>Todos</Button>
            {#each Object.entries(roles) as [id, { icon }]}
                <Button href="/admin/users?role={id}" icon round variant={$role === id ? 'primary' : 'ghost'}>
                    <iconify-icon {icon} width={24} />
                </Button>
            {/each}
        </div>
    </div>
    <Button href="/admin/users/add?role={$role ?? 'STUDENT'}" round variant="ghost">
        <iconify-icon icon={filteredRole?.icon ?? 'ic:baseline-add'} width={24} />
        Adicionar
    </Button>
</header>
<div class="page">
    {#if data.users.length > 0}
        <div class="grid">
            {#each data.users as user (user.id)}
                <div class="user" animate:flip={{ duration: 300 }} transition:fade>
                    <ProfileCard
                        {user}
                        subtitle="usuário desde {dateFormat.format(new Date(user.createdAt))}"
                        on:click={() => ($selected = user)}
                        selected={$selected.id === user.id}
                    />
                </div>
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
        display: grid;
        grid-template-columns: 1fr auto auto;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        hgroup {
            h1 {
                font-size: 1.8rem;
                font-weight: 700;
                text-transform: capitalize;
            }

            h2 {
                color: var(--gray-400);
            }
        }

        .filter {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            padding-left: 1rem;
            background-color: var(--gray-900);
            text-transform: uppercase;
            border-radius: 9999px;
            font-weight: 600;
            box-shadow: var(--elevation-2);

            > .buttons {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                padding: 0.3rem;
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
