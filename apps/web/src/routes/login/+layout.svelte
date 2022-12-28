<main>
    <aside>
        <header>
            <h1>Escola Margrave</h1>
        </header>

        <slot />
    </aside>
    <img src="background/login-background.jpg" loading="lazy" alt="Annie Spratt" />
</main>

<style lang="scss" scoped>
    main {
        display: flex;
        height: 100%;

        aside {
            display: flex;
            flex-direction: column;

            margin: 3rem;
            width: 100%;

            header {
                height: 5vw;

                > h1 {
                    font-size: 2.5rem;
                    font-weight: 700;
                }
            }
        }

        img {
            max-height: 100vh;
            width: 70vw;
            object-fit: cover;
            margin-left: auto;
        }
    }
</style>
