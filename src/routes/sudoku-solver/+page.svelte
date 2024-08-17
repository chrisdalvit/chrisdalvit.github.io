<script>
    import GirdLayout from "$lib/GirdLayout.svelte";

</script>

<GirdLayout>
    <div class="article" slot="center">
        <h1>Sudoku Solver</h1>
        <p>
            <b>Short Description = Abstract</b>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
            including versions of Lorem Ipsum.
        </p>
        
        <a class="section-title" href="#overview">Overview</a> 
        <pre class="language-python">
            <code>"println(Hello)"</code>
        </pre>
        <a class="section-title" href="#image-preprocessing">Image Preprocessing</a> 
        <p>
            Image Preprocessing
        </p>
        <a class="section-title" href="#sudoku-detection">Sudoku Detection</a> 
        <p>
            Sudoku Detection
        </p>
        <a class="section-title" href="#cell-extraction">Cell Extraction</a> 
        <p>
            Cell Extraction
        </p>
        <a class="section-title" href="#digit-recognition">Digit Recognition</a> 
        <p>
            Digit Recognition
        </p>
        <a class="section-title" href="#sudoku-solving">Sudoku Solving</a> 
        <p>
            Sudoku Solving
        </p>
        <a class="section-title" href="#solution-projection">Solution Projection</a> 
        <p>
            Solution Projection
        </p>
        <a class="section-title" href="#conclusion">Conclusion</a> 
        <p>
            Conclusion
        </p>
    </div>
</GirdLayout>


<style>
    h1 {
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
    }

    .article {
        max-width: 700px;
        padding: 16px;
        justify-self: center;
    }

    .section-title {
        font-family: "Sometype Mono", monospace;
        font-optical-sizing: auto;
        font-style: normal;
        text-decoration: none;
        color: black;
        font-weight: bold;
        font-size: 1.5em;
    }
</style>