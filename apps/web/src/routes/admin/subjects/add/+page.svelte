<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import Avatar from '$lib/components/Avatar.svelte'
    import Option from '$lib/components/Option.svelte'
    import type { ActionData, PageData } from './$types'

    export let form: ActionData
    export let data: PageData
</script>

<svelte:head>
    <title>Adicionar nova disciplina | Magrave</title>
</svelte:head>

<header>
    <a role="button" class="ghost icon" href="./" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </a>
    <div>
        <h1>Nova disciplina</h1>
        <h2>Preencha o formulário para adicionar uma nova disciplina</h2>
    </div>
</header>
{#if form?.error && form?.message}
    <Alert variant="danger">{form?.message}</Alert>
{/if}
<form method="POST" use:enhance>
    <div class="form">
        <div class="box">
            <div class="box row">
                <div class="box" style:flex={1}>
                    <label data-error={form?.errors?.name}>
                        <span>Nome</span>
                        <input type="text" name="name" value={form?.data?.name ?? ''} required />
                    </label>
                </div>
                <label data-error={form?.errors?.icon}>
                    <span>Ícone</span>
                    <input type="text" name="icon" value={form?.data?.icon ?? ''} required />
                </label>
                <label data-error={form?.errors?.color}>
                    <span>Cor</span>
                    <input type="color" name="color" value={form?.data?.color ?? ''} required />
                </label>
            </div>
            <div class="box row">
                <label data-error={form?.errors?.type}>
                    <span>Tipo da disciplina</span>
                    <input type="text" name="type" value={form?.data?.type ?? ''} placeholder="Exatas" />
                </label>
                <label data-error={form?.errors?.hours}>
                    <span>Hora de demanda</span>
                    <input type="number" name="hours" value={form?.data?.hours ?? ''} />
                </label>
            </div>
        </div>
        <div class="box">
            <button type="submit">Salvar</button>
        </div>
    </div>
    <div class="box">
        <label for="teacherId" data-error={form?.errors?.teacherId}>
            <span>Professor</span>
            <fieldset id="teacherId" role="radiogroup">
                {#each [...data.teachers] as teacher}
                    <Option name="teacherId" group={form?.data?.teacherId} value={teacher.id}>
                        <Avatar slot="icon" avatar={teacher.profile.avatar} size={3} />
                        <span>{teacher.profile.name}</span>
                        <small>{teacher.email}</small>
                    </Option>
                {/each}
            </fieldset>
        </label>
    </div>
</form>

<style lang="scss">
    header {
        display: flex;
        align-items: center;
        gap: 1rem;

        h1 {
            font-size: 1.8rem;
            font-weight: 700;
        }

        h2 {
            color: var(--gray-400);
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

            &.row {
                flex-direction: row;

                > * {
                    justify-self: stretch;
                }
            }

            > .box {
                box-shadow: none;
                padding: 0;
            }
        }
    }
</style>
