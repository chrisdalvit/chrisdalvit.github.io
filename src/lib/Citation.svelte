<script lang="ts">

    type CitationType = {
        index: number,
        author: string,
        title: string,
        year: string,
        link: string
    }

    export let citation: CitationType
</script>

<span class="citation-container">
    <div class="info-card">
        "{citation.title}"<br/> 
        {citation.author}, {citation.year}
    </div>
    <a href="#references">
        [{citation.index}]
    </a>
</span>

<style>

    a {
        color: rgb(157, 157, 255);
        text-decoration: none;
    }

    .citation-container {
        display: inline-block;
        position: relative;
        cursor: pointer;
    }

    .citation-container .info-card {
        visibility: hidden;
        position: absolute;
    }

    .citation-container:hover .info-card{
        visibility: visible;
        box-shadow: 7px 7px 0px 0px rgba(0, 0, 255, .2);
        background-color: rgb(228, 228, 255);
        transition: all 0.2s ease-in-out;
    }

    .info-card{
        visibility: hidden;
        width: fit-content;
        background-color: white;
        padding: 8px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -125%);
        width:max-content;
        color: black;
    }
</style>



