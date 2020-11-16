/**
 * 单元素的匀速运动
 * @param obj  哪一个元素的运动
 * @param attr 具体元素运动的属性
 * @param step 运动的步长
 * @param target 运动的目标点
 * @param time 秒数（s）
 */
function move(obj,attr,step,target,time){
    //开启定时器
    var timer = setInterval(function(){
        //非行间样式
        //初始位置+步长= 每一次运动的位置值
        var start = parseInt(getStyle(obj,attr)) + step;
        //设置边界
        if(start>=target){
            start = target;
        }
        obj.style[attr] = start + "px";
        if(start==target){
            //停止定时器
            clearInterval(timer);
        }
    },time);
}

/**
 * 单元素的缓冲运动
 */
var timer = null;
function BufferMove(obj,attr,target){
    //清除之前运动的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        //判断如果属性为不透明度
        if(attr=="opacity"){
            var start = parseFloat(getStyle(obj,attr) * 100);
        }else{
            var start = parseInt(getStyle(obj,attr)); 
        }
        var speed = (target - start) / 10; 
        speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
        if(attr=="opacity"){
            obj.style[attr] = (start+speed)/100;
        }else{
            obj.style[attr] = start + speed + "px"
        }
        if(start==target){
            clearInterval(obj.timer);
        }
    },100)

}
/**
 * 多物体的多属性运动
 * @param obj 哪一个元素在发生运动
 * @param json 对象
 * @param fun 回调函数
 */
function BufferJSON(obj,json,fun){
    //清除之前运动的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        //获取对象中的每一个值
        //for、while、do while、forEach、for in
        var tag = true;
        for(var attr in json){
            // console.log(attr) //属性 width  height
            // console.log(json[attr])  //属性值
            //多属性的判断条件  假设都达到了目标点
            if(attr=="opacity"){
                var start = parseFloat(getStyle(obj,attr) * 100);
            }else{
                var start = parseInt(getStyle(obj,attr)); 
            }
            var speed = (json[attr] - start) / 10; 
            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
            if(attr=="opacity"){
                obj.style[attr] = (start+speed)/100;
            }else{
                obj.style[attr] = start + speed + "px"
            }
            // if(start==json[attr]){
            //     clearInterval(obj.timer);
            // }
            if(start!=json[attr]){
                 tag = false;
            }
        }
        //判断是不是所有的属性值都达到了目标点
        if(tag==true){
            clearInterval(obj.timer);
            //再次调用回调函数
            fun&&fun();
        }
    },100)
}