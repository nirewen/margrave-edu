<script lang="ts">
    import { goto } from '$app/navigation'
    import { merge } from 'merge-anything'
    import { writable } from 'svelte/store'
    import { enhance } from '$app/forms'

    import type { ActionData, PageData } from './$types'
    import AvatarPicker from '../../../components/AvatarPicker.svelte'
    import Profile from '../../../components/Profile.svelte'
    import Option from '$lib/components/Option.svelte'
    import { genders, roles } from '$lib/util'

    export let data: PageData
    export let form: ActionData

    const student = writable(merge(form?.data.user ?? {}, data.student))

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
    <a role="button" class="ghost icon" href="../" title="Voltar">
        <iconify-icon icon="mdi:chevron-left" width={32} />
    </a>
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
                    <label data-error={form?.errors.fieldErrors.user?.at(0)}>
                        <span>Email</span>
                        <input type="text" name="user.email" bind:value={$student.email} />
                    </label>
                    <label>
                        <span>Senha</span>
                        <input
                            type="password"
                            name="user.password"
                            placeholder="inalterada"
                            bind:value={$student.password}
                        />
                    </label>
                </div>
                <AvatarPicker bind:user={$student} name="avatar" />
            </div>
            <div class="box">
                <label data-error={form?.errors.fieldErrors.name?.at(0)}>
                    <span>Nome</span>
                    <input type="text" name="name" bind:value={$student.profile.name} />
                </label>
                <label>
                    <span>Sobre</span>
                    <textarea name="bio" bind:value={$student.profile.bio} />
                </label>
                <div class="group">
                    <label>
                        <span>Nível</span>
                        <input type="number" name="level" bind:value={$student.profile.level} />
                    </label>
                    <label for="gender">
                        <span>Gênero</span>
                        <fieldset class="inline" id="gender" role="radiogroup">
                            {#each [...genders] as [value, { icon, name, bgColor, color }]}
                                <Option
                                    name="gender"
                                    bind:group={$student.profile.gender}
                                    {value}
                                    {bgColor}
                                    {color}
                                >
                                    <iconify-icon {icon} width="1.6rem" slot="icon" />
                                    {name}
                                </Option>
                            {/each}
                        </fieldset>
                    </label>
                </div>
                <div class="group">
                    <label data-error={form?.errors.fieldErrors.birthdate?.at(0)}>
                        <span>Data de Nascimento</span>
                        <input type="date" name="birthdate" bind:value={$student.profile.birthdate} />
                    </label>
                    <label for="user.role">
                        <span>Cargo</span>
                        <fieldset class="inline" id="user.role" role="radiogroup">
                            {#each [...roles] as [value, { icon, name }]}
                                <Option name="user.role" bind:group={$student.role} {value}>
                                    <iconify-icon {icon} width="1.6rem" slot="icon" />
                                    {name.formal.single}
                                </Option>
                            {/each}
                        </fieldset>
                    </label>
                </div>
            </div>
            <div class="box row">
                <div class="box" style:flex="1">
                    <button type="submit">Salvar usuário</button>
                </div>
                <div class="box">
                    <button type="button" class="danger ghost" on:click={deleteUser}>
                        Excluir usuário
                    </button>
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
