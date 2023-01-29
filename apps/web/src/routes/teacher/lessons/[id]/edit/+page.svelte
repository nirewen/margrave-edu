<script lang="ts">
    //@ts-ignore
    import Tags from 'svelte-tags-input'

    import type { ActionData, PageData } from './$types'
    import { format } from 'date-fns'

    export let data: PageData
    export let form: ActionData

    let tags: string[] = form?.data.tags ?? data.lesson.tags
</script>

<svelte:head>
    <title>Editar aula | Margrave</title>
</svelte:head>

<header>
    <a role="button" class="ghost icon" href="../../" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </a>
    <hgroup>
        <h1>Editar aula</h1>
        <h2>Preencha o formulário para editar a aula</h2>
    </hgroup>
</header>
<form method="POST">
    <div class="form">
        <div class="box">
            <div class="box" style:flex="1">
                <label data-error={form?.errors?.title}>
                    <span>Título</span>
                    <input type="text" name="title" value={form?.data?.title ?? data.lesson.title} required />
                </label>
            </div>
            <label data-error={form?.errors?.description} style:flex="0">
                <span>Descrição</span>
                <textarea
                    name="description"
                    value={form?.data?.description ?? data.lesson.description}
                    required
                />
            </label>
            <div class="box row">
                <label data-error={form?.errors?.timespan} style:flex="1">
                    <span>Duração</span>
                    <input
                        type="time"
                        name="timespan"
                        value={form?.data?.timespan ?? data.lesson.timespan}
                        required
                    />
                </label>
                <label data-error={form?.errors?.timespan} style:flex="1">
                    <span>Data</span>
                    <input
                        type="date"
                        name="date"
                        value={form?.data?.date ?? format(new Date(data.lesson.date), 'yyyy-MM-dd')}
                        required
                    />
                </label>
            </div>
            <label data-error={form?.errors?.tags} style:flex="0">
                <span>Tags</span>
                <input type="hidden" name="tags" bind:value={tags} />
                <Tags addKeys={[9, 13, 32, 188]} bind:tags />
            </label>
        </div>
        <div class="box">
            <button type="submit">Salvar aula</button>
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
