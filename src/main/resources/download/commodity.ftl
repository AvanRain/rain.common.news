<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=1080, target-densityDpi=device-dpi, user-scalable=no"/>
    <title>${name}</title>
    <link rel="stylesheet" href="css/bank.css" />
    <link rel="stylesheet" href="css/detail.css" />
    <link rel="stylesheet" href="css/loading.css" />
    <link rel="stylesheet" href="css/swiper.min.css" />
    <script src="js\all.js"></script>
</head>
<body>
<div class="main">
    <div class="swiper-container" style="height:1080px; width:1080px;" id="banner-container">
        <div class="swiper-wrapper" id="banner-wrapper"></div>
        <div class="swiper-pagination" id="banner-pagination"></div>
    </div>
    <div class="content">
        <div class="text1 left" id="name">${name}</div>
        <div class="text2 right" id="time">
            <div class="left text3">还剩</div><div class="left text4">02</div><div class="left text5">:</div><div class="left text4">12</div><div class="left text5">:</div><div class="left text4">30</div><div class="left text6">结束</div><div class="clear"></div>
        </div>
        <div class="clear"></div>
        <div class="left text7" id="rprice">${name}积分</div>
        
        <div class="clear"></div>
        <div>
            <img class="left check_with_border" src="img/check_with_border.png"/>
            <div class="left text9">可以兑换</div>
            <div class="clear"></div>
        </div>
        <div class="left text11">库存</div>
            <div class="left text12">${realstock}</div>
    </div>
    <div class="line"></div>
    <div class="space"></div>
    <div class="line"></div>
    
    <div class="line"></div>
    <div class="space"></div>
    <div class="line"></div>
    <div class="content">
        <div class="text10">产品基本信息</div>
        <div class="space">${cdesc}</div>
    </div>
    <div class="line"></div>
    <div class="space"></div>
    <div class="line"></div>
    <div class="content" id="comments"></div>
    <div class="line"></div>
    <div class="space"></div>
    <div class="line"></div>
    <div class="content">
        <div class="text10">产品详细介绍</div>
        <div class="space">${cdetail}</div>
    </div>
    <div class="line"></div>
    <div class="space"></div>
    <div class="line"></div>
    <div class="content" id="comments"></div>
    
</div>
<div class="get">立即兑换</div>
</body>
<script type="text/javascript">
    var window_height = $(window).height();
   // var imgs = ['http://www.pptbz.com/pptpic/UploadFiles_6909/201204/2012041411433867.jpg','http://www.pptbz.com/pptpic/UploadFiles_6909/201204/2012041411433867.jpg','http://www.pptbz.com/pptpic/UploadFiles_6909/201204/2012041411433867.jpg'];
    var imgs = ["${piclist}"];
    initBanner();
    function initBanner(){
        var html = "";
        for (var i=0; i<imgs.length; i++) {
            html += '<img class="swiper-slide" src="'+imgs[i]+'"/>';
        }
        $("#banner-wrapper").html(html);
        var swiper = new Swiper('#banner-container', {
            pagination: '#banner-pagination',
            paginationClickable: true,
            autoplayDisableOnInteraction: false,
            loop: true,
            autoplay: 4000
        });
    }
</script>
</html>