<template>
    <div id="footer">
        <div class="content">
            <div class="footer-download">
                <h3>下载网易云音乐客户端</h3>
                <ul class="clearfix">
                    <li>
                        <a href="">
                            <i class="item-window"></i>
                            PC版
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="item-mac"></i>
                            Mac版
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="item-Android"></i>
                            Android版
                        </a>
                    </li>
                    <li>
                       <a href="">
                            <i class="item-iPhone"></i>
                            iPhone版
                        </a>
                    </li>
                </ul>
            </div>
            <div class="footer-product">
                <h3>特色产品</h3>
                <ul class="clearfix">
                    <li>
                        <a href="#">
                            <i class="qmkg"></i>
                            全民K歌
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="qmss"></i>
                            Super Sound
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="qmqp"></i>
                            QPlay
                        </a>
                    </li>
                    <li>
                        <a href="#" class="czhl">车载互联</a>
                    </li>
                    <li>
                        <a href="#" class="wyyx">网易游戏</a>
                    </li>
                </ul>
            </div>
            <div class="footer-link">
                <h3>合作链接</h3>
                <ul class="clearfix">
                    <li><a href="#">阴阳师</a></li>
                    <li><a href="#">荒野行动</a></li>
                    <li><a href="#">决战平安京</a></li>
                    <li><a href="#">逆水寒</a></li>
                    <li><a href="#">边境之旅</a></li>
                    <li><a href="#">率土之滨</a></li>
                    <li><a href="#">网易公开课</a></li>
                    <li><a href="#">炉石传说</a></li>
                    <li><a href="#">网易新闻</a></li>
                    <li><a href="#">网易严选</a></li>
                </ul>
            </div>
            <div class="footer-plant">
                <h3>合作平台</h3>
                <ul>
                    <li><a href="#">网易音乐人平台</a></li>
                    <li><a href="#">音乐号认证</a></li>
                    <li><a href="#">上传音频</a></li>
                </ul>
            </div>
            <div class="copyright">
                <p>
                    <a href="#">关于网易</a>
                    |
                    <a href="#">About NetEase</a>
                    | 
                    <a href="#">服务条款</a>
                    | 
                    <a href="#">用户服务协议</a>  
                    |
                    <a href="#">隐私政策</a>
                    | 
                    <a href="#">权利声明</a> 
                    |
                    <a href="#">广告服务</a>
                    |
                    <a href="#">网易招聘</a>  
                    | 
                    <a href="#">客服中心</a>  
                    | 
                    <a href="#">网站导航</a> 
                </p>
                <p>Copyright &copy; 1998 - 2018 NetEase. All Rights Reserved.</p>
                <p>网易公司 版权所有 网易网络文化经营许可证</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                
            }
        }
    }
</script>
<style lang="scss" scoped>
    #footer{
        width: 100%;
        height: 587px;
        background: #333;
        color: #999;
        .content{
            width: 1105px;
            height: 100%;
            margin: 0 auto;
        }
        .footer-download{
            float: left;
            width: 357px;
            height: 229px;
            font-size: 14px;
            overflow: hidden;
            margin-left: 10px;
            h3{
               font-weight: 400; 
               padding: 80px 0 46px;
            }
            ul{
                list-style: none;
                margin-left: -29px;
                li{
                    float: left;
                    text-align: center;
                    
                    a{
                        text-decoration: none;
                        color: #999;
                        &:hover{
                            color: #31c37c;
                            i{
                                background-position-y: -49px;
                            }
                        }
                        i{
                            display: block;
                            height: 48px;
                            box-sizing: border-box;
                            margin: 0 29px 12px;
                        }
                        .item-window{
                            background: url("../images/footer.png");
                            width: 37px;
                        }
                        .item-mac{
                            background: url("../images/footer.png") -92px 0 no-repeat;
                            width: 47px;
                        }
                        .item-Android{
                            background: url("../images/footer.png") -190px 0 no-repeat;
                            width: 37px;
                        }
                        .item-iPhone{
                            background: url("../images/footer.png") -280px 0 no-repeat;
                            width: 32px;
                        }
                    }
                }
            }
        }
        // 特色产品
        .footer-product{
            float: left;
            width: 304px;
            height: 286px;
            font-size: 14px;
            margin: 0 70px 0 63px;
            h3{
               font-weight: 400; 
               padding: 80px 0 46px;
            }
            ul{
                list-style: none;
                margin-left: -25px;
                li{
                    float: left;
                    text-align: center;
                    margin-bottom: 18px;
                    a{
                        text-decoration: none;
                        color: #999;
                        &:hover{
                            color: #31c37c;
                            i{
                                background-position-y: -49px;
                            }
                        }
                        i{
                            display: block;
                            height: 48px;
                            box-sizing: border-box;
                            margin: 0 29px 12px;
                        }
                        .qmkg{
                            width: 41px;
                            background: url("../images/footer.png") -370px 0;
                        }
                        .qmss{
                            width: 37px;
                            background: url("../images/footer.png") -463px 0;
                        }
                        .qmqp{
                            width: 40px;
                            background: url("../images/footer.png") -561px 0;
                        }
                    }
                    .czhl,.wyyx{
                        width: 56px;
                        height: 23px;
                        margin-right: 5px;
                        padding-left: 25px;
                    }
                }
            }
        }
        // 合作链接
        .footer-link{
            padding-bottom: 57px;
            float: left;
            width: 300px;
            height: 337px;
            box-sizing: border-box;
            font-size: 14px;
             h3{
               font-weight: 400; 
               padding: 80px 0 46px;
            }
            ul{
                list-style: none;
                li{
                    float: left;
                    width: 100px;
                    height: 21px;
                    margin-bottom: 12px;
                    a{
                        text-decoration: none;
                        color: #999;
                        &:hover{
                            color: #31c37c;
                        }
                    }
                }
            }
        }
        // 开放平台
        .footer-plant{
            font-size: 14px;
            margin-bottom: 80px;
            h3{
                font-weight: 400;
                 padding: 80px 0 46px;
            }
            ul{
                list-style: none;
                li{
                    float: left;
                    margin-right: 30px;
                    a{
                        color: #999;
                        text-decoration: none;
                    }
                }
            }
        }
        // 备案
        .copyright{
            p{
                font-size: 12px;
                text-align: center;
                padding: 5px 0;
                a{
                    text-decoration: none;
                    color: #999;
                }
            }
        }
    }
</style>

