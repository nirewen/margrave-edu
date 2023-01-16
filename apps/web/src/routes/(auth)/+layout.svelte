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

<style lang="scss">
    aside {
        display: flex;
        flex-direction: column;
        grid-area: sidebar;
        width: 40rem;
        padding: 3rem;
        z-index: 10;
        background-color: #ffffff;

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
        grid-area: navbar;
        grid-row: span 2;

        > figcaption {
            position: absolute;
            bottom: 0.4rem;
            right: 0.4rem;
            color: #ffffff;
        }
        img {
            height: 100vh;
            width: 100vw;
            object-fit: cover;
        }
    }
</style>
