<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import Option from '$lib/components/Option.svelte'
    import { classroomTypes } from '$lib/util'
    import type { ActionData, PageData } from './$types'

    export let data: PageData
    export let form: ActionData
</script>

<svelte:head>
    <title>Editar turma | Magrave</title>
</svelte:head>

<header>
    <div>
        <h1>Editar turma</h1>
        <h2>Preencha o formulário para editar a turma</h2>
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
                    <label data-error={form?.errors?.number}>
                        <span>Número</span>
                        <input
                            type="text"
                            name="number"
                            value={form?.data?.number ?? data.class.number}
                            required
                        />
                    </label>
                </div>
                <label data-error={form?.errors?.period}>
                    <span>Período</span>
                    <input
                        type="text"
                        name="period"
                        value={form?.data?.period ?? data.class.period}
                        required
                    />
                </label>
            </div>
            <div class="box">
                <label for="shift" data-error={form?.errors?.shift}>
                    <span>Turno</span>
                    <fieldset class="inline" id="shift" role="radiogroup">
                        {#each ['MORNING', 'AFTERNOON', 'NIGHT'] as value}
                            <Option name="shift" group={form?.data?.shift ?? data.class.shift} {value}>
                                {value}
                            </Option>
                        {/each}
                    </fieldset>
                </label>
                <label for="classroomId" data-error={form?.errors?.classroomId}>
                    <span>Sala de aula</span>
                    <fieldset class="inline" id="classroomId" role="radiogroup">
                        {#each [...data.classrooms] as classroom}
                            {@const type = classroomTypes.get(classroom.type)}
                            <Option
                                name="classroomId"
                                group={form?.data?.classroomId ?? data.class.classroom?.id}
                                value={classroom.id}
                            >
                                <iconify-icon
                                    data-tooltip={type?.name}
                                    slot="icon"
                                    icon={type?.icon}
                                    width="48"
                                />
                                <span>{classroom.building}</span>
                                <small>{classroom.capacity}</small>
                            </Option>
                        {/each}
                    </fieldset>
                </label>
            </div>
        </div>
        <div class="box">
            <button type="submit">Salvar</button>
        </div>
    </div>
</form>

<style lang="scss">
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

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
