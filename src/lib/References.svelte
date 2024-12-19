<script lang="ts">

    type CitationType = {
        index: number,
        author: string,
        title: string,
        year: string,
        link: string
    }
    export let citations: Record<string, CitationType>
</script>


<div>
    <h3 id="references" class="section-title">References</h3> 
    {#each Object.entries(citations) as [tag, citation]}
        <p>[{citation.index}] {citation.author} <a href={citation.link} target="_blank">"{citation.title}"</a>, {citation.year}</p>
    {/each}
</div>

<style>
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