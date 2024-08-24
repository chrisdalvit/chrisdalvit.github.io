<script>
    import ArticleTemplate from "$lib/ArticleTemplate.svelte";
    import ArticleSection from "$lib/ArticleSection.svelte";
    import CodeBox from "$lib/CodeBox.svelte";
    import Katex from 'svelte-katex';
    import ArticleAbstract from "$lib/ArticleAbstract.svelte";
</script>

<ArticleTemplate title="Sudoku Solver" date="22. August 2024">
    <ArticleAbstract>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
        containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
        including versions of Lorem Ipsum.
    </ArticleAbstract>
    <ArticleSection title="Overview" id="overview">
        <CodeBox><code>
def process_sudoku(img, model):
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