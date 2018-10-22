<template>
    <div id="mask">

    </div>
</template>
<script>
    export default{
        methods: {
            mask(){
                var sTop = document.documentElement.scrollTop||document.body.scrollTop;
                var cTop = document.documentElement.clientHeight||document.body.clientHeight;
                var height = sTop+cTop;
                document.getElementById("mask").style.height=height+"px";
            }
        },
        mounted () {
            this.mask();
        }
    }
</script>
<style scoped>
    #mask{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        background:rgba(0,0,0,0.4);
        z-index:995;
    }
</style>