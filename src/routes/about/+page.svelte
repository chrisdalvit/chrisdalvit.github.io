<script>
    import GirdLayout from "$lib/GirdLayout.svelte";

</script>

<GirdLayout>
    <div class="content" slot="center">
        <h1>About Me</h1>
        <p>
            I am a Computer Science student from South Tyrol. 
            Currently, I am pursuing a Master's degree at the University of Trento, 
            where I specialize in Artificial Intelligence and Computer Vision. Before this, 
            I earned Bachelor's degrees in Computer Science and Philosophy from the University of Innsbruck. 
            During my time there, I was particularly interested in logic, formal verification (mainly using Isabelle/HOL), 
            epistemology, and the philosophy of science.
        </p>
        <p>
            If you'd like to connect, feel free to reach out via email, or you can find me on GitHub and LinkedIn.
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
        text-align: justify;
        line-height: 1.5;
        font-family: "Heebo", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
    }

    .content {
        max-width: 700px;
        padding: 16px;
    }
</style>