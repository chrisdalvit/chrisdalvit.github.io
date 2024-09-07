<script>
    import ArticleTemplate from "$lib/ArticleTemplate.svelte";
    import ArticleSection from "$lib/ArticleSection.svelte";
    import CodeBox from "$lib/CodeBox.svelte";
    import Katex from 'svelte-katex';
    import ArticleAbstract from "$lib/ArticleAbstract.svelte";
</script>

<ArticleTemplate title="Sudoku Solver" date="22. August 2024">
    <ArticleAbstract>
        This blog post describes step-by-step how to implement a real-time Sudoku solver in Python using OpenCV and PyTorch. Beside describing the implementation step-by-step, the blog post also aims to explain the theoretical foundations of the applied concepts. Implementing a real-time Sudoku solver is one of the most popular beginner projects in Computer Vision and there already exist many tutorials on the internet. But most tutorials I read don't go into the theoretical details (let me know if I missed a tutorial that does). With this blog post I want to fill this gap. I assume you know what a Sudoku puzzle is and have some knowledge of Python. You can check out the code on Github. 
    </ArticleAbstract>
    <figure>
        <div class="image-container">
            <img src="/solver_demo.gif" alt="GIF showing an example of the real-time Sudoku solver"/>
        </div>
        <figcaption>A demo of the implemented Sudoku solver</figcaption>
    </figure>

    
    <ArticleSection title="Overview" id="overview">
        <p>
            Before diving into the details, I think it is a good idea to start with an overview over the whole process. Let's take a look at the function that basically does all the work. The following code snippet processes one frame. Processing a video is then simply calling this function on every frame.
        </p>
        <CodeBox><code>
def process_frame(img, model):
    prep_img = preprocessing(img)
    square, corners = find_sudoku_square(prep_img)
    cells = extract_cells(square)
    preds = []
    for c in cells:
        pred = model(c)
        preds.append(pred)

    sudoku = Sudoku(preds)
    solution = sudoku.solve()
    I = draw_digits(img, sudoku, solution, corners)
    return blend_images(I, img, I)
        </code></CodeBox>
        <p>
            The function takes an image and a neural network as input. The first step is to preprocess the image. The goal of preprocessing is modifying the image in a way that simplifies the other steps. The preprocessed image is then used to extract the Sudoku grid. The function <code>find_sudoku_square</code> returns the rectangular image patch containing the Sudoku grid and the coordinates of the grid corners. The corners are later needed for projecting the solution onto the original image. As next step we apply <code>extract_cells</code> to split up the Sudoku grid into single cells. In the loop we classify the digits in the cells (or if they are empty) using the neural network. The collected predicitons are put inside a <code>Sudoku</code> object to compute a solution for the puzzle. <code>draw_digits</code> draws the solution onto the image patch and applies a perspective projection to the patch using the corners. As last step the projected Sudoku solution is blended with the original image.
        </p>
        <p>
            Don't worry if something is not clear yet. We will see how things work in the following sections. At this point we have a rough idea how the Sudoku solver should work. The main point is the we find the Sudoku gird, split it up, predict the digits, solve the puzzle and print the solution back onto the output image. In case of a video we do this for process for every frame.
        </p>
    </ArticleSection>

    <ArticleSection title="Image Preprocessing" id="image-preprocessing">
        <p>
            Image Preprocessing
            <Katex>f : \mathbb{'{R}'}^2 \rightarrow \mathbb{'{R}'}</Katex>
        </p>
    </ArticleSection>
    <ArticleSection title="Sudoku Detection" id="sudoku-detection">
        <p>
            Sudoku Detection    
        </p>
    </ArticleSection>
    <ArticleSection title="Cell Extraction" id="cell-extraction">
        <p>
            Cell Extraction
        </p>
    </ArticleSection>
    <ArticleSection title="Digit Recognition" id="digit-recognition">
        <p>
            Digit Recognition
        </p>
    </ArticleSection>
    <ArticleSection title="Sudoku Solving" id="sudoku-solving">
        <p>
            Sudoku Solving
        </p>
    </ArticleSection>
    <ArticleSection title="Solution Projection" id="solution-projection">
        <p>
            Solution Projection
        </p>
    </ArticleSection>
    <ArticleSection title="Conclusion" id="conclusion">
        <p>
            Conclusion
        </p>
    </ArticleSection>
</ArticleTemplate>

<style>
    .image-container {
        display: flex; 
        justify-content: center;
    }
</style>