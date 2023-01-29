<script lang="ts">
    import InfoCard from '$lib/components/InfoCard.svelte'
    import { format } from '$lib/util'
    import type { PageData } from './$types'

    export let data: PageData
</script>

<svelte:head>
    <title>Aulas | Margrave</title>
</svelte:head>

<header>
    <hgroup>
        <h1>Aulas</h1>
        <h2>Aulas das suas turmas</h2>
    </hgroup>
</header>

{#if !data.classes.length}
    <div class="page">Nenhuma aula encontrada</div>
{/if}
<div class="page">
    <div class="box">
        {#each data.classes as it}
            <div class="box">
                <span>
                    <b>{it.number}</b>
                    <small>{it.period}</small>
                </span>
                <div class="grid">
                    {#each it.lessons as lesson}
                        <InfoCard href="./{lesson.id}/">
                            <svelte:fragment slot="title">{lesson.title}</svelte:fragment>
                            <svelte:fragment slot="subtitle">{format(lesson.date)}</svelte:fragment>
                        </InfoCard>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
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
    }

    .page {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .grid {
            display: grid;
            gap: 0.8rem;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            height: fit-content;
        }

        .box {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            background-color: var(--gray-900);
            box-shadow: var(--elevation-3);
            border-radius: 0.8rem;
            height: fit-content;

            > .box {
                box-shadow: none;
                padding: 0;
            }
        }
    }
</style>
