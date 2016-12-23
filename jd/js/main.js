//兼容各浏览器的class获取(全局获取)
function byClass(classn){
    var tags=document.all ? document.all : document.getElementsByTagName('*');
    var arr=[];
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].className.indexOf(classn)!=-1) {
            arr.push(tags[i]);
        }
    };
    return arr;
}
//兼容各浏览器的class获取(局部获取)
function getClass(parent,classn){
    var tags=parent.all?parent.all:parent.getElementsByTagName('*');
    var arr=[];
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].className.indexOf(classn)!=-1) {
            arr.push(tags[i]);
        }
    };
    return arr;
}
function index(current, obj){//获取数组元素的索引值
    for (var i = 0; i < obj.length; i++) {
        if (obj[i] == current) {return i;}
    }
}
function getStyle(obj,oStyle){//获取非行间元素样式
    if (obj.currentStyle) {
        return obj.currentStyle[oStyle];
    } else{
        return getComputedStyle(obj,null)[oStyle];
    };
}
function nextNode(obj){//获取下一个兄弟节点
    if (obj.nextElementSibling) {
        return obj.nextElementSibling;
    } else{
        return obj.nextSibling;
    };
}
function preNode(obj){//获取上一个兄弟节点
    if (obj.previousElementSibling) {
        return obj.previousElementSibling;
    } else{
        return obj.previousSibling;
    };
}
function firstNode(obj){//获取第一个子节点
    if (obj.firstElementChild) {
        return obj.firstElementChild;//非IE678支持
    } else{
        return obj.firstChild;//IE678支持
    };
}
function lastNode(obj){//获取最后一个子节点
    if (obj.lastElementChild) {
        return obj.lastElementChild;//非IE678支持
    } else{
        return obj.lastChild;//IE678支持
    };
}
//返回顶部
function moveWindowtop (buttonId) {
    window.onscroll=function () {
        var btn = document.getElementById(buttonId);
        var sto = document.body.scrollTop||document.documentElement.scrollTop;
        var timer = null,step = 0;
        btn.onclick = function () {
            var start = sto,end = sto;
            sstep = 0;
            timer = setInterval(function () {
                step++;
                if (step==20) {clearInterval(timer);}
                start -= end/20;
                document.body.scrollTop = start;
                document.documentElement.scrollTop = start;
            }, 30)
        }
    }
}
//判断浏览器
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf("Opera") != -1) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") != -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") != -1){
      return "Chrome";
    }
    if (userAgent.indexOf("Safari") != -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return "IE";
    }; //判断是否IE浏览器(IE11以下不包括11)
}
//获取对象到body的距离
function offsetL (obj) {
    var l = 0,t = 0;
    while (obj) {
        l += obj.offsetLeft;
        t += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return{left:l,top:t};
}
function addEvent(obj,type,fn){//添加事件监听
    if (obj.addEventListener) {
        obj.addEventListener(type,fn,false);
    } else{
        obj.attachEvent('on'+type,fn);
    };
}
function removeEvent(obj,type,fn){//删除事件监听
    if (obj.removeEventListener) {
        obj.removeEventListener(type,fn,false);
    } else{
        obj.detachEvent('on'+type,fn);
    };
}