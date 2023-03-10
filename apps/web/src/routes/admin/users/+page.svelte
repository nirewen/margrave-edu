<script lang="ts">
    import { writable } from 'svelte/store'
    import { flip } from 'svelte/animate'
    import { fade } from 'svelte/transition'
    import { queryParam } from 'sveltekit-search-params'

    import Avatar from '$lib/components/Avatar.svelte'
    import { type RoleID, roles, format } from '$lib/util'

    import Profile from '../components/Profile.svelte'
    import InfoCard from '$lib/components/InfoCard.svelte'

    import type { PageData } from './$types'

    export let data: PageData

    const role = queryParam('role', {
        encode: (value: string) => value,
        decode: (value: string | null) => (value ? (value as RoleID) : null),
    })

    $: filteredRole = $role ? roles.get($role) : null
    $: selected = writable(data.users.at(0))
</script>

<svelte:head>
    <title>Usuários | Margrave</title>
</svelte:head>

<header>
    <hgroup>
        <h1>
            {filteredRole?.name.formal.plural ?? 'Usuários'} <span class="badge">{data.users.length}</span>
        </h1>
        <h2>Lista de todos os {filteredRole?.name.plural ?? 'usuários'} registrados</h2>
    </hgroup>
    <div class="filter">
        <iconify-icon icon="mdi:filter-variant" width={28} />
        <div class="buttons">
            <a role="button" href="/admin/users/" class="{!$role ? 'primary' : 'ghost'} round">Todos</a>
            {#each [...roles] as [id, { icon }]}
                <a
                    role="button"
                    href="/admin/users/?role={id}"
                    class="icon round {$role === id ? 'primary' : 'ghost'}"
                >
                    <iconify-icon {icon} width={24} />
                </a>
            {/each}
        </div>
    </div>
    <a role="button" href="./add?role={$role ?? 'STUDENT'}" class="round ghost">
        <iconify-icon icon={filteredRole?.icon ?? 'mdi:add'} width={24} />
        Adicionar
    </a>
</header>
<div class="page">
    {#if data.users.length > 0}
        <div class="grid">
            {#each data.users as user (user.id)}
                <div class="user" animate:flip={{ duration: 300 }} transition:fade|local>
                    <InfoCard on:click={() => ($selected = user)} selected={$selected.id === user.id} scale>
                        <Avatar
                            slot="icon"
                            avatar={user.profile.avatar}
                            role={user.role}
                            alt="avatar de {user.profile.name}"
                            size={3}
                        />
                        <svelte:fragment slot="title">{user.profile.name}</svelte:fragment>
                        <svelte:fragment slot="subtitle"
                            >usuário desde {format(user.createdAt)}</svelte:fragment
                        >
                    </InfoCard>
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
            }

            h2 {
                color: var(--gray-400);
            }
        }

        .badge {
            border-radius: 0.6rem;
            padding: 0 0.6rem;
            font-size: 1.3rem;
            color: var(--gray-900);
            background-color: var(--accent);
            vertical-align: text-bottom;
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
