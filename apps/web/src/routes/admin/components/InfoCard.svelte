<script lang="ts">
    export let selected = false
    export let scale = false
    export let color: string = '#000000'
</script>

<button type="button" class:scale class="profile-card" class:selected on:click style:color>
    <slot name="icon" />
    <div class="info">
        <p><slot name="title" /></p>
        <span><slot name="subtitle" /></span>
    </div>
    <slot name="action" />
</button>

<style lang="scss">
    .profile-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        height: fit-content;
        width: 100%;
        border-radius: 8px;
        box-shadow: var(--elevation-3);
        background-color: var(--gray-900);
        text-align: left;
        transition: scale 50ms linear;
        color: var(--gray-000);
        text-transform: none;
        font-weight: 400;

        &.scale:hover {
            scale: 1.025;
        }

        &:focus {
            outline-style: solid;
            outline-offset: 0.1rem;
            outline-width: 0.1rem;
            outline-color: var(--primary-text);
        }

        &.selected {
            outline-style: solid;
            outline-offset: 0.2rem;
            outline-width: 0.2rem;
            outline-color: var(--primary);
            transition: all 50ms linear;
        }

        .info {
            flex: 1;

            p {
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 15ch;
                overflow: hidden;
                min-height: 1.5rem;
                color: #000000;

                &:empty {
                    background-color: var(--gray-800);
                    border-radius: 0.3rem;
                }
            }

            span {
                display: flex;
                align-items: center;
                gap: 0.2rem;
                color: var(--gray-300);
                font-size: 0.8rem;
            }
        }
    }
</style>
