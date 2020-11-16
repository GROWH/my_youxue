window.onload = function(){
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
    



    
    // 注册界面验证开始
    var form1 = document.getElementById("form1");
    var inp =  form1.getElementsByTagName("input")
    // var inp1 = form1.username;
    var inb = form1.getElementsByTagName("b");
    // var value = inp.value;
   


    // 手机号码验证
    inp[0].onblur = checkPhone;
    function checkPhone(){
            var pattern = /^1\d{10}$/;
            // 非空检测 
            if(this.value == ""){
                // console.log(inb[0]);
                inb[0].innerText= "请输入手机！"
                inb[0].style.color = "rgb(153, 153, 153)"
                return false;
                // 检测与pattern中是否一致（首位必须是1，长度11位，数字结尾）
            }else if(pattern.test(this.value)==false){
                inb[0].innerText= "账号格式不正确！"
                inb[0].style.color = "orange"
                return false;
               
            }else{
                inb[0].innerText= "√";
                inb[0].style.color = "orange"
            }
            return true;
    }



    // 密码验证
    inp[1].onblur = checkPwd ;
    function checkPwd(){
        var pattern = /^[A-Z][a-z0-9]{5,11}$/;
        // 非空检测 
        if(this.value == ""){
            // console.log(inb[0]);
            inb[1].innerText= "请输入密码"
            return false;
            // 检测与pattern中是否一致
        }else if(pattern.test(this.value)==false){
            inb[1].innerText= "6-20位且首位必须为大写字母！"
            inb[1].style.color = "orange"
            return false;
           
        }else if(this.value.length>=10){
             // inb[1].innerText= "√";
            inb[1].innerText= "√密码强度：强";
            inb[1].style.color = "orange"
        }else if(this.value.length>=8){
            inb[1].innerText= "√密码强度：中";
            inb[1].style.color = "orange"
        }else if(this.value.length>=6){
            inb[1].innerText= "√密码强度：弱";
            inb[1].style.color = "orange"

        }
        return true;
    
    }


    // 确认密码验证
    inp[2].onblur = checkPwd2;
    function checkPwd2(){
    // 非空检测 
        if(this.value == ""){
            // console.log(inb[0]);
            inb[2].innerText= "请输入密码"
            return false;
            // 检测与pattern中是否一致
            }else if(this.value!=inp[1].value){
                inb[2].innerText= "两次密码不一致！"
                inb[2].style.color = "orange"
                return false;
            }else if(this.value.length>=10){
            inb[2].innerText= "√密码强度：强";
            inb[2].style.color = "orange"
            }else if(this.value.length>=8){
            inb[2].innerText= "√密码强度：中";
            inb[2].style.color = "orange"

            }else if(this.value.length>=6){
            inb[2].innerText= "√密码强度：弱";
            inb[2].style.color = "orange"
            
            }
       return true;
    }
        




     // 点击验证码数字随机更换
     var ll8 = form1 .getElementsByClassName("ll8")[0]; 
     ll8.onclick =function(){
         ll8.innerText=randomCode()
     } 
    // 产生5位数字随机验证码
    function randomCode(){
        // abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
        var str = '0123456789';
        var str1 = "";
        for(var i=0;i<5;i++){
            var a = Math.floor(Math.random()*str.length);
            // console.log(a);
            str1+=str[a];
        }
        return str1;
    }

  
   
        
    // 验证码验证
    inp[3].onblur = checkCode;
    function checkCode(){  
        // 非空检测 
        if(this.value == ""){
            // console.log(inb[0]);
            inb[3].innerText= "请输入验证码"
            return false;
        }else if(this.value!=ll8.innerText){
            inb[3].innerText= "验证码不正确"
            inb[3].style.color = "orange"
            return false;
           
        }else {
            inb[3].innerText= "√";
            inb[3].style.color = "orange"

        }
        return true;

    } 
        


    // 注册成功并跳转登录界面
    var ll3 = form1.getElementsByClassName("ll3")[0];
    ll3.onclick =function(){ 
        if(checkPhone()&&checkPwd()&&checkPwd2()&&checkCode()){
             alert("注册成功")
             form1.submit();
        }else{
            alert("注册失败")
            return false;
            }
    }
       
    


    





            // for ( var j=0;j<inp.length;j++){
            //     inp[j].index = j;
            //     inp[j].onblur = function(){
            //         // var value = inp[this].value;
            //         if(this.value == ""){
            //             inb[this.index].innerText = arr[this.index]
            //         }

                   
                

            //     }
            // }
            






}