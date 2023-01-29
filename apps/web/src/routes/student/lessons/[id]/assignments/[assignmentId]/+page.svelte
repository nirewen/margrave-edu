<script lang="ts">
    import type { PageData } from './edit/$types'
    import { enhance } from '$app/forms'
    import { format } from '$lib/util'

    export let data: PageData
</script>

<svelte:head>
    <title>Visualizar tarefa | Margrave</title>
</svelte:head>

<header>
    <a role="button" class="ghost icon" href="../../" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </a>
    <hgroup>
        <h1>Visualizar tarefa</h1>
        <h2>Você está visualizando a tarefa</h2>
    </hgroup>
</header>
<div class="page">
    <div class="box">
        <div class="box">
            <b>Descrição</b>
            <p>{data.assignment.description}</p>
        </div>
        <div class="box">
            <b>Data máxima de entrega</b>
            <span>{format(data.assignment.expiresAt)}</span>
        </div>
    </div>

    <div class="box">
        {#each data.assignment.answers as answer}
            {#if answer.user.id === data.user?.id}
                <div class="box">
                    <b>Resposta</b>
                    <p>{answer.content}</p>
                </div>
            {/if}
        {:else}
            <span>Você não enviou nenhuma resposta ainda</span>
        {/each}
    </div>

    <form action="?/submitAnswer" method="POST" use:enhance>
        <div class="box">
            <label for="description">
                <b>Resposta</b>
                <textarea name="content" id="description" />
            </label>
            <div class="box row" style:align-self="flex-end" style:align-items="center">
                <label class="box row" style:flex="0" style:white-space="nowrap">
                    <span>Resposta final</span>
                    <input type="checkbox" name="final" />
                </label>
                <button class="primary">Enviar resposta</button>
            </div>
        </div>
    </form>
</div>

<style lang="scss">
    header {
        display: flex;
        align-items: center;
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
        width: 100%;
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

        .box {
            box-shadow: none;
            padding: 0;
            gap: 0.4rem;
        }

        &.row {
            flex-direction: row;
        }

        p {
            white-space: pre-wrap;
        }
    }
</style>
