<script lang="ts">
    import Button from '$lib/components/Button.svelte'
    import type { PartialUser } from '$lib/types/User'
    import { getGender } from '$lib/util'
    import { differenceInYears, format } from 'date-fns'
    import Avatar from './Avatar.svelte'

    export let title: string
    export let user: PartialUser
    export let editable = false
</script>

<div class="profile-card">
    <header>
        <h2>{title}</h2>
        {#if editable}
            <Button variant="ghost" icon href="/admin/users/{user.id}/edit" title="Editar">
                <iconify-icon icon="mdi:account-edit" width={24} />
            </Button>
        {/if}
    </header>
    <div class="info">
        <Avatar
            avatar={user.profile.avatar}
            alt="avatar de {user.profile.name}"
            role={user.role}
            size={10}
            shadow
        />
        <p>{user.profile.name}</p>
    </div>
    <div class="details">
        <div class="field">
            <h3>Sobre</h3>
            <p>{user.profile.bio || ''}</p>
        </div>
        <div class="field group">
            <div class="field">
                <h3>Nível</h3>
                <p>{user.profile.level || 0}</p>
            </div>
            <div class="field">
                <h3>Gênero</h3>
                <p>{user.profile.gender ? getGender(user.profile.gender) : ''}</p>
            </div>
        </div>
        <div class="field group">
            <div class="field">
                <h3>Idade</h3>
                <p>
                    {user.profile.birthdate
                        ? differenceInYears(new Date(), new Date(user.profile.birthdate))
                        : ''}
                </p>
            </div>
            <div class="field">
                <h3>Nascimento</h3>
                <p>{user.profile.birthdate ? format(new Date(user.profile.birthdate), 'dd/MM/yyyy') : ''}</p>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .profile-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: var(--elevation-3);
        background-color: var(--gray-900);
        height: fit-content;

        header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            h2 {
                font-size: 1.2rem;
                font-weight: 500;
            }
        }

        .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            text-align: center;

            p {
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 15ch;
                overflow: hidden;
                font-size: 1.3rem;
                min-height: 1.95rem;

                &:empty {
                    background-color: var(--gray-800);
                    border-radius: 0.3rem;
                }
            }
        }

        .details {
            .field {
                &:not(:last-child) {
                    margin-bottom: 0.5rem;
                }

                h3 {
                    font-size: 1.1rem;
                }

                p {
                    font-size: 0.9rem;
                    color: var(--gray-300);
                    line-height: normal;
                    min-height: 1.1rem;
                    overflow-wrap: break-word;
                }

                &.group {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.5rem;
                }
            }
        }
    }
</style>
