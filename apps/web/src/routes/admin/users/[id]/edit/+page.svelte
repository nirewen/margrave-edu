<script lang="ts">
    import { goto } from '$app/navigation'
    import { merge } from 'merge-anything'
    import { writable } from 'svelte/store'
    import { enhance } from '$app/forms'

    import Button from '$lib/components/Button.svelte'
    import TextInput from '$lib/components/TextInput.svelte'

    import type { ActionData, PageData } from './$types'
    import AvatarPicker from '../../../components/AvatarPicker.svelte'
    import Profile from '../../../components/Profile.svelte'
    import RadioGroup from '$lib/components/RadioGroup.svelte'
    import { capitalize, getGender, getRole, roles, type Role } from '$lib/util'

    export let data: PageData
    export let form: ActionData

    const student = writable(merge(form?.data.user ?? {}, data.student))
    function getRoleName(role: string) {
        return capitalize(getRole(role as Role).name)
    }

    async function deleteUser() {
        const confirmed = confirm('Tem certeza que deseja excluir esse usuário?')

        if (!confirmed) return

        await fetch('/api/users/' + data.student.id, {
            method: 'DELETE',
        })

        goto('..')
    }
</script>

<svelte:head>
    <title>Editar usuário | Margrave</title>
</svelte:head>

<header>
    <Button variant="ghost" icon href="../" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </Button>
    <hgroup>
        <h1>Editar usuário</h1>
        <h2>Preencha o formulário para editar o perfil do usuário</h2>
    </hgroup>
</header>
{#if $student}
    <div class="page">
        <form action="?/save" method="POST" use:enhance enctype="multipart/form-data">
            <div class="box row">
                <div class="box" style:flex="1">
                    <TextInput
                        type="text"
                        name="user.email"
                        label="Email"
                        bind:value={$student.email}
                        errored={!!form?.errors.fieldErrors.user}
                        error={form?.errors.fieldErrors.user?.at(0)}
                    />
                    <TextInput
                        type="password"
                        name="user.password"
                        label="Senha"
                        placeholder="inalterada"
                        bind:value={$student.password}
                    />
                </div>
                <AvatarPicker bind:user={$student} name="avatar" />
            </div>
            <div class="box">
                <TextInput
                    type="text"
                    name="name"
                    label="Nome"
                    bind:value={$student.profile.name}
                    errored={!!form?.errors.fieldErrors.name}
                    error={form?.errors.fieldErrors.name?.at(0)}
                />
                <TextInput type="textarea" name="bio" label="Sobre" bind:value={$student.profile.bio} />
                <div class="group">
                    <TextInput type="number" name="level" label="Nível" bind:value={$student.profile.level} />
                    <RadioGroup
                        name="gender"
                        label="Gênero"
                        bind:group={$student.profile.gender}
                        options={[
                            {
                                icon: 'ic:baseline-male',
                                value: 'MALE',
                                color: '#226699',
                                bgColor: 'white',
                            },
                            {
                                icon: 'ic:baseline-female',
                                value: 'FEMALE',
                                color: '#ea596e',
                                bgColor: 'white',
                            },
                            { icon: 'ic:baseline-transgender', value: 'OTHER' },
                        ]}
                        parseOption={getGender}
                    />
                </div>
                <div class="group">
                    <TextInput
                        type="date"
                        name="birthdate"
                        label="Data de Nascimento"
                        bind:value={$student.profile.birthdate}
                        errored={!!form?.errors.fieldErrors.birthdate}
                        error={form?.errors.fieldErrors.birthdate?.at(0)}
                    />

                    <RadioGroup
                        name="user.role"
                        label="Cargo"
                        bind:group={$student.role}
                        options={Object.entries(roles).map(([id, role]) => ({
                            value: id,
                            icon: role.icon,
                        }))}
                        parseOption={getRoleName}
                    />
                </div>
            </div>
            <div class="box row">
                <div class="box" style:flex="1">
                    <Button type="submit">Salvar usuário</Button>
                </div>
                <div class="box">
                    <Button type="button" variant="danger ghost" on:click={deleteUser}>
                        Excluir usuário
                    </Button>
                </div>
            </div>
        </form>
        <Profile title="Perfil" user={$student} />
    </div>
{/if}

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
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 20rem;

        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;

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
                }

                > .box {
                    box-shadow: none;
                    padding: 0;
                }
            }
            .group {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 1rem;
            }
        }
    }
</style>
