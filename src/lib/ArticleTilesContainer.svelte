<script>
    import ArticleTile from "$lib/ArticleTile.svelte"
    import articles from "$lib/example_articles.json"
</script>

<div>
    {#each articles as article}
        <ArticleTile {article}/> 
    {/each}
</div>