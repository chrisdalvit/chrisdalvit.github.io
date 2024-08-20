
<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-python.min.js" integrity="sha512-3qtI9+9JXi658yli19POddU1RouYtkTEhTHo6X5ilOvMiDfNvo6GIS6k2Ukrsx8MyaKSXeVrnIWeyH8G5EOyIQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</svelte:head>

<pre class="language-python">
<slot></slot> 
</pre>

<style>
    pre {
        border-radius: 10px;
    }
</style>