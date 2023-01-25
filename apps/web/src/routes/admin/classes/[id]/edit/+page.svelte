<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import Option from '$lib/components/Option.svelte'
    import { classroomTypes, shifts } from '$lib/util'
    import type { Class } from '$lib/types/api/Class'
    import type { ClassSubject } from '$lib/types/api/ClassSubject'
    import { flip } from 'svelte/animate'
    import { quintOut } from 'svelte/easing'
    import { crossfade, slide } from 'svelte/transition'
    import InfoCard from '../../../components/InfoCard.svelte'

    import type { ActionData, PageData } from './$types'
    import Avatar from '$lib/components/Avatar.svelte'

    export let data: PageData
    export let form: ActionData

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

    const weekdays = {
        Domingo: 'D',
        Segunda: 'S',
        Terça: 'T',
        Quarta: 'Q',
        Quinta: 'Q',
        Sexta: 'S',
        Sábado: 'S',
    }

    const availableSubjects = data.subjects.map((s): ClassSubject & { enabled: boolean } => {
        const cs = data.class.classSubjects.find(cs => cs.subject.id === s.id)

        return {
            subject: s,
            class: data.class,
            weekdays: cs?.weekdays ?? [],
            enabled: !!cs,
        }
    })
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
                        {#each [...shifts.entries()] as [shift, { icon, name }]}
                            <Option name="shift" group={form?.data?.shift ?? data.class.shift} value={shift}>
                                <iconify-icon slot="icon" {icon} width="28" />
                                {name}
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
            <span>Disciplinas</span>
            <div class="box row">
                <div class="box" style:flex="1">
                    <h2 class="list-title"><span>Disponíveis</span></h2>
                    {#each availableSubjects.filter(cs => !cs.enabled) as classSubject (classSubject.subject.id)}
                        <div
                            animate:flip={{ duration: 100 }}
                            in:receive|local={{ key: classSubject.subject.id }}
                            out:send|local={{ key: classSubject.subject.id }}
                        >
                            <InfoCard
                                color={classSubject.subject.color}
                                on:click={() => (classSubject.enabled = true)}
                            >
                                <iconify-icon slot="icon" icon={classSubject.subject.icon} width="48" />
                                <svelte:fragment slot="title">{classSubject.subject.name}</svelte:fragment>
                                <svelte:fragment slot="subtitle">
                                    <Avatar avatar={classSubject.subject.teacher.profile.avatar} size={1} />
                                    {classSubject.subject.teacher.profile.name}
                                </svelte:fragment>
                            </InfoCard>
                        </div>
                    {/each}
                </div>
                <div class="box" style:flex="1">
                    <h2 class="list-title"><span>Associadas</span></h2>
                    {#each availableSubjects.filter(cs => cs.enabled) as classSubject, i (classSubject.subject.id)}
                        <div
                            animate:flip={{ duration: 100 }}
                            in:receive|local={{ key: classSubject.subject.id }}
                            out:send|local={{ key: classSubject.subject.id }}
                        >
                            <input
                                type="hidden"
                                name="classSubjects.{i}.subjectId"
                                value={classSubject.subject.id}
                            />
                            <input
                                type="hidden"
                                name="classSubjects.{i}.classId"
                                value={classSubject.class.id}
                            />
                            <InfoCard
                                color={classSubject.subject.color}
                                on:click={() => (classSubject.enabled = false)}
                            >
                                <iconify-icon slot="icon" icon={classSubject.subject.icon} width="48" />
                                <svelte:fragment slot="title">{classSubject.subject.name}</svelte:fragment>
                                <svelte:fragment slot="subtitle">
                                    <Avatar avatar={classSubject.subject.teacher.profile.avatar} size={1} />
                                    {classSubject.subject.teacher.profile.name}
                                </svelte:fragment>
                            </InfoCard>
                            <div class="weekdays" transition:slide|local>
                                {#each Object.entries(weekdays) as [name, weekday], w}
                                    <label class="weekday" data-tooltip={name}>
                                        <span>{weekday}</span>
                                        <input
                                            type="checkbox"
                                            name="classSubjects.{i}.weekdays.{w}"
                                            bind:checked={classSubject.weekdays[w]}
                                        />
                                    </label>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
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

            .weekdays {
                display: flex;
                align-items: center;
                background-color: #eaeaea;
                margin-top: -0.4rem;
                box-shadow: var(--elevation-3);
                border-bottom-right-radius: 0.5rem;
                border-bottom-left-radius: 0.5rem;

                > label {
                    display: grid;
                    place-content: center;
                    padding: 0.2rem;
                    color: var(--gray-400);

                    &:first-child {
                        border-bottom-left-radius: 0.5rem;
                    }

                    &:last-child {
                        border-bottom-right-radius: 0.5rem;
                    }

                    > input {
                        width: 0;
                        height: 0;
                    }

                    &:has(:checked) {
                        background-color: var(--primary);
                        color: #ffffff;
                    }
                }
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
                margin-top: -0.2rem;
                margin-bottom: -0.2rem;
            }

            h2.list-title span {
                background: #fff;
                padding: 0 10px;
            }
        }
    }
</style>
