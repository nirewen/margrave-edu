<script lang="ts">
    import { merge } from 'merge-anything'
    import { enhance } from '$app/forms'

    import Button from '$lib/components/Button.svelte'
    import TextInput from '$lib/components/TextInput.svelte'

    import type { ActionData, PageData } from './$types'
    import Profile from '../../../components/Profile.svelte'
    import RadioGroup from '$lib/components/RadioGroup.svelte'
    import { getGender } from '$lib/util'
    import { writable } from 'svelte/store'

    export let data: PageData
    export let form: ActionData

    const student = writable(merge(form?.data.user ?? {}, data.student))
</script>

<header>
    <Button variant="ghost" icon href="../" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </Button>
    <div>
        <h1>Editar usuário</h1>
        <h2>Preencha o formulário para editar o perfil do usuário</h2>
    </div>
</header>
{#if $student}
    <div class="page">
        <form method="POST" use:enhance>
            <div class="box">
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
                <TextInput
                    type="date"
                    name="birthdate"
                    label="Data de Nascimento"
                    bind:value={$student.profile.birthdate}
                />
            </div>
            <div class="box">
                <Button type="submit">Salvar usuário</Button>
                <!-- <Button variant="danger ghost">Excluir usuário</Button> -->
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

        h1 {
            font-size: 1.8rem;
            font-weight: 700;
        }

        h2 {
            color: var(--gray-400);
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

                h2 {
                    font-size: 1.2rem;
                    font-weight: 500;
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
