<script>
    export let article = { title: "", description: "", image: "", url: ""}
    
</script>

<div class="container">
    <div class="header">
        <img src={article.image} alt="Tile header"/> 
    </div>
    <div class="content">
        <h2>{article.title}</h2>
        <div class="content-description">
            <p>{article.description}</p>
        </div>
        <div class="link-container">
            <a class="article-link" href={article.url} data-sveltekit-reload>More</a>
        </div>
    </div>
</div>

<style>
    .container {
        height: 128px;
        display: flex;
        margin-bottom: 16px;
    }

    .container:hover {
        box-shadow: 7px 7px 0px 0px rgba(0, 0, 255, .2);
        background-color: rgba(0, 0, 255, .05);
        transition: all 0.2s ease-in-out;
    }

    .content {
        width: 100%;
        height: auto;
        margin: 16px;
    }

    .content-description {
        font-family: "Heebo", sans-serif;
        font-optical-sizing: auto;
        font-weight: 300;
        font-style: normal;
        height: 48px;
        overflow: hidden;
    }

    .link-container {
        display: flex;
        margin-right: 4px;
        justify-content: end;
        justify-self: flex-end;
    }
    
    .article-link {
        text-decoration: none;
        color: black;
        font-family: "Sometype Mono", monospace;
        font-optical-sizing: auto;
        font-style: normal;
    }

    .article-link:hover {
        color: rgba(0, 0, 125, .5);
    }

    img {
        width: 128px;
    }

    h2 {
        font-family: "Sometype Mono", monospace;
        font-optical-sizing: auto;
        font-style: normal;
        margin: 0px;
    }

    p {
        margin-top: 4px;
        margin-bottom: 8px;
    }

    @media only screen and (min-width: 600px) {
        div.header {
            visibility: hidden;
            width: 0px;
        }
    }
    
    @media only screen and (max-width: 600px) {
        div.header {
            visibility: hidden;
            width: 0px;
        }
    }

    @media only screen and (min-width: 768px) {
        div.header {
            width: 128px;
            overflow: hidden;
            visibility: visible;
            display: flex;
            justify-content: center;
            margin-left: 16px;
        }
    }

    @media only screen and (min-width: 992px) {
        div.header {
            width: 128px;
            overflow: hidden;
            visibility: visible;
            display: flex;
            justify-content: center;
            margin-left: 16px;
        }
    }

    @media only screen and (min-width: 1200px) {
        div.header {
            width: 128px;
            overflow: hidden;
            visibility: visible;
            display: flex;
            justify-content: center;
            margin-left: 16px;
        }
    }

</style>