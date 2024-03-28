<script>
    import ArticleTilesContainer from "$lib/ArticleTilesContainer.svelte";    
    let name = 'Chris';
</script>


<h1>Welcome {name}!</h1>
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
<ArticleTilesContainer />


<style>
    :global(body) {
        font-family: "Sometype Mono", monospace;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
    }
    
    p {
        text-align: justify;
        line-height: 1.5;
        margin-bottom: 54px;
    }
</style>