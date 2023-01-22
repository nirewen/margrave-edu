<script lang="ts">
    import InfoCard from '../components/InfoCard.svelte'
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

    <a role="button" class="ghost round" href="./subjects/add">
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
                <InfoCard title={subject.name} subtitle={subject.teacher.profile.name} clickable={false}>
                    <a role="button" href="./subjects/{subject.id}/edit" class="ghost icon" slot="right">
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
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        height: fit-content;
    }
</style>
