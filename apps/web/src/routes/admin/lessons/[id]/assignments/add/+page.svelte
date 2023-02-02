<script lang="ts">
    import type { ActionData } from './$types'
    import { format } from '$lib/util'
    import { enhance } from '$app/forms'

    export let form: ActionData
</script>

<svelte:head>
    <title>Adicionar tarefa | Margrave</title>
</svelte:head>

<header>
    <a role="button" class="ghost icon" href="../" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </a>
    <hgroup>
        <h1>Adicionar tarefa</h1>
        <h2>Preencha o formulário para adicionar uma tarefa a essa aula</h2>
    </hgroup>
</header>
<form method="POST" use:enhance>
    <div class="form">
        <div class="box">
            <div class="box" style:flex="1">
                <label data-error={form?.errors?.description}>
                    <span>Descrição</span>
                    <textarea name="description" value={form?.data?.description ?? ''} required />
                </label>
            </div>
            <label data-error={form?.errors?.expiresAt} style:flex="0">
                <span>Data máxima de entrega</span>
                <input
                    type="date"
                    name="expiresAt"
                    value={form?.data?.expiresAt ?? format(new Date().toISOString(), true)}
                    required
                />
            </label>
        </div>
        <div class="box">
            <button type="submit">Registrar tarefa</button>
        </div>
    </div>
</form>

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

    form {
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 20rem;

        .form {
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

            > .box {
                box-shadow: none;
                padding: 0;
            }
        }
    }
</style>
