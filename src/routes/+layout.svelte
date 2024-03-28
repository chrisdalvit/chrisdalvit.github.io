

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
</style>