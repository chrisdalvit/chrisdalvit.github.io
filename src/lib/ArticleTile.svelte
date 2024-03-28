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
            <a class="article-link" href={article.url}>More</a>
        </div>
    </div>
</div>

<style>
    div.container {
        width: 100%;
        height: 128px;
        display: flex;
        background-color: red;
        margin-bottom: 16px;
    }

    div.content {
        width: 100%;
        height: auto;
        padding: 16px;
    }

    div.content-description {
        height: 48px;
        overflow: hidden;
    }

    div.link-container {
        display: flex;
        margin-right: 4px;
        justify-content: end;
        justify-self: flex-end;
    }
    
    a.article-link {
        text-decoration: none;
        color: black;
    }

    a.article-link:hover {
        color: white;
    }

    img {
        width: 128px;
    }

    h2 {
        margin: 0px;
    }

    p {
        margin-top: 8px;
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
        }
    }

    @media only screen and (min-width: 992px) {
        div.header {
            width: 128px;
            overflow: hidden;
            visibility: visible;
        }
    }

    @media only screen and (min-width: 1200px) {
        div.header {
            width: 128px;
            overflow: hidden;
            visibility: visible;
        }
    }

</style>