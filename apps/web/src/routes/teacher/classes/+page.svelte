<script lang="ts">
    import InfoCard from '$lib/components/InfoCard.svelte'
    import type { PageData } from './$types'

    export let data: PageData
</script>

<svelte:head>
    <title>Turmas | Margrave</title>
</svelte:head>

<header>
    <hgroup>
        <h1>Turmas</h1>
        <h2>Turmas divididas por disciplina</h2>
    </hgroup>
</header>

{#if !data.subjects.length}
    <div class="page">Nenhuma turma encontrada</div>
{/if}
{#each data.subjects as subject}
    <div class="page">
        <div class="box" style:grid-template-column="span / 2">
            <h3>
                <iconify-icon
                    class="inverted"
                    icon={subject.icon}
                    width="1.2rem"
                    style:--color={subject.color}
                />
                <span>{subject.name}</span>
            </h3>
            <div class="grid">
                {#each data.classes.filter(c => c.subjects.find(s => s.id === subject.id)) as it}
                    <InfoCard>
                        <svelte:fragment slot="title">{it.number}</svelte:fragment>
                        <svelte:fragment slot="subtitle">{it.period}</svelte:fragment>
                    </InfoCard>
                {/each}
            </div>
        </div>
    </div>
{/each}

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
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .box {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            background-color: var(--gray-900);
            box-shadow: var(--elevation-3);
            border-radius: 0.8rem;
            height: fit-content;

            h3 {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                font-size: 1.2rem;
                font-weight: 600;
                margin-left: 0.3rem;
            }
        }
    }

    .page .grid {
        display: grid;
        gap: 0.8rem;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        height: fit-content;
    }
</style>
