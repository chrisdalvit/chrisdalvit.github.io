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
        margin-bottom: 10px;
    }

    :global(p) {
        font-family: "Heebo", sans-serif;
        font-optical-sizing: auto;
        font-weight: 300;
        font-style: normal;
        text-align: justify;
        line-height: 1.7rem;
        margin-top: 0px;
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
