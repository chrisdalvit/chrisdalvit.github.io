
<div class="frame">
    <slot name="left">
        <div/>
    </slot>
    <slot name="center">
        <div/>
    </slot>
    <slot name="right">
        <div/>
    </slot>
</div>

<style>
    @media only screen and (min-width: 600px) {
        .frame {
            width: 100%;
        }
    }
    
    @media only screen and (max-width: 600px) {
        .frame {
            width: 100%;
        }
    }

    @media only screen and (min-width: 768px) {
        .frame {
            display: grid;
            grid-template-columns: auto minmax(auto, 700px) auto;
        }
    }

    @media only screen and (min-width: 992px) {
        .frame {
            display: grid;
            grid-template-columns: auto minmax(auto, 700px) auto;
        }
    }

    @media only screen and (min-width: 1200px) {
        .frame {
            display: grid;
            grid-template-columns: auto minmax(auto, 700px) auto;
        }
    }
</style>