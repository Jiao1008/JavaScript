"use strict";

//一个动画函数

/*
    参数：
        obj: 要执行动画的对象
        attr: 要修改动画样式  left top width height
        target: 执行动画的目标位置
        speed: 速度(正数向右，负数向左)
        callback: 将在动画执行完毕后调用
*/
function move(obj, attr, target, speed, callback) {
  //关闭上一个定时器
  clearInterval(obj.timer); //获取元素目前的位置

  var current = parseInt(getStyle(obj, attr)); //判断速度的正负值
  //如果从0向1000移动，speed为正，反之为负

  if (current > target) {
    //此时速度应为负
    speed = -speed;
  } //开启一个定时器，用来执行动画效果
  //向执行动画的对象中添加对象


  obj.timer = setInterval(function () {
    //获取box1原来的值
    var oldVal = parseInt(getStyle(obj, attr)); //在旧值的基础上增加

    var newVal = oldVal + speed; //当元素移动到1000像素时停止
    //向左移动时，需要判断newVal的值是否小于target 0
    //向右移动时，需要判断newVal的值是否大于target 1000

    if (speed < 0 && newVal < target || speed > 0 && newVal > target) {
      newVal = target;
    } //将新值设置给box1


    obj.style[attr] = newVal + "px"; //当元素移动到target时，停止执行动画

    if (newVal == target) {
      //达到目标，关闭定时器
      clearInterval(obj.timer); //动画执行完毕，调用回调函数
      //如果有，则执行，没有就不执行

      callback && callback();
    }
  }, 30);
} //获取元素样式


function getStyle(obj, name) {
  if (window.getComputedStyle) {
    //正常浏览器
    return window.getComputedStyle(obj, null)[name];
  } else {
    // IE8
    return obj.currentStyle(name);
  }
}