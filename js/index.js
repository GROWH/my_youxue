
window.onload=function(){
    CreateAjax({
        "type": "get",
        "url": "index.json",
        "success": function (data) {
            // console.log(JSON.parse(data));
            nav(JSON.parse(data));
            show(JSON.parse(data));
            hott(JSON.parse(data));
            jingpin(JSON.parse(data));
            free(JSON.parse(data));
            jiuye(JSON.parse(data));
            frendly(JSON.parse(data));

    
        }
    }) 
    // footer导航条整体效果
    function nav(data){
        // 导航栏二级菜单
        //1---- 获取一级菜单
        var box_list = document.getElementsByClassName("box_list")[0];
        var str="";
        var str1=""
        var str2=""
        for(var i =0;i<data.nav.length;i++){
                str+="<li><a href=\"#\" class=\"avtive\">"+data.nav[i].title+"</a></li>"
            if(data.nav[i].child){
                str1+="<ul><li><a href=\"#\">"+data.nav[i].child.title1+"</a></li><li><a href=\"#\">"+data.nav[i].child.title2+"</a></li></ul>"
            }
            if(data.nav[i].childe){
                str2+="<ul class=\"ul2\"><li class=\"li2\"><img src=\""+data.nav[i].childe.img+"\" alt=\"\"><p><span>扫码下载</span><span>IT优学APP</span></p></li></ul>"
            } 
            
            
            
        }
        // 2-----获取到下面所有的li标签
        var child = box_list.children;
        box_list.innerHTML = str;
        var img = document.createElement("img");
        img.className="dian"
        img.src=data.nav[1].child.img
        child[1].appendChild(img);
        child[1].innerHTML+=str1;
        child[6].innerHTML+=str2;

        // 3--每一个一级菜单 都需要鼠标移入移出
        // console.log(child);
        for(var i=0;i<child.length;i++){
            child[i].onmouseover = function(){
                    var ull = this.getElementsByTagName("ul")[0];
                    var aa = this.getElementsByTagName("a")[0]; 
                    aa.className = "active";
                if(ull!=undefined){
                    ull.style.display="block";     
                }   
            }
            child[i].onmouseout = function(){
                var ull = this.getElementsByTagName("ul")[0];
                var aa = this.getElementsByTagName("a")[0]; 
                aa.className = "";
                if(ull!=undefined){
                    ull.style.display="none";
                }
            }
        } 

        var search = document.getElementsByClassName("search")[0];
        var input = search.getElementsByTagName("input")[0];
        var denglu = document.getElementsByClassName("denglu");

        for(var i = 0;i<denglu.length;i++){
            // 登录和注册鼠标移入后显示下划线
            denglu[i].onmouseover = function(){
                var a1 = this.getElementsByTagName("a")[0];
                // console.log(a1);
                a1.className = "active";
            }
            // 登录和注册鼠标移出后隐藏下划线
            denglu[i].onmouseout = function(){
                var a1 = this.getElementsByTagName("a")[0];
                a1.className = "";
            }
        }
            // 搜索图标鼠标移入显示input透明度为1
            var img = search.getElementsByTagName("img");
            img[0].onmouseover = function(){
                input.style.opacity = 1;
            }
            // 搜索图标鼠标在bannerr点击时让input透明度为0
            var bannerr = document.getElementsByClassName("bannerr")[0];
            bannerr.onclick = function(){
                input.style.opacity = 0;
            }
            // 扫码图标在鼠标移入后显示二级菜单
            var d1 = document.getElementsByClassName("d1")[0];
            img[2].onmouseover = function(){
                d1.style.display = "block";
            }
            // 扫码图标在鼠标移出后隐藏二级菜单
            img[2].onmouseout = function(){
                d1.style.display = "none";
            }            
}


    // 轮播图页面整体效果
        function show(data){
            var banner = document.getElementById("banner");
            var ul = banner.getElementsByTagName("ul")[0];
           
            var html=template("lunbo",data.banner)
            ul.innerHTML = html;
            // console.log(ul);
            

            var p = document.getElementById("p");
            var span = banner.getElementsByTagName("span");
            var left = document.getElementById("left")
            var right = document.getElementById("right")
            var n = 0;


     
            var str1 = ""
            console.log(data.banner.dataArr.length);
            
            for (var i = 0; i < data.banner.dataArr.length; i++) {
            //     str += "<li><img src=\"" + data.banner[i] + "\"/></li>";
                str1 += " <span></span>";
            //     // console.log(str1);
            }
            // ul.innerHTML = str;
            p.innerHTML = str1;
            span[0].className = "active"

            

        // 点击小圆点实现图片变换
            for (var i = 0; i < span.length; i++) {
                // console.log(span.length);
                (function (index) {
                // span[i].index = i;
                     span[i].onclick = function () {
                        // console.log(ul);

                        for (var j = 0; j < span.length; j++) {
                            span[j].className = ""
                        }
                        this.className = "active";
                        // n=this.index;
                        // console.log(this.index);
                        move(ul, "left", 40, -1399 *index,10);
                        //自动运行的定时器的下标和点击span的下标要一致
                        n = index;
                    }
                })(i)
            }

        // 图片自动轮播
        var timer = setInterval(autoNext,3000);
        function autoNext(){
            // n++;
            // if(n==data.banner.length){
            //     n=0;
            // }
            // for(var i=0;i<span.length;i++){
            //     span[i].className=""
            // }
            // span[n].className="active"
            // move(ul, "left", 40, -1399 *n,10);
            fn();
        }
        // 鼠标移入轮播图banner位置轮播效果停止,并且显示左右按钮
        banner.onmouseover = function () {
            clearInterval(timer);
            left.style.display = "block"
            right.style.display = "block"
        }
           // 鼠标移出轮播图banner位置轮播效果开始，并且隐藏左右按钮
           banner.onmouseout = function () {
            timer = setInterval(autoNext, 3000)
            left.style.display = "none"
            right.style.display = "none"
        }
        // 点击左边按钮实现图片轮播和小圆点变换
        left.onclick = function () {
            n--;
            if (n < 0) {
                n =  data.banner.dataArr.length - 1;
            }
            for (var i = 0; i < span.length; i++) {
                span[i].className = ""
            }
            span[n].className = "active";
            move(ul, "left", 40, -1399 * n, 10);
        }

         // 点击右边按钮实现图片轮播和小圆点变换
         right.onclick = function(){
            // n++;
            // if(n==data.banner.length){
            //     n=0;
            // }
            // for(var i=0;i<span.length;i++){
            //     span[i].className=""
            // }
            // span[n].className="active"
            // move(ul, "left", 40, -1399 *n,10);
            fn();
        }

        function fn() {
            n++;
            if (n ==  data.banner.dataArr.length) {
                n = 0;
            }
            for (var i = 0; i < span.length; i++) {
                span[i].className = ""
            }
            span[n].className = "active";
            move(ul, "left", 40, -1399 * n, 10);
        }


    }


     // 热门直播部分选项卡开始
    function hott(data){
        // 左边部分
        var rmzole = document.getElementsByClassName("rmbox_left")[0];
        // 右边部分
        var rmzori = document.getElementsByClassName("rmbox_right")[0];
        
        var htmle = template("r",data.hot)
        var htmlri = template("rm",data.hot)

        rmzole.innerHTML = htmle;
        rmzori.innerHTML = htmlri;

        var rmbox_left = document.getElementsByClassName("rmbox_left")[0];
        var left_5 = document.getElementsByClassName("left_5");
        var zhezhao = rmbox_left.getElementsByClassName("zhezhao")[0];
        var aim1 = zhezhao.getElementsByTagName("a")[0]
        var rmbox_right = document.getElementsByClassName("rmbox_right")[0];
        var li = rmbox_right.getElementsByTagName("li");
        left_5[0].id="actt"

        //鼠标移入效果
        for(var i=0;i<li.length;i++){
            li[i].index=i;
                li[i].onmouseover = function(){
                    for(var j=0;j<li.length;j++){
                        li[j].className="";
                        left_5[j].id=""
                    }
                    this.className="active";
                    left_5[this.index].id="actt"
                }
        }

    }


// 精品网课部分开始
  function jingpin(data){ 
    var jpwk = document.getElementsByClassName("jpwk")[0];
    var html = template("a",data.main1);
    jpwk.innerHTML = html 
    
    var jingpin_box = document.getElementsByClassName("jingpin_box");
    var tab = document.getElementsByClassName("tab")[0];
    var ajpwk = tab.getElementsByTagName("a");
    jingpin_box[0].id = "active1"
        for(var i=0;i<ajpwk.length;i++){
            ajpwk[i].index = i;
            ajpwk[i].onmouseover = function(){
                for(var j=0;j<ajpwk.length;j++){
                    ajpwk[j].className = "";
                    jingpin_box[j].id = "";
                }
                this.className = "active";
                jingpin_box[this.index].id = "active1";
            }
        }

  }
    

    // 免费课程部分开始 
    function free(data){
        var mfkc = document.getElementsByClassName("mfkc")[0];
        var html = template("b",data.main2) 
        mfkc.innerHTML = html
    
        var mfkc_box = document.getElementsByClassName("mfkc_box");
        var tab1 = document.getElementsByClassName("tab1")[0];
        var amfkc = tab1.getElementsByTagName("a");
        mfkc_box[0].id = "active22"

        for(var i=0;i<amfkc.length;i++){
            amfkc[i].index = i;
            amfkc[i].onmouseover = function(){
                for(var j=0;j<amfkc.length;j++){
                    amfkc[j].className = "";
                    mfkc_box[j].id = "";
                }
                this.className = "active";
                mfkc_box[this.index].id = "active22";
            }
        }
    }
    

    // 就业面授班部分开始
    function jiuye(data){
        var jyms = document.getElementsByClassName("jyms")[0];
        var html  = template("c",data.main3)
        jyms.innerHTML = html;

        var jyms_box = document.getElementsByClassName("jyms_box"); 
       var tab2 = document.getElementsByClassName("tab2")[0];
       var ajyms = tab2.getElementsByTagName("a");
       jyms_box[0].id = "active33"
        for(var i=0;i<ajyms.length;i++){
            ajyms[i].index = i;
            ajyms[i].onmouseover = function(){
                for(var j=0;j<ajyms.length;j++){
                    ajyms[j].className = "";
                    jyms_box[j].id = "";
                }
                this.className = "active";
                jyms_box[this.index].id = "active33";
            }
        }
    }

    
// 友情链接部分开始
function frendly(data){
    var sort= document.getElementsByClassName("sort")[0];
    var html =template("d",data.frendly);
    sort.innerHTML = html;

    var sort_title = document.getElementsByClassName("sort_title")[0];
    var sort_title_li = sort_title.getElementsByTagName("li");
    var sort_con = document.getElementsByClassName("sort_con")[0];
    var sort_con_ul = sort_con.getElementsByTagName("ul");
    sort_con_ul[0].className = "active";


    for(var i=0;i<sort_title_li.length;i++){
        sort_title_li[i].index = i;
        sort_title_li[i].onmouseover = function(){
            for(var j=0;j<sort_title_li.length;j++){
                sort_title_li[j].className = "";
                sort_con_ul[j].className="";
            }
            this.className = "active";
            sort_con_ul[this.index].className="active";
        }
    }
}


 // 回到顶部开始
    var top = document.getElementById("top");
    var topa = top.getElementsByTagName("a")
  window.onscroll = function(){
        var ttop = document.documentElement.scrollTop || document.body.scrollTop;
        if(ttop>=460){
            top.style.display = "block"
        }else{
            top.style.display = "none"
        }
        
        top.onclick = function(){
            document.documentElement.scrollTop=0
        }
  }
  
  //   右侧微信、微博、手机的固定定位开始
  var wechat_list = document.getElementsByClassName("wechat_list")[0];
  var wechat_child = wechat_list.children;
  var arr = ['./img/dsh_h_07.jpg','./img/dsh_h_05.jpg','./img/dsh_h_03.jpg']
  var arr1 = ['./img/icon_01.png','./img/icon_02.png','./img/icon_03.png']

  for(var i=0;i<wechat_child.length;i++){
    wechat_child[i].index=i;
    wechat_child[i].onmouseover = function(){
        var wechat_img = this.firstElementChild || this.firstChild
        var d = this.getElementsByClassName("d")[0];
            d.style.display = "block" 
            wechat_img.src=arr[this.index];
            wechat_img.style.borderRadius="50%"
    }
    wechat_child[i].onmouseout = function(){
        var wechat_img = this.firstElementChild || this.firstChild
        var d = this.getElementsByClassName("d")[0];
            d.style.display = "none"
            wechat_img.src=arr1[this.index];
    } 
}



}
