function mouseOverOut (class1,class2) {//封装函数 二级菜单的显示隐藏
    var obj1 = byClass(class1);
    for (var i = 0; i < obj1.length; i++) {
        obj1[i].onmouseover = function () {
            for (var i = 0; i < obj1.length; i++) {
                if (obj1[i] == this) {
                    var obj2 = getClass(obj1[i],class2);
                    obj2[0].style.display = 'block';
                    obj1[i].onmouseout = function () {
                        obj2[0].style.display = '';
                    }
                }
            }
        }
    };
}
function imgOpMove (iner,li) {//封装函数 图片切换
    var inner = byClass(iner)[0];
    var imgs = inner.getElementsByTagName('img');
    var lis = byClass(li)[0].children;
    var page = byClass('m-i-page')[0].children;
    var x = 0,timer1 = null,timer2 = null;
    function autoMove () {
        timer1=setInterval(function () {
            x++;
            if (x >= imgs.length) {x = 0};
            move();
        }, 2000);
    }
    autoMove();
    function move () {
        clearInterval(timer2);
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = '';
            imgs[i].style.opacity = 0;
        }
        lis[x].className = 'num-selected';
        var op = 0;
        timer2 = setInterval(function () {
             op += 0.05;
             if (op >= 1) {
                op = 1;
                clearInterval(timer2);
            };
            imgs[x].style.opacity = op;
        }, 10)
    }
    function L1 () {
        clearInterval(timer1);
        x--;
        if (x < 0) {x = lis.length-1};
        move();
        autoMove();
    }
    function R1 () {
        clearInterval(timer1) ;
        x++;
        if (x >= lis.length) {x = 0};
        move();
        autoMove();
    }
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function () {
            clearInterval(timer1);
                for (var i = 0; i < lis.length; i++) {
                     if(lis[i] == this){
                        x = i;
                        move();
                        autoMove();
                     }
                 }
        }
    }
    addEvent(page[0],'click',L1);
    addEvent(page[1],'click',R1);
}
function imgMove (out) {
    var inner = byClass(out)[0];
    var imgs = inner.getElementsByTagName('img');
    var imgW = imgs[0].offsetWidth+1;
    var page = byClass('m-i-page')[1].children;
    var w = imgW*4;timer1 = null,timer2 = null;
    inner.scrollLeft = imgW*4;
    function L2 () {
        clearInterval(timer1);
        clearInterval(timer2);
        timer2 = setInterval(function () {
            w -= 10;
            if (w%(imgW*4) == 0) {clearInterval(timer2)};
            if (w < 0) {w = imgW*(imgs.length-4)};
            inner.scrollLeft = w;
        }, 10);
    }
    function R2 () {
        clearInterval(timer1);
        clearInterval(timer2);
        timer1 = setInterval(function () {
            w += 10;
            if (w%(imgW*4) == 0) {clearInterval(timer1)}
            if (w > imgW*(imgs.length-4)) {w = 0};
            inner.scrollLeft = w;
        }, 10);
    }
    addEvent(page[0],'click',L2);
    addEvent(page[1],'click',R2);
}
function floorImgMove (f) {//封装函数 1-12楼楼层的大图滚动
    var out = byClass('f-r1-out')[f-1];
    var inner = getClass(out,'f-r1-inner')[0];
    var inner2 = getClass(out,'f-r1-inner2')[0];
    var lis = out.parentNode.getElementsByTagName('li');
    var imgs = inner.getElementsByTagName('img');
    var imgW = imgs[0].offsetWidth;
    var page = byClass('m-i-page')[f+1].children;
    var x = 0 ,v = 1,timer1 = null,timer2 = null;//x控制li下标,v控制图片下标
    var firstImg = inner.children[0].cloneNode(true);
    var lastImg = inner.children[inner.children.length-1].cloneNode(true);
    inner.appendChild(firstImg);
    inner.insertBefore(lastImg, inner.children[0]);
    if (inner2) {
        var firstImg2 = inner2.children[0].cloneNode(true);
        var lastImg2 = inner2.children[inner2.children.length-1].cloneNode(true);
        inner2.appendChild(firstImg2);
        inner2.insertBefore(lastImg2, inner2.children[0]);
    }

    out.scrollLeft = imgW;
    function autoM () {
        timer1 = setInterval(function() {
            x++;
            if (x >= lis.length) {x = 0};
            v++;
            if (v >= imgs.length) {
                v = 2;
                out.scrollLeft = imgW;
            };
            Move();
        },2000)
    }
    autoM();
    function Move () {
        clearInterval(timer2);
        var start = out.scrollLeft;
        var end = imgW*v;
        var step = 0;
        var eveystep = (end - start)/20;
        timer2 = setInterval(function() {
            step++;
            if (step >= 20) {
                step = 0;
                clearInterval(timer2);
            }
            start += eveystep;
            out.scrollLeft = start;
        }, 20)
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        lis[x].className = 'f-li-selected';
    }
    function L3 () {
        clearInterval(timer1);
        x--;
        if (x < 0) {x = lis.length-1};
        v--;
        if (v < 0) {
            v = imgs.length-3;
            out.scrollLeft = imgW*(v+1);
        };
        Move();
        autoM();
    }
    function R3 () {
        clearInterval(timer1);
        x++;
        if (x >= lis.length) {x = 0};
        v++;
        if (v >= imgs.length) {
            v = 2;
            out.scrollLeft = imgW;
        };
        Move();
        autoM();
    }
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function () {
        clearInterval(timer1);
            for (var i = 0; i < lis.length; i++) {
                if (lis[i] == this) {
                    x = i;
                    v = i + 1;
                    Move();
                    autoM();
                }
            }
        }
    }
    addEvent(page[0],'click',L3);
    addEvent(page[1],'click',R3);
}
function floorDisplay (floorNum) {//封装函数 1-12楼的tap切换
    var floor = document.getElementById(floorNum);
    var tit = getClass(floor,'f-head')[0];
    var tits = tit.getElementsByTagName('li');
    var ftap = getClass(floor,'ftap');
    tit.onmouseover = function (ev) {
         var Eve = ev||window.event;
         var target = Eve.target||Eve.srcElement;
         if (target.nodeName == 'LI') {
            var j = index(target,tits);
            for (var i = 0; i < ftap.length; i++) {
                if (i == j) {
                    tits[i].className = 'floor-tap-sel';
                    tits[i].getElementsByTagName('span')[0].style.visibility = 'hidden';
                    if (i != 0) {
                        preNode(tits[i]).getElementsByTagName('span')[0].style.visibility = 'hidden';
                    };
                    ftap[i].style.display = 'block';
                }else {
                    tits[i].className = '';
                    tits[i].getElementsByTagName('span')[0].style.visibility = 'visible';
                    ftap[i].style.display = 'none';
                }
            }
         }
    };
}
window.onload = function () {
    var $top = document.getElementById('top');
    ;(function () {//送达地址更改
        var td1 = getClass($top,'t-downdrop1')[0];
        var td1_a = td1.getElementsByTagName('a');
        var siteTit = getClass($top,'t-n-head')[0].getElementsByTagName('span')[0];
        for (var i = 0; i < td1_a.length; i++) {
            td1_a[i].onclick=function () {
                for (var i = 0; i < td1_a.length; i++) {
                     if(td1_a[i] == this){
                        td1_a[i].className = 'a-selected';
                        siteTit.innerText = this.innerText;
                     }else {
                        td1_a[i].className = '';
                     }
                 }
            }
        }
    })();
    ;(function () {//关闭banner
        var banner = byClass('banner')[0];
        var clo = banner.getElementsByTagName('span')[0];
        clo.onclick = function () {
            banner.style.opacity = 1;
            var timer = setInterval(function () {
                banner.style.opacity -= 0.1;
                if (banner.style.opacity <= 0) {
                    clearInterval(timer);
                    banner.style.display = 'none';
                }
            }, 50);
        }
    })();
    mouseOverOut ('t-n-box','t-downlist');//头部二级菜单
    mouseOverOut ('h-shopcart','h-s-downdrop');//'我的购物车'二级菜单
    mouseOverOut ('m-i-among','m-i-page');//换图片中左右按钮
    mouseOverOut ('m-t-box','m-i-page');//换图片中左右按钮
    var mGap = byClass('m-gap');
    for (var i = 0; i < mGap.length; i++) {
        mGap[i].style.top = mGap[0].parentNode.offsetHeight*i + 'px';
    }
    mouseOverOut ('m-i-head','m-i-downlist');//商品分类二级菜单

    /*↓ ↓ ↓ ↓ 话费、机票、电影票、游戏 ↓ ↓ ↓ ↓*/
    var amo1 = byClass('m-r-amolist')[0];
    var amo2 = byClass('m-r-amolist2')[0];
    var a_list = amo1.children;
    var a4_list = [a_list[0],a_list[1],a_list[2],a_list[3]];
    var lis = byClass('list2-tit')[0].children;
    function appear () {//m-r-amolist2出现
        amo1.onmouseover = function (ev) {
            var Eve = ev||window.event;
            var target = Eve.target||srcElement;
            var from = Eve.fromElement||Eve.relatedTarget;
            while (from) {
                if (from == this) {return false;}
                from = from.parentNode;
            }
            var boxs = document.getElementsByClassName('bill');
            var tit = document.getElementsByClassName('bill-tit');
            for (var i = 0; i < a4_list.length; i++) {
                if (target == a4_list[i]) {
                    var tits = tit[i].children;
                    lis[i].className = 'list2-tit-sel';
                    boxs[i].style.display = 'block';
                    //m-r-amolist缓上
                    var t = amo2.offsetTop;
                    var step = 15, eveystep = t/15;
                    var timer = setInterval(function(){
                        step--;
                        if (step <= 0) {clearInterval(timer);step = 0;};
                        t-=eveystep;
                        amo2.style.top = t + 'px';
                    }, 30);
                }else {
                    lis[i].className = '';
                    boxs[i].style.display = 'none';
                }
                lis[i].onmouseover = function () {//m-r-amolist2盒子上方tap切换
                    for (var z = 0; z < lis.length; z++) {
                         if(lis[z] == this){
                            lis[z].className = 'list2-tit-sel';
                            boxs[z].style.display = 'block';
                         }else {
                            lis[z].className = '';
                            boxs[z].style.display = 'none';
                         }
                     }
                }
                ;(function(){//m-r-amolist2盒子内tap切换
                    var insidebox = getClass(boxs[i],'bill-1');
                    var tits = tit[i].children;
                    for (var j = 0; j < tits.length; j++) {
                        tits[j].onmouseover = function () {
                            for (var j = 0; j < tits.length; j++) {
                                if (tits[j] == this) {
                                        tits[j].className = 'bill-tit-sel';
                                        insidebox[j].style.display = 'block';
                                }else {
                                    tits[j].className = '';
                                    insidebox[j].style.display = 'none';
                                }
                            }
                        }
                    }
                })();
                var outClose = byClass('bill-clo');
                outClose[i].onclick = function () {//为m-r-amolist2添加关闭时间
                    amo1.onmouseover = function () {
                        amo1.onmouseout = appear();
                    };
                    var t = 0;
                    var step = 15, eveystep = amo2.offsetHeight/15;
                    var timer2 = setInterval(function(){//m-r-amolist2缓出
                        step--;
                        if (step <= 0) {clearInterval(timer2);step = 0;};
                        t+=eveystep;
                        amo2.style.top = t + 'px';
                    }, 30);
                    ;
                }
            }
        }
    }
    appear();
    /*↑ ↑ ↑ ↑ 话费、机票、电影票、游戏 ↑ ↑ ↑ ↑*/

    imgOpMove ('m-i-among','m-i-sider');//图片切换1(透明度)
    imgMove ('m-t-out');//图片切换2

    var main = document.getElementById('main');
    var floorjump = byClass('floor-jump')[0];
    ;(function () {
        window.onscroll = function () {//触发滚动条
            var downlist = byClass('m-i-downlist');
            var mainTop = offsetL(main).top;
            var f1 = document.getElementById('f1');
            var sto = document.body.scrollTop||document.documentElement.scrollTop;
            if (sto >= mainTop) {
                for (var i = 0; i < downlist.length; i++) {
                    downlist[i].style.top = sto - mainTop + 'px';
                }
            } else {
                for (var i = 0; i < downlist.length; i++) {
                    downlist[i].style.top = '-1px';
                }
            };
            if (sto >= offsetL(f1).top) {
                floorjump.style.display = 'block';
                floorjump.style.left = offsetL(main).left - floorjump.clientWidth + 'px';
            }else {
                floorjump.style.display = '';
            }
            var btn = document.getElementById('returnTop');
            var timer = null,step = 0;
            btn.onclick = function () {//返回顶部
                var start = sto,end = sto;
                timer = setInterval(function () {
                    step++;
                    if (step==20) {clearInterval(timer);}
                    start -= end/20;
                    document.body.scrollTop = start;
                    document.documentElement.scrollTop = start;
                }, 30);
            }
            function floorScroll (floorNum) {
                var floor = document.getElementById('f'+floorNum);
                var floorNext = document.getElementById('f'+(floorNum+1)) ? document.getElementById('f'+(floorNum+1)) : null;
                var floorIcon = byClass('floor-icon');
                var floorSp = byClass('floor-jump')[0].getElementsByTagName('span');
                if (sto >= offsetL(floor).top-floor.offsetHeight/2) {
                    for (var i = 0; i < floorSp.length; i++) {
                        if (i == floorNum-1) {
                            floorSp[i].style.display = 'none';
                            floorSp[i].parentNode.className = 'c-red';
                        }else {
                            floorSp[i].style.display = '';
                            floorSp[i].parentNode.className = '';
                        }
                    }
                    if (floorNext != null && sto <=offsetL(floorNext).top) {
                        var rpIconH = 0;
                        var timer = setInterval(function () {
                            rpIconH++;
                            for (var i = 0; i < floorSp.length; i++) {
                                if (i == floorNum) {
                                    floorIcon[i].style.height = rpIconH + 'px';
                                } else {
                                    floorIcon[i].style.height = 0;
                                }
                            }
                            if (rpIconH >= nextNode(floorIcon[floorNum]).offsetHeight) {
                                clearInterval(timer);
                            }
                        }, 30);
                    }
                }
            }
            floorScroll(0);
            floorScroll(1);
            floorScroll(2);
            floorScroll(3);
            floorScroll(4);
            floorScroll(5);
            floorScroll(6);
            floorScroll(7);
            floorScroll(8);
            floorScroll(9);
            floorScroll(10);
            floorScroll(11);
            floorScroll(12);
        }
    })();
    ;(function () {
        window.onresize = function () {//窗口大小发生改变时
            var floorjumpL = offsetL(main).left - floorjump.clientWidth;
            floorjump.style.left = floorjumpL + 'px';
        }
    })();

    /*↓ ↓ ↓ ↓ ↓ ↓  楼层  ↓ ↓ ↓ ↓ ↓ ↓*/
    mouseOverOut ('f-r1-tap','m-i-page');//1-12F换图片中左右按钮
    floorImgMove(1);//1F 大图滚动
    floorDisplay ('f1');//1F TAP切换页
    floorImgMove(2);//2F 大图滚动
    floorDisplay ('f2');//2F TAP切换页
    floorImgMove(3);//3F 大图滚动
    floorDisplay ('f3');//3F TAP切换页
    floorImgMove(4);//4F 大图滚动
    floorDisplay ('f4');//4F TAP切换页
    floorImgMove(5);//5F 大图滚动
    floorDisplay ('f5');//5F TAP切换页
    floorImgMove(6);//6F 大图滚动
    floorDisplay ('f6');//6F TAP切换页
    floorImgMove(7);//7F 大图滚动
    floorDisplay ('f7');//7F TAP切换页
    floorImgMove(8);//8F 大图滚动
    floorDisplay ('f8');//8F TAP切换页
    floorImgMove(9);//9F 大图滚动
    floorDisplay ('f9');//9F TAP切换页
    floorImgMove(10);//10F 大图滚动
    floorDisplay ('f10');//10F TAP切换页
    floorImgMove(11);//11F 大图滚动
    floorDisplay ('f11');//11F TAP切换页
    floorImgMove(12);//12F 左边大图滚动
    floorImgMove(13);//12F 右边大图滚动
    ;(function () {//热门晒单自动滚动
        var out = byClass('d-out')[0];
        var inner = out.getElementsByTagName('ul')[0];
        var lis = inner.getElementsByTagName('li');
        var liH = lis[0].offsetHeight + 25;
        var v = 0,timer1 = null,timer2 = null;
        var firstLi = inner.children[0].cloneNode(true);
        var twoLi = inner.children[1].cloneNode(true);
        var lastLi = inner.children[inner.children.length-1].cloneNode(true);
        inner.appendChild(firstLi);
        inner.appendChild(twoLi);
        inner.insertBefore(lastLi, inner.children[0]);
        out.scrollLeft = liH;
        ;(function () {
            timer1 = setInterval(function() {
                v++;
                if (v >= lis.length - 1) {
                    v = 2;
                    out.scrollTop = liH;
                };
                Move();
            },2000)
        })();
        function Move () {
            clearInterval(timer2);
            var start = out.scrollTop;
            var end = liH*v;
            var step = 0;
            var eveystep = (end - start)/20;
            timer2 = setInterval(function() {
                step++;
                if (step >= 20) {
                    step = 0;
                    clearInterval(timer2);
                }
                start += eveystep;
                out.scrollTop = start;
            }, 20);
        }
    })();
    //点击对应楼层缓慢滚到对应楼层
    var jumpNum = floorjump.children;
    ;(function fjump () {
        floorjump.onclick = function(ev){
            floorjump.onclick = null;//防止连续点击
            var Eve = ev||window.event;
            var target = Eve.target||Eve.srcElement;
            var sto = document.body.scrollTop||document.documentElement.scrollTop;
            if (target.nodeName == 'A') {
                var j = index(target,jumpNum) + 1;
                var fNum = document.getElementById('f' + j);
                var fNumTop = offsetL(fNum).top,step = 0;
                var start = sto,end = sto - fNumTop;
                timer = setInterval(function () {
                    step++;
                    if (step==20) {
                        clearInterval(timer);
                        fjump();
                    }
                    start -= end/20;
                    document.body.scrollTop = start;
                    document.documentElement.scrollTop = start;
                }, 30);
            };
        }
    })();
    /*楼层左边的白条闪过*/
    for (var i = 0; i < 13; i++) {
        ;(function () {
            var floorLeft = byClass('f-con-left')[i];
            floorLeft.onmouseover = function (ev) {
                var Eve = ev||window.event;
                var from = Eve.fromElement||Eve.relatedTarget;
                while (from) {
                    if (from == this) {return false;}
                    from = from.parentNode;
                }
                //创建遮罩
                var fLeftMask = document.createElement('div');
                //为遮罩设置CSS属性
                fLeftMask.style.cssText = 'width:10px;height: 5000px;background: #FFF;opacity: 0.35;position: absolute;left: -10px;z-index: 1000;transform: rotate(30deg);transform-origin: 0 0';
                //插入创建好的遮罩
                floorLeft.appendChild(fLeftMask);
                //遮罩移动
                var l = floorLeft.offsetWidth/2,t = -floorLeft.offsetHeight/2;
                var timer = setInterval(function () {
                    l+=10;
                    t+=10;
                    if (l >= floorLeft.offsetWidth*2.1) {clearInterval(timer);}
                    fLeftMask.style.left = l + 'px';
                    fLeftMask.style.top = t + 'px';
                }, 10)
                //鼠标离开移除遮罩层
                this.onmouseout = function (ev) {
                    var Eve = ev||window.event;
                    var to = Eve.toElement||Eve.relatedTarget;
                    while (to) {
                        if (to == this) {return false;}
                        to = to.parentNode;
                    }
                    floorLeft.removeChild(fLeftMask);
                    clearInterval(timer);
                };
            };
        })();
    }
    /* ↑ ↑ ↑ ↑ ↑ ↑  楼层  ↑ ↑ ↑ ↑ ↑ ↑*/



    var a = document.getElementsByTagName('a');
    for (var i = 0; i < a.length; i++) {//给每个a标签加空链接
        if (a[i].getAttribute('href')=='#') {
            a[i].setAttribute('href','javascript:void(0)');
        }
    }
}