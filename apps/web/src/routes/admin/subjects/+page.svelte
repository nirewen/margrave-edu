<script lang="ts">
    import Avatar from '$lib/components/Avatar.svelte'
    import InfoCard from '$lib/components/InfoCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
</script>

<svelte:head>
    <title>Disciplinas | Margrave</title>
</svelte:head>

<header>
    <hgroup>
        <h1>Disciplinas</h1>
        <h2>Disciplinas registradas no sistema</h2>
    </hgroup>

    <a role="button" class="ghost round" href="./add">
        <iconify-icon icon="ic:baseline-add" width={24} />
        Adicionar
    </a>
</header>
{#if !data.subjects.length}
    <div class="page">Nenhuma disciplina encontrada</div>
{:else}
    <div class="page">
        <div class="grid">
            {#each data.subjects as subject}
                <InfoCard color={subject.color}>
                    <iconify-icon class="inverted" slot="icon" icon={subject.icon} width="48" />
                    <svelte:fragment slot="title">{subject.name}</svelte:fragment>
                    <svelte:fragment slot="subtitle">
                        <Avatar avatar={subject.teacher.profile.avatar} size={1} />
                        {subject.teacher.profile.name}
                    </svelte:fragment>
                    <a role="button" href="./{subject.id}/edit" class="ghost icon" slot="action">
                        <iconify-icon icon="ic:baseline-edit" width="28" />
                    </a>
                </InfoCard>
            {/each}
        </div>
    </div>
{/if}

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
    }

    .page {
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 20rem;
    }

    .page .grid {
        display: grid;
        gap: 0.8rem;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        height: fit-content;
    }
</style>
