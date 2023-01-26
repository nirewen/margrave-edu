<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import Option from '$lib/components/Option.svelte'
    import { classroomTypes, shifts } from '$lib/util'

    import type { ActionData, PageData } from './$types'

    export let data: PageData
    export let form: ActionData
</script>

<svelte:head>
    <title>Editar turma | Magrave</title>
</svelte:head>

<header>
    <hgroup>
        <h1>Adicionar turma</h1>
        <h2>Preencha o formulário para adicionar uma turma</h2>
    </hgroup>
</header>
{#if form?.error && form?.message}
    <Alert variant="danger">{form?.message}</Alert>
{/if}
<form method="POST" use:enhance>
    <div class="form">
        <div class="box">
            <div class="box row">
                <div class="box" style:flex="1">
                    <label data-error={form?.errors?.number}>
                        <span>Número</span>
                        <input type="text" name="number" value={form?.data?.number ?? ''} required />
                    </label>
                </div>
                <label data-error={form?.errors?.period} style:flex="0">
                    <span>Período</span>
                    <input type="text" name="period" value={form?.data?.period ?? ''} required />
                </label>
                <label for="shift" data-error={form?.errors?.shift}>
                    <span>Turno</span>
                    <fieldset class="inline-flex" id="shift" role="radiogroup">
                        {#each [...shifts.entries()] as [shift, { icon, name }]}
                            <Option name="shift" group={form?.data?.shift ?? ''} value={shift}>
                                <iconify-icon slot="icon" {icon} width="24" />
                                {name}
                            </Option>
                        {/each}
                    </fieldset>
                </label>
            </div>
            <div class="box">
                <label for="classroomId" data-error={form?.errors?.classroomId}>
                    <span>Sala de aula</span>
                    <fieldset class="inline" id="classroomId" role="radiogroup">
                        {#each [...data.classrooms] as classroom}
                            {@const type = classroomTypes.get(classroom.type)}
                            <Option
                                name="classroomId"
                                group={form?.data?.classroomId ?? ''}
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
            <button type="submit">Criar turma</button>
        </div>
    </div>
</form>

<style lang="scss">
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

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
