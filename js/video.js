window.onload = function(){
    CreateAjax({
        "type": "get",
        "url": "index.json",
        "success": function (data) {
            // console.log(JSON.parse(data));
            mulu(JSON.parse(data));
            xiangguan(JSON.parse(data));
        }
    }) 


// footer导航条整体效果
// 导航栏二级菜单
//1---- 获取一级菜单
var box_list = document.getElementsByClassName("box_list")[0];
// 2-----获取到下面所有的li标签
var child = box_list.children;
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



    // 目录部分（视频播放窗口）
    function mulu(data){
    var conn_right = document.getElementsByClassName("conn_right")[0];
    var html = template("mulu",data.catalogue);
    conn_right.innerHTML = html;

    // 视频播放控件
    var play01 = document.getElementsByClassName("play01")[0];
    var play02 = document.getElementsByClassName("play02")[0];
    var play03_1 = document.getElementsByClassName("play03_1")[0];
    var play03 = document.getElementsByClassName("play03")[0];
    var paly03_2 = document.getElementsByClassName("paly03_2")[0];
    var play04 = document.getElementsByClassName("play04")[0];
    var play05 = document.getElementsByClassName("play05")[0];
    // console.log(paly03_2);
    

    // 播放和暂停按钮的切换
      //单个元素的状态切换放在全局变量上
    var tag = true; 
    play04.innerText = toTime(video.duration)
    play01.onclick = function(){
        if(tag){
             //首次点击是从暂停键=>播放键
            this.id = "play_b"
             //视频的播放
            video.play();
            //切换状态
            tag = false;
        }else{
            this.id = ""
            //视频暂停
            video.pause();
            tag = true;
        }
    }

    //视频长度的显示
    video.oncanplay = function(){
        //视频的总长度来显示到对应的标签
        play04.innerText = toTime(video.duration)
        // console.log(play04);
        
    }
    var str = "";
    function toTime(time){
        
        //总秒数=>小时、分钟、秒
        var hours = padTime(parseInt(time/3600));
        var mis = padTime(parseInt(time%3600/60));
        var sec = padTime(parseInt(time%60));
        str = hours+':'+mis+":"+sec
        return str;
    }
    //前导0
    function padTime(value){
        return value<10?'0'+value:value;
    }

      //全屏功能
      play05.onclick = function(){
        if(video.requestFullscreen){
            video.requestFullscreen();
        }
    }

    //视频播放显示时间
    video.ontimeupdate = function(){
        play02.innerText =  toTime(video.currentTime)
        //实时的播放位置 = 当前播放的时间*播放条的总长度 / 视频播放的总长度
        play03.style.width = video.currentTime * 550 / video.duration + "px"
        paly03_2.style.left = video.currentTime * 550 / video.duration + "px"
    }


    // 右侧选项卡
    var arrm = ['./media/【高能踩点】战场女武神.mp4','./media/Shiranui_final.mp4','./media/cg07.mp4','./media/55f97b19-da62-4e59-aced-13cd074f5134.mp4','./media/11d3c63e-d087-48dc-a781-a0e63bd80a91.mp4','./media/aaaaa.mp4']
    var arrm1 = ['./img/11.jpg','./img/33.jpg','./img/44.jpg','./img/55.jpg','./img/66.jpg','./img/77.jpg']
     var span1 = document.getElementById("span1")
    var vide = document.getElementById("video");
   
    var right_li = conn_right.getElementsByTagName("li");
    var li_img = conn_right.getElementsByTagName("img");
    right_li[0].className = "active"

    
    for(var i=0;i<right_li.length;i++){
       (function(index){
        right_li[i].onclick = function(){
            for(var j=0;j<right_li.length;j++){
                right_li[j].className = ""
                li_img[j].src ="./img/shipin01.png"
            }
            
            vide.src= arrm[index]
            vide.poster= arrm1[index]
            right_li[index].className = "active"
            li_img[index].src ="./img/shipin02.png"
            var str = right_li[index].innerText
            var str2 = str.substring(6)
            span1.innerText = "课件"+(index+1)+" : "+str2
            play03.style.width = 0 + "px"
            paly03_2.style.left = 0 + "px"
            if(play01.id=="play_b"){
                play01.id = ""
                tag=true;
            }
            
          }
        })(i)
    }

}



function xiangguan(data){
// 找到json文件中的第一组的八张图片
var d=data.main1.dataArr
var ss=d[0].data
// 按照上线时间进行降序排序
 ss.sort(function(x,y){
    return Date.parse(y.shangxian)-Date.parse(x.shangxian)
})
// 排完序返回的是一个数组，所以需要改成一个对象
var p={"pp":ss}
var html2=template("xiang1",p)
var ul_one=document.getElementById("ul_one")
ul_one.innerHTML=html2


}



// 发表留言
var xiangguan_con_right = document.getElementsByClassName("xiangguan_con_right")[0];
var btn1 = document.getElementById("btn1");
var inp = document.getElementById("inp");
var p1 = document.getElementById("p1");
var pingjia_con = document.getElementsByClassName("pingjia_con")[0];

btn1.onclick =function(){
    var value= inp.value;
   if(value==""){ 
        alert('请输入用户的评论')
    }else if(value.length>=200){
    alert("内容不能超过200个字")
    }else{
        var div = document.createElement("div");
        div.className = "pingjia_con_01";
        div.innerHTML = "<img src=\"./img/pingjia_logo.jpg\" alt=\"\"><span>匿名用户</span><img src=\"./img/zg_shipincz06.png\" alt=\"\"><p id=\"p1\">"+value+"</p><button class=\"btn2\">删除</button>  ";
    

        pingjia_con.appendChild(div)
        var btn2 = document.getElementsByClassName("btn2");   
        for(var i = 0 ; i < btn2.length;i++){
            btn2[i].onclick = function(){
                this.parentNode.remove();
            }
        }

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