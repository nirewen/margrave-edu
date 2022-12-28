<script lang="ts">
    export let type: 'button' | 'submit' | 'reset' | undefined | null = 'button'
</script>

<button {type}><slot /></button>

<style lang="scss" scoped>
    button {
        padding: 0.6rem 0.6rem;
        background-color: #000000;
        color: #ffffff;
        border-radius: 0.4rem;
        text-transform: uppercase;
        font-weight: 600;
    }
</style>
