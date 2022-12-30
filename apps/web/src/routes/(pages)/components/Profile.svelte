<script lang="ts">
    import type { User } from '$lib/types/User'
    import { differenceInYears, format } from 'date-fns'

    export let title: string
    export let user: User
</script>

<div class="profile-card">
    <h2>{title}</h2>
    <div class="info">
        <img
            class="avatar"
            src="/api/avatar/{user.profile.avatar}"
            alt="avatar de {user.profile.name || user.email}"
        />
        <p>{user.profile.name}</p>
    </div>
    <div class="details">
        <div class="field">
            <h3>Sobre</h3>
            <span>{user.profile.bio}</span>
        </div>
        <div class="field group">
            <div class="field">
                <h3>Nível</h3>
                <span>{user.profile.level}</span>
            </div>
            <div class="field">
                <h3>Gênero</h3>
                <span><!-- TODO: adicionar gênero --></span>
            </div>
        </div>
        <div class="field group">
            <div class="field">
                <h3>Idade</h3>
                <span>{differenceInYears(new Date(), new Date(user.profile.birthdate))}</span>
            </div>
            <div class="field">
                <h3>Nascimento</h3>
                <span>{format(new Date(user.profile.birthdate), 'dd/MM/yyyy')}</span>
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

            img.avatar {
                width: 10rem;
                height: 10rem;
                border-radius: 9999px;
                border: 3px solid var(--gray-900);
                box-shadow: var(--elevation-6);
            }

            p {
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 15ch;
                overflow: hidden;
                font-size: 1.3rem;
            }

            span {
                color: var(--gray-300);
                font-size: 0.8rem;
            }
        }

        .details {
            .field {
                margin-bottom: 0.5rem;
                h3 {
                    font-size: 1.1rem;
                }

                span {
                    font-size: 0.9rem;
                    color: var(--gray-300);
                    line-height: normal;
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
