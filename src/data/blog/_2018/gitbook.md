---
title: "GitBook intro & Grandpa's Bio"
pubDatetime: 2018-05-04T02:01:38Z
description: "之前用过一些，比如： - 帮老板写过书里的一章(5.1 eMaize Challenge  · 生物信息学实践) - training课的一些notes(Introduction · Bioinfo Training - Shared - 2018)，后来又移到github的wiki上了(Home · lulab/training Wiki · GitHub) - 还把爷爷的回忆录也用markdown整理了一遍放到gitbook上(爷爷回忆录)，（一文多用，之前也已经放到blog上面了），排版比word辛辛苦苦排来排去随便一弄就全乱了是强太多了。"
author: "James Chen"
tags: ["techniques", "markdown", "syntax", "composing"]
categories: ["book"]
draft: false
---

## 写书必备的工具
GitBook是写书的必备工具，之所以比LaTeX强，在于GitBook有强大的后盾，不仅可以本地排版，还可以挂在gitbook网站上，还可以做一些嵌入自己网页的设计(借助github pages之类的)。可以说是非常有用了，这次梳理了一下gitbook尤其是本地版的适用，以排版爷爷的回忆录为例，回忆录的一系列文章也更新在了博客和gitbook页面。

之前用过一些，比如：
- 帮老板写过书里的一章([5.1 eMaize Challenge  · 生物信息学实践](https://lulab.gitbooks.io/bioinfo/content/5%E5%A4%A7%E6%95%B0%E6%8D%AE%E6%95%B4%E5%90%88----%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%E5%92%8C%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD/51.html))
- training课的一些notes([Introduction · Bioinfo Training - Shared - 2018](https://lulab.gitbooks.io/bioinfo-training-2018/content/))，后来又移到github的wiki上了([Home · lulab/training Wiki · GitHub](https://github.com/lulab/training/wiki))
- 还把爷爷的回忆录也用markdown整理了一遍放到gitbook上([爷爷回忆录](https://james20141606.gitbooks.io/grandpa-autobiography/content/))，（一文多用，之前也已经放到blog上面了），排版比word辛辛苦苦排来排去随便一弄就全乱了是强太多了。

最近gitbook正好做了一个重大的[改版](https://www.gitbook.com/ )，看起来是不仅希望大家写书，而是做一个更全面的平台？试用了一下，相当自动化和友好，看起来是希望大家以后写各种API的手册之类的都用它来做好了。

![Markdown](http://i4.fuimg.com/640680/36e1abf41b49870e.png)

当然gitbook有很差的缺点，就是实在太慢太慢，翻墙后还是慢，还好它有本地版的，可以在本地编辑好再同步。以及大多数人markdown本来就是在本地编好的，很多程序员可能还是在用命令行版本的gitbook。

因为网页版的没有办法调整下载的pdf的中文字体，而我想给爷爷的回忆录的pdf字体修改一下，于是还是得用命令行版的gitbook。

### 资源
找到的几个教程
[使用 | GitBook 简明教程](http://www.chengweiyang.cn/gitbook/basic-usage/README.html)
[Gitbook 的使用和常用插件](http://zhaoda.net/2015/11/09/gitbook-plugins/)
[使用 Gitbook 打造你的电子书 - 简书](https://www.jianshu.com/p/f38d8ff999cb)

## step by step 
gitbook 的基本用法非常简单，基本上就只有两步：
- 使用 gitbook init 初始化书籍目录
- 使用 gitbook serve 编译书籍
- 
### 初级

下面将结合一个非常简单的实例，来介绍 gitbook 的基本用法。
#### gitbook init
首先，创建如下目录结构：

```
$ tree book/
book/
├── README.md
└── SUMMARY.md
0 directories, 2 files
```

README.md 和 SUMMARY.md 是两个必须文件，README.md 是对书籍的简单介绍：
```
$ cat book/README.md 
# README
This is a book powered by [GitBook](https://github.com/GitbookIO/gitbook).
```

SUMMARY.md 是书籍的目录结构。内容如下：

```
$ cat book/SUMMARY.md 
# SUMMARY
* [Chapter1](chapter1/README.md)
  * [Section1.1](chapter1/section1.1.md)
  * [Section1.2](chapter1/section1.2.md)
* [Chapter2](chapter2/README.md)
```

创建了这两个文件后，使用 gitbook init，它会为我们创建 SUMMARY.md 中的目录结构。
```
$ cd book
$ gitbook init
$ tree
.
├── README.md
├── SUMMARY.md
├── chapter1
│   ├── README.md
│   ├── section1.1.md
│   └── section1.2.md
└── chapter2
    └── README.md
2 directories, 6 files
```


#### gitbook serve
书籍目录结构创建完成以后，就可以使用 gitbook serve 来编译和预览书籍了：

```
$ gitbook serve
Press CTRL+C to quit ...

Live reload server started on port: 35729
Starting build ...
Successfully built!

Starting server ...
Serving book on http://localhost:4000
```
gitbook serve 命令实际上会首先调用 gitbook build 编译书籍，完成以后会打开一个 web 服务器，监听在本地的 4000 端口。

现在，可以用浏览器打开 http://127.0.0.1:4000 查看书籍的效果，如下图：

![Markdown](http://i4.fuimg.com/640680/393c5bd3f8debba7.png)

现在，gitbook 为我们创建了书籍目录结构后，就可以向其中添加真正的内容了，文件的编写使用 markdown 语法，在文件修改过程中，每一次保存文件，gitbook serve 都会自动重新编译，所以可以持续通过浏览器来查看最新的书籍效果~

另外，用户还可以下载 gitbook 编辑器，做到所见即所得的编辑，如下图所示：

![Markdown](http://i4.fuimg.com/640680/18392c162ed87862.png)

Gitbook editor 就是gitbook的本地版本，对于gitbook这个反人类的老年网站还是有意义的，当然MWeb之类的markdown编辑器也够用了，轻量级使用感觉MWeb足够好了。

#### 常用命令
```
#install
sudo npm install gitbook-cli -g
gitbook -V
npm i ebook-convert  #solve warning:InstallRequiredError: "ebook-convert" is not installed.
gitbook init //初始化目录文件
gitbook serve
gitbook help //列出gitbook所有的命令
gitbook --help //输出gitbook-cli的帮助信息
gitbook build //生成静态网页
gitbook serve //生成静态网页并运行服务器
gitbook build --gitbook=2.0.1 //生成时指定gitbook的版本, 本地没有会先下载
gitbook ls //列出本地所有的gitbook版本
gitbook ls-remote //列出远程可用的gitbook版本
gitbook fetch 标签/版本号 //安装对应的gitbook版本
gitbook update //更新到gitbook的最新版本
gitbook uninstall 2.0.1 //卸载对应的gitbook版本
gitbook build --log=debug //指定log的级别
gitbook build --debug //输出错误信息
gitbook pdf
```

### 高级
只做到这些的话就没必要用命令行版的gitbook了，当然是为了做一些个性化定制，包括对book.json的配置以及使用插件。

#### book.json
gitbook 在编译书籍的时候会读取书籍源码顶层目录中的 book.js 或者 book.json，这里以 book.json 为例，参考 [Gitbook 文档](https://github.com/GitbookIO/gitbook)可以知道，book.json 支持一系列配置：

经过一番折腾，往book.json里放置如下内容
```
{
    "author": "Binglin CHEN <xp-chen14@mails.tsinghua.edu.cn>",
    "description": "An Autobiography of Chen Binglin",
    "extension": null,
    "generator": "site",
    "links": {
        "sharing": {
            "all": null,
            "facebook": null,
            "google": null,
            "twitter": null,
            "weibo": null
        },
        "sidebar": {
            "James's Blog": "http://james20141606.github.io"
        }
    },
    "output": null,
    "pdf": {
        "fontSize": 20,
        "footerTemplate": null,
        "headerTemplate": null,
        "margin": {
            "bottom": 36,
            "left": 62,
            "right": 62,
            "top": 36
        },
        "pageNumbers": false,
        "paperSize": "b5"
    },
    "plugins": [],
    "title": "Autobiography of Chen Binglin",
    "variables": {}
}
```
再次编译并预览
```
gitbook build
gitbook serve
```
生成pdf
先下载calibre，当年捣鼓kindle就很熟悉的工具了，做一个软链接到bin下，然后生成pdf
```
ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin
gitbook pdf . mypdf.pdf
```

By the way，顺便做了个快捷键，每次build再生成pdf还得等几十秒很麻烦
```
alias gitbookbp='gitbook build && gitbook pdf .'
```

#### 封面
为了美观，还要做个封面

需要先安裝 Canvas
```
brew install pkg-config cairo pango libpng jpeg giflib
npm install canvas
```
至 nodejs gitbook 安裝目錄下的 node_modules 目錄
```
cd /usr/local/lib/node_modules/gitbook-cli/node_modules
npm install gitbook-plugin-autocover
```
这个方法行不通，尝试先在book.json添加autocover，用gitbook install 安装

依然报错

尝试：
modify the package.json of YOURBOOKDIR/node_modules/gitbook-plugin-autocover the line:
```
"canvas": "1.3.15"
```
to
```
"canvas-prebuilt": "latest" #(哪个蠢货干嘛不写latest？)
```

and then run npm install in the gitbook-plugin-autocover

編輯 book.json
```
"plugins": ["autocover"]
```

**使用方法**
```
{
  "output": null,
  "generator": "site",
  "title": "Autobiography of Chen Binglin",
  "plugins": ["autocover"],
  "pluginsConfig": {
      "autocover": {
          "title": "Autobiography of Chen Binglin",
          "author": "Chen Binglin",
          "font": {
              "size": null,
              "family": "Impact",
              "color": "#FFF"
          },
          "size": {
              "w": 1800,
              "h": 2360
          },
          "background": {
              "color": "#09F"
          }
      }
  }
}
```
當重新啟動 gitbook serve 以後會在書本的靜態網頁資料夾中發現 (_book/) 兩個檔案，cover.jpg、cover_small.jpg

发现封面效果极差，，还是用其他软件设计好了，，，
[超级简单易用的平面设计软件 – Canva](https://www.canva.com/)这个看起来不错

#### 插件
没有功夫仔细捣鼓了


**碎碎念：**

最后，其实可以在GitHub pages直接发布书籍，不过对我感觉实用性不大，毕竟每篇拆开当做博客显得更充实（主要是懒），附资源，有空可折腾，不过对于缺少时间的强迫症来说意义真不大。[发布到 GitHub Pages | GitBook 简明教程](http://www.chengweiyang.cn/gitbook/github-pages/README.html)

最后的最后，放一下重新排版的书，B5，fontsize 20，老年人友好。
<iframe src="https://drive.google.com/file/d/1hY-yITp5yhy5kjASxIR2cHCbkMOsJ7Dq/preview" width="100%" height="600px"></iframe>



## Edit: 2019.5.20 update

> Gitbook 新版不再支持pdf和其他静态导出，也不再兼容旧版command line版本，旧版command line不支持右边栏和一些hint和embed语法，需要第三方插件，

### 安装command line gitbook

先安装brew和npm两个包管理软件

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

```
brew install node
brew install npm
```

再用npm安装gitbook
```
npm install gitbook -g
npm install gitbook-cli -g
gitbook -V #查看版本gitbook和gitbook-cli版本
```


### 安装插件
在`book.json`中填入插件名称，then run `gitbook install`就可以自动安装依赖的插件。安装新版gitbook的一些替代插件以及一些额外的美化插件。

> urlembed取代embed，效果不是很完美，tabs也没有新版gitbook的效果
插件用法
```
{% urlembed %}
https://website.org/stuff/this-is-the-path-name
{% endurlembed %}
```

```
{% tabs first="First Tab", second="Second Tab", third="Third Tab" %}

{% content "first" %}
Content for first tab ...

{% content "second" %}
Content for second tab ...

{% content "third" %}
Content for third tab ...

{% endtabs %}
```

### build书籍
```
gitbook init #会自动生成SUMMARY.md，无需手动产生
gitbook serve #可在浏览器预览，默认在http://localhost:4000
gitbook build #产生html
```

### 生成pdf
- 下载calibre
https://calibre-ebook.com/dist/osx
- 链接到`bin`下
`ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin`
- 产生pdf
`gitbook pdf . training_book.pdf`


