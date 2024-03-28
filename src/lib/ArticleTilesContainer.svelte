<script>
    import ArticleTile from "$lib/ArticleTile.svelte"
    import articles from "$lib/example_articles.json"
</script>

<div class="tiles-container">
    {#each articles as article}
        <ArticleTile {article}/> 
    {/each}
</div>

<style>
    div.tiles-container {
        width: 100%;
    }
</style>