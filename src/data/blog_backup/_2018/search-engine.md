---
title: 搜索引擎收录站点信息
pubDatetime: 2018-05-05T12:45:08Z
description: "今天探索了一下如何添加个人网站到百度和google搜索引擎中"
author: "James Chen"
tags: ["techniques", "website"]
categories: ["techniques"]
draft: false
---


今天探索了一下如何添加个人网站到百度和google搜索引擎中


## 测试一下有没有被收录
在百度和谷歌上分别搜索

```
site:james20141606.github.io
```

如果此前没有进行过操作，应该是搜不到的，并且搜索出来的结果含有搜索引擎提交入口

![Markdown](http://i4.fuimg.com/640680/f223a0faa2355b3b.png)

分别进入搜索引擎提交入口，添加域名，选择验证网站，有3种验证方式，这里采用HTML标签验证

感觉这个验证方法蛮有意思的
![Markdown](http://i4.fuimg.com/640680/358791ab5bafa1b2.png)

注意是放在themes/next/source下面，不是站点文件夹的source下面！

## 百度
[链接提交_加快网站内容抓取，快速提交数据工具_站长工具_网站支持_百度搜索资源平台](https://ziyuan.baidu.com/linksubmit/url)
~~目前看起来不需要验证？百度这样好吗，，，~~
看起来要在https://ziyuan.baidu.com/site/ 这里添加，百度的东西真的搞的很乱。

正常情况，是要等百度爬虫来爬到你的网站，才会被收录。但是github屏蔽了百度爬虫目前，所以我们要主动出击，我们自己把网站提交给百度。这就要使用到百度站长平台（就上面那个网站）

在上面页面填好域名，选择分类，然后验证方式和谷歌的非常相似。

![Markdown](http://i4.fuimg.com/640680/0a5700083829445b.png)



然后
## 打开Hexo主题配置文件，添加以下两行
```
google_site_verification: google5b248f7b86cbcee5.html
baidu-site-verification: 7Qj6Ob0N31
```

顺便还看到了Bing的，也可以搞一下。必应的用前面的方法直接搜自己的域名不行，要访问这里[必应 Bing - 将您的网站提交到必应](http://cn.bing.com/webmaster/submitsitepage.aspx)

[google站长工具](https://www.google.com/webmasters/tools)可以进一步设置。


## 添加站点地图
```
npm install hexo-generator-sitemap --save
npm install hexo-generator-baidu-sitemap --save
```

在博客的站点配置文件_config.yml中添加以下代码

```
# 自动生成sitemap
sitemap:
path: sitemap.xml
baidusitemap:
path: baidusitemap.xml
```

不添加也是可以的

在站点配置文件的# URL处填入你的主页地址就可以每次生成的时候自动填好地址了，如下：

```
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
# url: http://yoursite.com
url: http://hosea1008.coding.me
root: /
```


## 百度自动推送
Next主题有百度自动推送功能，将主题配置文件中的baidu_push设置为true，然后将/next/layout/_scripts文件夹下面的baidu-push.swig文件中的

```
<script type="text/javascript" async src="//push.zhanzhang.baidu.com/push.js">
</script>
```

```
<script>
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
</script>
```

貌似现在这个文件被移除了，先不折腾了


资源：
[hexo 我的使用总结 | 伤神的博客](http://www.shangyang.me/2016/12/16/hexo-base-concept/#%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E6%94%B6%E5%BD%95)
[Hexo+Next主题博客提交百度谷歌收录 | 大江东去](http://www.helloshawn.cn/2016/Hexo-Next%E4%B8%BB%E9%A2%98%E5%8D%9A%E5%AE%A2%E6%8F%90%E4%BA%A4%E7%99%BE%E5%BA%A6%E8%B0%B7%E6%AD%8C%E6%94%B6%E5%BD%95.html)
#网站


