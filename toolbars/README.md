# JsDemo
- 概述：
	使用字体文件做图标，维护方便;
	sass提取相关优势应用;
	使用:before、:after伪类方式，html简洁，css相对复杂;
	使用requirejs实现模块化;
	封装为jquery插件。

- 三种实现方式：CSS精灵、图标字体和伪类

- 用到的知识点

  - SASS

    1. 嵌套
    2. $变量
    3. @mixin 定义函数
    4. @import
    5. @extend 继承属性

  - RequireJs

    1. requirejs.config

       ```
       requirejs.config({  paths: {    jquery: 'jquery-1.11.3.min'  }});

       ```

    2. requirejs

       ```
       requirejs(['jquery', function ($) {  }]);

       ```

    3. define

       ```
       define(['jquery'], function ($) {  return {      };})

       ```

  - CSS3

    1. transition
    2. transform
    3. transform-origin

  - jQuery

    1. $.extend() ：opts替换ScrollTo.DEFAULTS里相同的key值，并生成到{}中，并返回合成值。

       ```javascript
       this.opts = $.extend({}, ScrollTo.DEFAULTS, opts);
       ```

    2. $.proxy() 用来修改函数执行时的上下文对象的.

       ```javascript
       this.$el.on('click', $.proxy(this._move, this));
       this.$el.on('click', $.proxy(this, "_move"));
       ```
        proxy(a,b)的参数有两种写法.
        第一种:a是一个function函数,b是这个函数的对象所有者.
        第二种:a是一个对象,b是一个字符串,是a的属性名.

    3. $.fn.extend()  jquery插件开发，封装

       ```javascript
       $.fn.extend({
         backtop: function (opts) {
           this.each(function () {
             new BackTop(this, opts);
           });
         }
         
         return this;
       })
       ```

       ​

​