
<div class="container">
    <nav>
        <a href="/" data-sveltekit-reload>Home</a>
        <a href="/about" data-sveltekit-reload>About</a>
    </nav>
    <slot></slot>
</div>


<style>
    div.container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    a {
        font-family: "Sometype Mono", monospace;
        font-optical-sizing: auto;
        font-style: normal;
        margin: 12px;
        text-decoration: none;
        color: black;
    }

    a:hover {
        color: rgba(0, 0, 255, .5);
    }

    nav {
        display: flex;
        justify-content: end;
        justify-self: center;
    }
</style>