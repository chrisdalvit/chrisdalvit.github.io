
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
    div.frame {
        display: grid;
        grid-template-columns: auto minmax(auto, 700px) auto;
    }
</style>