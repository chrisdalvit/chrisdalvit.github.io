<script>
    import ArticleTilesContainer from "$lib/ArticleTilesContainer.svelte";    
    let name = 'Chris';
</script>

<div class="container">
    <div class="header">
        <h1>Welcome {name}!</h1>
    </div>
    <div class="description">
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
    <div class="content">
        <ArticleTilesContainer />
    </div>
</div>

<style>
    div.container {
        width: 100%;
    }

    div.header {
        grid-column: 1;
        grid-row: 1;
    }

    div.description {
        padding: 8px;
    }

    div.content {
        overflow: hidden;
        padding: 8px;
    }

    p {
        text-align: justify;
    }
</style>