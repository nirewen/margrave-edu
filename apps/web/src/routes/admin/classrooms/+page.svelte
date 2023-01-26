<script lang="ts">
    import { classroomTypes } from '$lib/util'
    import InfoCard from '../components/InfoCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
</script>

<svelte:head>
    <title>Salas de aula | Margrave</title>
</svelte:head>

<header>
    <hgroup>
        <h1>Salas de aula</h1>
        <h2>Salas de aula registradas no sistema</h2>
    </hgroup>

    <a role="button" href="./add" class="round ghost">
        <iconify-icon icon="ic:baseline-add" width={24} />
        Adicionar
    </a>
</header>
{#if !data.classrooms.length}
    <div class="page">Nenhuma sala de aula encontrada</div>
{:else}
    <div class="page">
        <div class="grid">
            {#each data.classrooms as classroom}
                {@const type = classroomTypes.get(classroom.type)}
                <InfoCard>
                    <iconify-icon data-tooltip={type?.name} slot="icon" icon={type?.icon} width="48" />
                    <svelte:fragment slot="title">{classroom.building}</svelte:fragment>
                    <svelte:fragment slot="subtitle">{classroom.capacity}</svelte:fragment>
                    <a role="button" href="./{classroom.id}/edit" class="ghost icon" slot="action">
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
