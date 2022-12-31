<script lang="ts">
    import type { User } from '$lib/types/User'
    import { differenceInYears, format } from 'date-fns'
    import Avatar from './Avatar.svelte'

    export let title: string
    export let user: User
</script>

<div class="profile-card">
    <h2>{title}</h2>
    <div class="info">
        <Avatar key={user.profile.avatar} alt="avatar de {user.profile.name}" size={10} shadow />
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
                <p>{user.profile.gender || ''}</p>
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
        padding: 1rem 1.2rem;
        border-radius: 8px;
        box-shadow: var(--elevation-3);
        background-color: var(--gray-900);

        h2 {
            font-size: 1.2rem;
            font-weight: 500;
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
            }
        }

        .details {
            .field {
                margin-bottom: 0.5rem;
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
