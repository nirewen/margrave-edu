<main>
    <aside>
        <header>
            <h1>Escola Margrave</h1>
        </header>

        <slot />
    </aside>
    <figure>
        <img src="background/login-background.jpg" loading="lazy" alt="Annie Spratt" />
        <figcaption>&copy; Annie Spratt</figcaption>
    </figure>
</main>

<style lang="scss" scoped>
    main {
        display: flex;
        height: 100%;

        aside {
            display: flex;
            flex-direction: column;

            margin: 3rem;
            width: 30vw;

            header {
                height: 5vw;

                > h1 {
                    font-size: 2.5rem;
                    font-weight: 700;
                }
            }
        }

        figure {
            position: relative;

            > figcaption {
                position: absolute;
                bottom: 0.4rem;
                right: 0.4rem;
                color: #ffffff;
            }
            img {
                height: 100vh;
                width: 70vw;
                object-fit: cover;
                margin-left: auto;
            }
        }
    }
</style>
