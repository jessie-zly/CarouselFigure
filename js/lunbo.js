$(function () {
    //当前下标
    let inow = 0;
    //定时器
    let timer = null;
    //
    let li_Length = $('.imgList>li').size();

    //第一张显示
    $('.imgList>li').eq(inow).css({
        opacity: 1
    });

    /**
     * 播放下一张
     */
    const playNextImg = () => {
        //当前淡出
        $('.imgList>li').eq(inow).stop().animate({
            opacity: 0
        }, 2000);
        //下一张
        inow++;
        //判断是否到最后一张
        if (inow >= li_Length) {
            //重置为第一张
            inow = 0;
        }
        //下一张淡入
        $('.imgList>li').eq(inow).stop().animate({
            opacity: 1
        }, 2000);
        //清楚当前li 和 span的 active,并添加下一张的active
        $('.page>span').eq(inow).addClass('active').siblings('span').removeClass('active');
    }

    /**
     * 播放上一张
     */
    const playPreviousImg = () => {
        //当前淡出
        $('.imgList>li').eq(inow).stop().animate({
            opacity: 0
        }, 2000);
        //
        inow--;
        //判断是否越界
        if (inow < 0) {
            //重置为最后一张
            inow = li_Length - 1;
        }
        //上一张淡出
        $('.imgList>li').eq(inow).stop().animate({
            opacity: 1
        }, 2000);
        //
        $('.page>span').eq(inow).addClass('active').siblings('span').removeClass('active');
    }

    /**
     * 底部点击播放
     */
    $('.page>span').click(function () {
        //上一张淡出
        $('.imgList>li').eq(inow).stop().animate({
            opacity: 0
        }, 500);
        //下一张淡入
        $('.imgList>li').eq($(this).index()).stop().animate({
            opacity: 1
        }, 500);
        //按钮跟随变化
        $(this).addClass('active').siblings('span').removeClass('active');
        // 重置inow为当前
        inow = $(this).index();
    });

    //左击按钮
    $('.left').click(playPreviousImg);
    //右击按钮
    $('.right').click(playNextImg);

    /**
     * container 事件
     */
    $('.container').hover(function () {
        clearInterval(timer); // 移入时停止
        //
        $(this).css({
            'opacity': 1
        }).siblings('li').css({
            'opacity': 0
        });
    }, function () {
        clearInterval(timer);
        timer = setInterval(playNextImg, 2000); // 移出时自动播放
    });

    //自动播放
    timer = setInterval(playNextImg, 2000);

})