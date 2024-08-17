<script>
    import ArticleTile from "$lib/ArticleTile.svelte" 
    import GirdLayout from "$lib/GirdLayout.svelte";
</script>


<GirdLayout>
    <div class="overview" slot="center">
        <h1 class="title">Hi!</h1>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
            including versions of Lorem Ipsum.
        </p>
        <div>
            <ArticleTile article={{
                title: "Sodoku Solver",
                description: "Description of my Sudoku solver project",
                image: "images/sudoku_image.png",
                url: "/sudoku-solver"
            }} /> 
        </div>
    </div>      
</GirdLayout>

<style>
    .title {
        font-family: "Sometype Mono", monospace;
        font-optical-sizing: auto;
        font-style: normal;
    }
    
    p {
        font-family: "Heebo", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        text-align: justify;
        line-height: 1.5;
        margin-bottom: 54px;
    }

    .overview {
        padding: 16px;
    }
</style>