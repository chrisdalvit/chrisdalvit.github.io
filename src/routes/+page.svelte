<script>
    import ArticleTile from "$lib/ArticleTile.svelte" 
    import GirdLayout from "$lib/GirdLayout.svelte";
</script>


<GirdLayout>
    <div class="overview" slot="center">
        <div class="ufo-container">
            <img class="ufo" src="favicon.png" alt="UFO icon"/>
        </div>
        <h1 class="title">Hi!</h1>
        <p>
            I'm Christian. Somehow, you've landed on my small corner of the internet. Here, I share my projects and thoughts about stuff that interest me. Feel free to explore and connect with me!
        </p>
        <ArticleTile article={{
            title: "Sodoku Solver",
            description: "Step-by-step tutorial on how to build a real-time Sudoku solver",
            image: "sudoku_solver/tile.png",
            url: "/sudoku-solver"
        }} /> 
        <ArticleTile article={{
            title: "Efficient Matrix Transpose",
            description: "Implementation and benchmarking matrix transpose",
            image: "efficient-matrix-transpose/tile.png",
            url: "/efficient-matrix-transpose"
        }} /> 
        <ArticleTile article={{
            title: "GPU Matrix Transpose",
            description: "Implementation and benchmarking of parallelized matrix transpose",
            image: "gpu-matrix-transpose/tile.png",
            url: "/gpu-matrix-transpose"
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
        padding-top: 32px;
    }

    .ufo {
        width: 100px; 
        position: absolute; 
        margin-top: -40px;
        rotate: 25grad;
        padding-top: 20px;
    }

    .ufo-container {
        display: flex; 
        justify-content: end;
    }
</style>