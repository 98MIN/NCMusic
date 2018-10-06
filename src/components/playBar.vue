<template>
    <div id="playBar">
            <div class="navbar">
            <a href="#">
                <span class="play"></span>
                播放
            </a>
            <a href="#">
                <span class="collection"></span>
                收藏
            </a>
            <a href="#">
                <span class="share"></span>
                分享
            </a>
            <a href="#">
                <span class="download"></span>
                下载
            </a>
            <a href="#">
                <span class="comments"></span>
                {{commentsCount.total}}
            </a>
        </div>
    </div>
</template>
<script>
export default {
    props: ['commentsCount']
}
</script>
<style scoped>
    /* 收藏 */
    .navbar a span{
        display: inline-block;
        height: 15px;
        width: 15px;
        background: url(../images/icon.png) no-repeat -45px -110px;
        vertical-align: middle;
    }
    /* 播放 */
    .navbar a .play{
         background: url(../images/icon.png) no-repeat -45px -635px;
    }
    /* 分享 */
    .navbar a .share{
         background: url(../images/icon.png) no-repeat -45px -160px;
    }
    /* 下载 */
    .navbar a .download{
         background: url(../images/icon.png) no-repeat -68px -430px;
    }
    .navbar a{
       text-decoration: none;
       color: #333;
       font-size: 14px;
       display: inline-block;
       margin-right: 3px;
       padding: 5px 8px;
       border: 1px solid #b2b2b2;
       border-radius: 5px;
    }
</style>


