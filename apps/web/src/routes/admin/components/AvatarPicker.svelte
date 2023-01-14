<script lang="ts">
    import type { PartialUser } from '$lib/types/User'
    import { encodeBase64 } from '$lib/util'
    import { nanoid } from 'nanoid'
    import Avatar from './Avatar.svelte'

    export let id = nanoid()
    export let name: string
    export let user: PartialUser
    let input: HTMLInputElement

    async function updateAvatar(event: Event) {
        if (event.target instanceof HTMLInputElement) {
            const file = event.target.files?.item(0)

            if (file) {
                user.profile.avatar = await encodeBase64(file)
            }
        }
    }
</script>

<div class="avatar-picker">
    <label for={id}>Avatar</label>
    <button class="picker" type="button" on:click={() => input.click()}>
        <input bind:this={input} type="file" {name} {id} on:change={updateAvatar} accept="image/*" />
        <Avatar bind:avatar={user.profile.avatar} size={8} />
    </button>
    {#if user.profile.avatar}
        <button class="remove" type="button" on:click={() => (user.profile.avatar = undefined)}>
            <iconify-icon icon="ic:baseline-close" width="2rem" />
        </button>
    {/if}
</div>

<style lang="scss">
    .avatar-picker {
        display: flex;
        flex-direction: column;
        position: relative;

        > .picker {
            position: relative;
            border-radius: 9999px;
            height: min-content;

            input {
                display: none;
            }

            &:hover::after {
                display: grid;
                place-content: center;
                position: absolute;
                inset: 0;
                border-radius: inherit;

                content: 'Alterar \A avatar';
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--gray-900);
                text-align: center;
                text-transform: uppercase;
                background-color: rgba(0, 0, 0, 0.2);
                white-space: pre;
            }
        }
        > .remove {
            position: absolute;
            top: 20%;
            right: 4%;
            border-radius: 9999px;
            color: var(--gray-900);
            background-color: var(--red);
            width: 2rem;
            height: 2rem;
            z-index: 9;
        }
    }
</style>
