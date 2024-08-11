

<div class="container">
    <div class="content">
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </nav>
        <slot></slot>
    </div>
</div>


<style>
    div.container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    div.content {
        max-width: 700px;
        padding: 16px;
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
    }
</style>