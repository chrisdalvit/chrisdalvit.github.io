<script>
    import ArticleTile from "$lib/ArticleTile.svelte" 
    import GirdLayout from "$lib/GirdLayout.svelte";
</script>


<GirdLayout>
    <div class="overview" slot="center">
        <h1 class="title">Hi!</h1>
        <p>
            I'm Christian. Somehow, you've landed on my small corner of the internet. Here, I share my projects and thoughts about stuff that I'm intrested in. Feel free to explore and connect with me!
        </p>
        <ArticleTile article={{
            title: "Sodoku Solver",
            description: "Step-by-step tutorial on how to build a real-time Sudoku solver",
            image: "sudoku_solver/tile.png",
            url: "/sudoku-solver"
        }} /> 
        <ArticleTile article={{
            title: "GPU Matrix Transposition",
            description: "Description of my Sudoku solver project",
            image: "sudoku_solver/tile.png",
            url: "/sudoku-solver"
        }} /> 
        <ArticleTile article={{
            title: "GPU Image Convolution",
            description: "Description of my Sudoku solver project",
            image: "sudoku_solver/tile.png",
            url: "/sudoku-solver"
        }} /> 
        <ArticleTile article={{
            title: "Zeckendorf's Theorem in Isabelle/HOL",
            description: "Description of my Sudoku solver project",
            image: "sudoku_solver/tile.png",
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