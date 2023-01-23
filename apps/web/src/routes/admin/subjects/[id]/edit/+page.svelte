<script lang="ts">
    import { enhance } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import Avatar from '$lib/components/Avatar.svelte'
    import Option from '$lib/components/Option.svelte'
    import type { Class } from '$lib/types/api/Class'
    import type { ClassSubject } from '$lib/types/api/ClassSubject'
    import { quintOut } from 'svelte/easing'
    import { flip } from 'svelte/animate'
    import { crossfade, slide } from 'svelte/transition'
    import InfoCard from '../../../components/InfoCard.svelte'
    import type { ActionData, PageData } from './$types'

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

    $: classSubjects = [...data.subject.classSubjects]
    $: availableClasses = data.classes.filter(c => classSubjects.findIndex(cs => cs.class.id === c.id) === -1)
    $: addedClasses = data.classes.filter(c => classSubjects.findIndex(cs => cs.class.id === c.id) > -1)

    function addClass(turma: Class) {
        const classSubject = {
            class: turma,
            weekdays: [],
        } satisfies ClassSubject

        classSubjects = [...classSubjects, classSubject]
    }
    function removeClass(turma: Class) {
        classSubjects = classSubjects.filter(cs => {
            return cs.class.id !== turma.id
        })
    }
</script>

<svelte:head>
    <title>Editar disciplina | Magrave</title>
</svelte:head>

<header>
    <div>
        <h1>Editar disciplina</h1>
        <h2>Preencha o formulário para editar a disciplina</h2>
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
                        <input
                            type="text"
                            name="name"
                            value={form?.data?.name ?? data.subject.name}
                            required
                        />
                    </label>
                </div>
                <label data-error={form?.errors?.icon}>
                    <span>Ícone</span>
                    <input type="text" name="icon" value={form?.data?.icon ?? data.subject.icon} required />
                </label>
                <label data-error={form?.errors?.color}>
                    <span>Cor</span>
                    <input
                        type="color"
                        name="color"
                        value={form?.data?.color ?? data.subject.color}
                        required
                    />
                </label>
            </div>
            <div class="box row">
                <label data-error={form?.errors?.type}>
                    <span>Tipo da disciplina</span>
                    <input
                        type="text"
                        name="type"
                        value={form?.data?.type ?? data.subject.type}
                        placeholder="Exatas"
                    />
                </label>
                <label data-error={form?.errors?.hours}>
                    <span>Hora de demanda</span>
                    <input type="number" name="hours" value={form?.data?.hours ?? data.subject.hours} />
                </label>
            </div>
        </div>
        <div class="box row">
            <div class="box" style:flex="1">
                <span>Disponíveis</span>
                {#each availableClasses as turma (turma.id)}
                    <div animate:flip in:receive={{ key: turma.id }} out:send={{ key: turma.id }}>
                        <InfoCard on:click={() => addClass(turma)}>
                            <svelte:fragment slot="title">{turma.number}</svelte:fragment>
                            <svelte:fragment slot="subtitle">{turma.period}</svelte:fragment>
                        </InfoCard>
                    </div>
                {/each}
            </div>
            <div class="box" style:flex="1">
                <span>Associados</span>
                {#each addedClasses as turma (turma.id)}
                    <div animate:flip in:receive={{ key: turma.id }} out:send={{ key: turma.id }}>
                        <InfoCard on:click={() => removeClass(turma)}>
                            <svelte:fragment slot="title">{turma.number}</svelte:fragment>
                            <svelte:fragment slot="subtitle">{turma.period}</svelte:fragment>
                        </InfoCard>
                        <div class="weekdays" transition:slide>
                            {#each 'DSTQQSS'.split('') as weekday}
                                <button>{weekday}</button>
                            {/each}
                        </div>
                    </div>
                {/each}
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
                    <Option
                        name="teacherId"
                        group={form?.data?.teacherId ?? data.subject.teacher.id}
                        value={teacher.id}
                    >
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

                > button {
                    color: #000000;
                }
            }
        }
    }
</style>
