

<div class="container">
    <div class="nav-menu">
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </nav>
    </div>
    <slot></slot>
</div>


<style>
    div.container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
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

    div.nav-menu {
        width: 700px;
    }

    nav {
        display: flex;
        justify-content: end;
    }
</style>