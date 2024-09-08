<script>
    import Highlight from "svelte-highlight";
    import python from "svelte-highlight/languages/python";
    import "svelte-highlight/styles/github-dark-dimmed.css";

    import ArticleTemplate from "$lib/ArticleTemplate.svelte";
    import ArticleSection from "$lib/ArticleSection.svelte";
    import Katex from 'svelte-katex';
    import ArticleAbstract from "$lib/ArticleAbstract.svelte";
</script>

<ArticleTemplate title="Sudoku Solver" date="22. August 2024">
    <ArticleAbstract>
        This blog post describes step-by-step how to implement a real-time Sudoku solver in Python using OpenCV and PyTorch. Beside describing the implementation step-by-step, the blog post also aims to explain the theoretical foundations of the applied concepts. Implementing a real-time Sudoku solver is one of the most popular beginner projects in Computer Vision and there already exist many tutorials on the internet. But most tutorials I read don't go into the theoretical details (let me know if I missed a tutorial that does). With this blog post I want to fill this gap. You can also just skip the mathematical stuff. The theoretical background is not necessarily needed to understand how the Sudoku solver works, but is meant as additional information for who is intrested in it. I assume you know what a Sudoku puzzle is and have some knowledge of Python. You can check out the code on <a href="https://github.com/chrisdalvit/sudoku-solver" target="_blank">Github</a>. 
    </ArticleAbstract>
    <figure>
        <div class="image-container">
            <img src="/solver_demo.gif" alt="GIF showing an example of the real-time Sudoku solver"/>
        </div>
        <figcaption>A demo of the implemented Sudoku solver</figcaption>
    </figure>

    
    <ArticleSection title="Overview" id="overview">
        <p>
            Before diving into the details, I think it is a good idea to start with an overview over the whole process. Let's take a look at the function that basically does all the work (with some edge case handeling removed). The following code snippet processes one frame. Processing a video is then simply calling this function on every frame.
        </p>
        <Highlight language={python} code={
`def process_frame(img, model):
    prep_img = preprocessing(img)
    square, corners = find_sudoku_square(prep_img)
    cells = extract_cells(square)
    preds = []
    for c in cells:
        pred = model(c)
        preds.append(pred)`
        }/>
        <p>
            The function takes an image and a neural network as input. The first step is to preprocess the image. The preprocessed image is then used to extract the Sudoku grid. The function <code>find_sudoku_square</code> returns the rectangular image patch containing the Sudoku grid and the coordinates of the grid corners. The corners are later needed for projecting the solution onto the original image. As next step we apply <code>extract_cells</code> to split up the Sudoku grid into single cells. In the loop we classify the digits in the cells (or if they are empty) using the neural network. The collected predicitons are put inside a <code>Sudoku</code> object to compute a solution for the puzzle. <code>draw_digits</code> draws the solution onto the image patch and applies a perspective projection to the patch using the corners. As last step the projected Sudoku solution is blended with the original image.
        </p>
        <p>
            Don't worry if something is not clear yet. We will see how things work in the following sections. At this point we have a rough idea how the Sudoku solver should work. The main point is the we find the Sudoku gird, split it up, predict the digits, solve the puzzle and project the solution back onto the output image. In case of a video we do this for process for every frame. Obviously there are many other approaches (and for sure better ones). I will talk about possible improvements in the conclusion. 
        </p>
    </ArticleSection>

    <ArticleSection title="Image Preprocessing" id="image-preprocessing">
        <p>
            Let's take a look at the first step of the whole Sudoku solver: preprocessing. The goal of preprocessing is to apply operations to the image that simplify the other processing steps.
        </p>
        <Highlight language={python} code={`
def preprocessing(img):
    img = img.copy()
    img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    max_dim = max(img.shape[0], img.shape[1])
    kernel_size = int(max_dim*0.01) if int(max_dim*0.01) % 2 == 1 else int(max_dim*0.01)+1
    img = cv.GaussianBlur(img, (kernel_size,kernel_size), 0)
    img = cv.adaptiveThreshold(img, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2)
    return img
        `} />
        <p>
            In the preprocessing function does three things. It creates a copy of the input image, converts it to a grayscale image, applies a Gaussian blur and performs Adaptive thresholding. Let's go through the single steps. The function recieves a frame as argument. We can assume that the frame was read using OpenCV. To avoid any problems with shallow copying a copy of the frame is created. My concern at the beginning was that calling the <code>copy</code> method on every frame is computationally to expensive and will impact the real-time performance of the solver. But it turn's out that for my test setup it doesen't (which was an iPhone 12 Mini for video capturing and a MacBook Air with M1 chip for processing). So I decided to stick with creating a deep copy of every frame to make sure the Sudoku solver operates on its own version of the frame. But if you run the solver on a system with limited computation power or little memory, this function call might create problems (although I have not tested if it realy does).
        </p>
        <p>
            After creating a copy of the frame, the frame is converted into a grayscale image. We can do this by using OpenCV's <code>cvtColor</code> function. The argument <code>cv.COLOR_BGR2GRAY</code> tells OpenCV to convert a RGB image into a grayscale image. To be precise OpenCV reads images not as RGB but as BGR (if you wonder why, it done because of <a href="https://learnopencv.com/why-does-opencv-use-bgr-color-format/" target="_blank">historical reasons</a>). Therefore the argument we need is also called <code>COLOR_BGR2GRAY</code> and not <code>cv.COLOR_RGB2GRAY</code>. Since this is only a technical detail, I will continue to reffer to color images as RGB images. Mathematically speaking  
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