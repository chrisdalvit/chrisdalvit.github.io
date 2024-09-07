<script>
    export let title;
    export let id;
</script>

<div>
    <h3 id={id} class="section-title">{title}</h3> 
    <slot/>
</div>

<style>
    
    h3 {
        margin-bottom: 0px;
    }

    :global(p) {
        font-family: "Heebo", sans-serif;
        font-optical-sizing: auto;
        font-weight: 300;
        font-style: normal;
        text-align: justify;
        line-height: 1.7rem;
    }

    :global(figure) {
        display: flex;
        justify-content: center;
        flex-flow: column;
    }

    :global(figcaption) {
        font-family: "Heebo", sans-serif;
        font-optical-sizing: auto;
        font-weight: 300;
        font-style: normal;
        text-align: center;
        font-size: small;
        margin-top: 5px;
    }

    :global(a) {
        text-decoration-color: rgb(174, 188, 173);
        text-decoration-thickness: 2px;
        text-underline-offset: 2px;
        color: black;
    }

    :global(a:hover) {
        text-decoration-color: #63a563;
    }

    .section-title {
        font-family: "Sometype Mono", monospace;
        font-optical-sizing: auto;
        font-style: normal;
        text-decoration: none;
        color: black;
        font-weight: bold;
        font-size: 1.5em;
        margin-top: 40px;
    }

</style>
