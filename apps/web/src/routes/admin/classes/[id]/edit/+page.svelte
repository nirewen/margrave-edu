<script lang="ts">
    import { flip } from 'svelte/animate'
    import { quintOut } from 'svelte/easing'
    import { crossfade, slide } from 'svelte/transition'

    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import Option from '$lib/components/Option.svelte'
    import { classroomTypes, shifts } from '$lib/util'

    import type { ActionData, PageData } from './$types'

    import Avatar from '$lib/components/Avatar.svelte'
    import type { Subject } from '$lib/types/api/Subject'
    import InfoCard from '../../../components/InfoCard.svelte'

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),

        fallback(node, params) {
            const style = getComputedStyle(node)
            const transform = style.transform === 'none' ? '' : style.transform

            return {
                duration: 600,
                easing: quintOut,
                css: t => `
                transform: ${transform} scale(${t});
                opacity: ${t}
            `,
            }
        },
    })

    export let data: PageData
    export let form: ActionData

    const availableSubjects = data.subjects.map((s): Subject & { enabled: boolean } => {
        const cs = data.class.subjects.find(cs => cs.id === s.id)

        return {
            ...s,
            enabled: !!cs,
        }
    })

    let collapsed = false
</script>

<svelte:head>
    <title>Editar turma | Magrave</title>
</svelte:head>

<header>
    <a role="button" class="ghost icon" href="../../" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </a>
    <hgroup>
        <h1>Editar turma</h1>
        <h2>Preencha o formulário para editar a turma</h2>
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
                        <input
                            type="text"
                            name="number"
                            value={form?.data?.number ?? data.class.number}
                            required
                        />
                    </label>
                </div>
                <label data-error={form?.errors?.period} style:flex="0">
                    <span>Período</span>
                    <input
                        type="text"
                        name="period"
                        value={form?.data?.period ?? data.class.period}
                        required
                    />
                </label>
                <label for="shift" data-error={form?.errors?.shift}>
                    <span>Turno</span>
                    <fieldset class="inline-flex" id="shift" role="radiogroup">
                        {#each [...shifts.entries()] as [shift, { icon, name }]}
                            <Option name="shift" group={form?.data?.shift ?? data.class.shift} value={shift}>
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

        <div class="box" style:gap="0">
            <label>
                <span>Disciplinas</span>
                <input type="checkbox" bind:checked={collapsed} style="width: 0; height: 0;" />
            </label>
            {#if !collapsed}
                <div class="box row" transition:slide|local>
                    <div class="box" style:flex="1">
                        <h2 class="list-title"><span>Disponíveis</span></h2>
                        {#each availableSubjects.filter(cs => !cs.enabled) as subject, i (subject.id)}
                            <div
                                animate:flip={{ duration: 100 }}
                                in:receive|local={{ key: subject.id }}
                                out:send|local={{ key: subject.id }}
                            >
                                <InfoCard color={subject.color} on:click={() => (subject.enabled = true)}>
                                    <iconify-icon
                                        class="inverted"
                                        slot="icon"
                                        icon={subject.icon}
                                        width="48"
                                    />
                                    <svelte:fragment slot="title">{subject.name}</svelte:fragment>
                                    <svelte:fragment slot="subtitle">
                                        <Avatar avatar={subject.teacher.profile.avatar} size={1} />
                                        {subject.teacher.profile.name}
                                    </svelte:fragment>
                                </InfoCard>
                            </div>
                        {/each}
                    </div>
                    <div class="box" style:flex="1">
                        <h2 class="list-title"><span>Associadas</span></h2>
                        {#each availableSubjects.filter(cs => cs.enabled) as subject, i (subject.id)}
                            <div
                                animate:flip={{ duration: 100 }}
                                in:receive|local={{ key: subject.id }}
                                out:send|local={{ key: subject.id }}
                            >
                                <input type="hidden" name="subjects.{i}" value={subject.id} />
                                <InfoCard color={subject.color} on:click={() => (subject.enabled = false)}>
                                    <iconify-icon
                                        class="inverted"
                                        slot="icon"
                                        icon={subject.icon}
                                        width="48"
                                    />
                                    <svelte:fragment slot="title">{subject.name}</svelte:fragment>
                                    <svelte:fragment slot="subtitle">
                                        <Avatar avatar={subject.teacher.profile.avatar} size={1} />
                                        {subject.teacher.profile.name}
                                    </svelte:fragment>
                                </InfoCard>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
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

            h2.list-title {
                width: 100%;
                text-align: center;
                border-bottom: 1px solid #000;
                line-height: 0.1em;
                margin: 10px 0 20px;
                opacity: 40%;
                text-transform: uppercase;
                font-weight: 600;
                margin-bottom: -0.2rem;
            }

            h2.list-title span {
                background: #fff;
                padding: 0 10px;
            }
        }
    }
</style>
