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
        <ArticleTile article={{
            title: "Sodoku Solver",
            description: "Detailed step-by-step tutorial on how to build a real-time Sudoku solver",
            image: "images/sudoku_image.png",
            url: "/sudoku-solver"
        }} /> 
        <ArticleTile article={{
            title: "GPU Matrix Transposition",
            description: "Description of my Sudoku solver project",
            image: "images/sudoku_image.png",
            url: "/sudoku-solver"
        }} /> 
        <ArticleTile article={{
            title: "GPU Image Convolution",
            description: "Description of my Sudoku solver project",
            image: "images/sudoku_image.png",
            url: "/sudoku-solver"
        }} /> 
        <ArticleTile article={{
            title: "Zeckendorf's Theorem in Isabelle/HOL",
            description: "Description of my Sudoku solver project",
            image: "images/sudoku_image.png",
            url: "/sudoku-solver"
        }} /> 
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
        font-weight: 300;
        font-style: normal;
        text-align: justify;
        line-height: 1.7;
        margin-bottom: 54px;
    }

    .overview {
        padding: 16px;
    }
</style>