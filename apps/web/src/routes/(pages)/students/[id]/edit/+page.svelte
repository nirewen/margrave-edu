<script lang="ts">
    import { enhance } from '$app/forms'

    import Button from '$lib/components/Button.svelte'
    import TextInput from '$lib/components/TextInput.svelte'

    import type { PageData } from './$types'
    import Profile from '../../../components/Profile.svelte'
    import Select from '$lib/components/Select.svelte'
    import { getGender } from '$lib/util'

    export let data: PageData
</script>

<header>
    <div>
        <h1>Editar estudante</h1>
        <h2>Preencha o formulário para editar o perfil do estudante</h2>
    </div>
</header>
<div class="page">
    <form method="POST" use:enhance>
        <h2>Dados do usuário</h2>
        <TextInput type="text" name="name" label="Nome" bind:value={data.student.profile.name} />
        <TextInput type="textarea" name="bio" label="Sobre" bind:value={data.student.profile.bio} />
        <div class="group">
            <TextInput type="number" name="level" label="Nível" bind:value={data.student.profile.level} />
            <Select
                name="gender"
                label="Gênero"
                options={['MALE', 'FEMALE', 'OTHER']}
                parseOption={getGender}
                bind:value={data.student.profile.gender}
            />
        </div>
        <TextInput
            type="date"
            name="bithdate"
            label="Data de Nascimento"
            bind:value={data.student.profile.birthdate}
        />
        <Button type="submit">Salvar usuário</Button>
    </form>
    <Profile title="Perfil" user={data.student} />
</div>

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

    .page {
        display: grid;
        gap: 1rem;
        grid-template-columns: auto 20rem;

        form {
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

            > .group {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
        }
    }
</style>
