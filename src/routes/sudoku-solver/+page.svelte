<script>
    import GirdLayout from "$lib/GirdLayout.svelte";

</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-okaidia.min.css" integrity="sha512-5HvW0a7ihK3ro2KhwEksDHXgIezsTeZybZDIn8d8Y015Ny+t7QWSIjnlCTjFzlK7Klb604HLGjsNqU/i5mJLjQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<GirdLayout>
    <div class="article" slot="center">
        <h1>Sudoku Solver</h1>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
            including versions of Lorem Ipsum.
        </p>
        
        <h3 id="overview" class="section-title">Overview</h3> 
        <pre class="language-python"><code class="language-python">
import argparse
import os

import cv2 as cv
import numpy as np
import torch
        </code></pre>
        <h3 id="image-preprocessing" class="section-title">Image Preprocessing</h3> 
        <p>
            Image Preprocessing
        </p>
        <h3 id="sudoku-detection" class="section-title">Sudoku Detection</h3> 
        <p>
            Sudoku Detection
        </p>
        <h3 id="cell-extraction" class="section-title">Cell Extraction</h3> 
        <p>
            Cell Extraction
        </p>
        <h3 id="digit-recognition" class="section-title">Digit Recognition</h3> 
        <p>
            Digit Recognition
        </p>
        <h3 id="sudoku-solving" class="section-title">Sudoku Solving</h3> 
        <p>
            Sudoku Solving
        </p>
        <h3 id="solution-projection" class="section-title">Solution Projection</h3> 
        <p>
            Solution Projection
        </p>
        <h3 id="conclusion" class="section-title">Conclusion</h3> 
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

    h3 {
        margin-bottom: 20;
    }

    p {
        font-family: "Heebo", sans-serif;
        font-optical-sizing: auto;
        font-weight: 300;
        font-style: normal;
        text-align: justify;
        line-height: 1.7rem;
        margin-top: 0px;
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
        margin-top: 40px;
    }
</style>