<script>
    import GirdLayout from "$lib/GirdLayout.svelte";

    export let title;
    export let date;
</script>

<GirdLayout>
    <div class="article" slot="center">
        <h1>{title}</h1>
        <p class="article-date">
            {date}
        </p>
        <slot/>
        <script src="https://utteranc.es/client.js"
            repo="chrisdalvit/chrisdalvit.github.io"
            issue-term="pathname"
            label="blog-post-comment"
            theme="github-light"
            crossorigin="anonymous"
            async>
    </script>
    </div>
</GirdLayout>


<style>
    h1 {
        font-family: "Sometype Mono", monospace;
        font-optical-sizing: auto;
        font-style: normal;
        margin-bottom: 12px;
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
        padding: 16px;
        justify-self: center;
    }

    .article-date {
        display: flex;
        justify-content: end;
        font-weight: 300;
        font-size: 13px;
        margin-bottom: 4px;
        color: gray;
    }
    
</style>