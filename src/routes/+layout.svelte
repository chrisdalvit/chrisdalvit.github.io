

<div class="container">
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
    <slot></slot>
</div>


<style>
    @media only screen and (min-width: 600px) {
        div.container {
            margin-left: 5%;
            margin-right: 5%;
        }
    }

	@media only screen and (max-width: 600px) {
        div.container {
            margin-left: 5%;
            margin-right: 5%;
        }
    }

    @media only screen and (min-width: 768px) {
        div.container {
            margin-left: 20%;
            margin-right: 20%;
        }
    }

    @media only screen and (min-width: 992px) {
        div.container {
            margin-left: 20%;
            margin-right: 20%;
        }
    }

    @media only screen and (min-width: 1200px) {
        div.container {
            margin-left: 25%;
            margin-right: 25%;
        }
    }
    
    @media only screen and (min-width: 2500px) {
        div.container {
            margin-left: 30%;
            margin-right: 30%;
        }
    }
</style>