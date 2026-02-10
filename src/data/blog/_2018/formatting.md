---
title: How to Format
pubDatetime: 2018-05-04T14:58:25Z
description: "在这里分享一下各种相关资源和知识"
author: "James Chen"
tags: ["techniques", "research", "paper", "formatting"]
categories: ["research"]
draft: false
---

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=489124034&auto=1&height=66"></iframe>

三年前我什么都不懂的时候，就听闻了高大上的LaTeX，还去听了图书馆某工科博士开的LaTeX入门讲解，听的天花乱坠毫无头绪，回去兴冲冲地装上，运行，出现bug，然后傻眼了，解决不了，我现在还记得当时在百度文科搜到一篇讲解文章，教人一点点开始，第一次生成出来一句话（真是愚蠢的却又不得不这么教的教程）。然后放弃了这个大坑。

后来慢慢发现，其实就是个简单的工具而已，适应了基本的思维方式，命令熟练，特别是搜索能力变强可以快速debug之后，latex和markdown真的是完美的排版神器，尤其是在mac版的word经常崩而且公式极其丑陋且卡顿且长篇文章格式会让人非常恶心的情况下，我已经放弃了word，这一年除了老师要求必须交word的作业以及让人毫无兴趣的作业，基本都是用latex或markdown写的，这两个东西极大的方便了我的生活。

在这里分享一下各种相关资源和知识



# 排版
## markdown
下面列一下使用场景，这些场景有的是基本工具，有的是完成某些任务（如博客、README）所需要的。

### Bear
神器，我现在所有的笔记都在上面，非常完美兼容markdown各语法，并有快捷键，非常简洁清爽的让人变得无比有条理的程序员风格笔记管理软件。**一个巨大的好处是，平时什么东西都放在bear上，再转移到下面的各个工具上就直接复制粘贴好了，再没有排版的困扰。**另外备份所有笔记也很方便，对于害怕东西丢失的强迫症来说非常有意义。（话说经常手动备份在电脑端，且使用time machine直接备份和间接备份，并且最近清华云盘也每天备份，应该不会丢了吧，这些笔记确实非常宝贵，如果丢了我会心痛死的）

Markdown方便到最近都不怎么愿意用latex了，很多作业先随手写在bear上，然后本来想再用latex写，后来觉得直接导出到pdf也能看，起码比word强，也就懒得用latex再排版一遍了。

### Gitbook
Gitbook，这部分内容比较多，专门写了一篇文章：
[GitBook intro & Grandpa’s Bio | James Chen’s Blogs](https://james20141606.github.io/2018/05/04/gitbook/)

### MWeb
[MWEB Homepage](http://www.mweb.co.za/)，某个开发者开发的，功能强悍，可以一边写一边看效果，替代gitbook桌面版，代价是预览会有些卡顿抖动。但是实在是很好用，**必备工具**

### GitHub
各种README、Wiki都会用到。注意GitHub的wiki页面还可以有特殊的排版技巧，可以编辑一个特殊的_Sidebar页面来组织wiki的板式，比如实验室training项目的wiki：[Home · lulab/training Wiki · GitHub](https://github.com/lulab/training/wiki/_Sidebar/_edit)

### BLOG
这个博客的博文都是markdown写的，相当好用便捷。因为目前完全转向bear记笔记，所以写博客实在是非常轻松，基本hexo new “newblog”，然后把bear上的内容搬过去就行了，用MWEB编辑一下，图片用图片库做个外链，pdf用google drive加上插件展示，相当自动化了。

### Rmarkdown
统计学作业都用它，最开始用了两次latex简直要吐，后来发现这种公式太多的东西还是所见即所得的Rmarkdown最完美，用Rstutio排版，谁用谁知道，而且还可以无缝嵌入R代码，用来写统辅作业必备。

**展示如何用Rstudio插入公式、代码：**
![Markdown](http://i4.fuimg.com/640680/a7923414b1e9f50e.png)


### Pandoc
貌似是很强大的格式转换工具，可以把markdown转latex之类的，不过我觉得意义不大，有这功夫还是直接用latex吧，怎么可能完美转换，之前看过一个强行转的论文，说实话并没有纯粹的latex漂亮

### Jupyter markdown   
这个还是蛮有趣的，写代码的时候注释很有用，而且最近发现了一个很好的插件，在另一篇文章中我也写了，叫nbextensions，其中一个功能就是可以直接把jupyter的markdown注释收集起来，根据标题层级生成目录。安装如下，具体内容可自行搜索或者看我的jupyter配置的文章

```
pip install jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
```

**效果**

![Markdown](http://i4.fuimg.com/640680/b3489af920c29d1e.png)

## LaTeX
论文排版、作业必需工具，完美替代word，尤其略微复杂的带有公式和格式要求的，秒杀word无疑问。从数学建模课作业第一次在感冒时吃了过量的药什么命令都不会打一点儿搜一个到排版emaize报告，ANN作业，模式识别作业，各种汇报，统辅课的各种作业（后来转用配合R的Rmarkdown）

随便放一个用LaTeX排出来的[美赛论文](https://github.com/james20141606/MCM2018problemC/blob/master/paper.pdf)

安装latex太简单了，网上教程很多，就不废话了，介绍几个编辑器：

### TexStudio

预览更容易，但是界面真的奇丑无比受不了，功能过于繁杂，不过有一些常用公式可以点击挺不错。

### TexWork

最简陋也就最轻便，用的最多，坏处：什么都得自己手动输入，好像回到了九十年代


### pdf2htmlEX
update 2018.5.21
发现了这个神奇的牛逼的项目，把pdf文件转成html文件，搜到它的时候我震惊了，，

```
pdf2htmlEX --zoom 1.3 pdf/test.pdf
```

[GitHub - coolwanglu/pdf2htmlEX: Convert PDF to HTML without losing text or format.](https://github.com/coolwanglu/pdf2htmlEX)
[PDF转HTML神器pdf2htmlEX，解决跨平台问题 - Simon_ITer的个人空间](https://my.oschina.net/keysITer/blog/779869)

### VSCode

最近老是路过一些人的电脑前发现他们在用VSCode，更神奇的是发现了几个人在用vscode排latex，觉得十分有趣，所以这部分是边学边写的，主要是为了自己学。

首先是为啥要用VSCode编辑LaTeX？已经有专用编辑器了，为什么要用通用编辑器？

因为不只写LaTeX，极简主义好。

相比传统『神级』编辑器(vim, emacs等)，新一代编辑器(VSCode, Atom)有何优势？
- 效率：传统编辑器高
- 难度：新编辑器上手简单
- 颜值：新编辑器高

顺便比对Atom和VSCode，其实Atom不是我不想用，而是它很神奇的在我的电脑上总是崩溃，让我留下了很差的印象，，

- 支持：Atom插件多且好，包括且不局限于LaTeX范围，但是现在VSCode的插件也非常非常多了。
- 性能：VSCode好，启动快，不卡，Atom就不提了，，
- 难度：VSCode上手难度略高。

VSCode所有的配置都在settings.json中，使用者会更加明白发生了什么，包括默认设置做了什么。

综上所述，VSCode的适合人群：同时具有编程和LaTeX需求，且对编辑器性能要求较高，有一定动手能力的人们。

#### 接下来配置环境
##### 测试样本：THUthesis
用THUthesis测试一下，去GitHub下载最新版的[thuthesis/main.tex at master · xueruini/thuthesis · GitHub](https://github.com/xueruini/thuthesis/blob/master/main.tex)。就当是为写毕业论文预习一下吧，看起来THUthesis一直在改进，字体似乎也支持Mac了，虽然还是有一些坑要踩一踩，首先要注意在main.tex把以下选项选填到documentclass里
```
\documentclass[degree=master, tocarialchapter]{thuthesis}
% 选项
%   degree=[bachelor|master|doctor|postdoctor], % 必选，学位类型
%   secret,                % 可选（默认：关闭），是否有密级
%   tocarialchapter,       % 可选（默认：关闭），章目录中使用黑体（这项表示同时打开下面两项）
%   tocarialchapterentry,  % 可选（默认：关闭），单独控制章标题在目录中使用黑体
%   tocarialchapterpage,   % 可选（默认：关闭），单独控制章页码在目录中使用黑体
%   pifootnote,            % 可选（默认：关闭），页脚编号采用 pifont 字体符号，建议打开
```

对于本科生来说，选填

```
\documentclass[degree=bachelor, tocarialchapter，pifootnote]{thuthesis}
```

用Texworks可以编译通过，下面尝试VSCode

##### 默认TeX Live套装和VSCode都装好了

安装 LaTeX Workshop 并配置用户设置

打开 VS Code 的插件页面，并搜索 LaTeX Workshop 插件，并选择安装。然后打开 “文件”-“首选项”-“设置”，或者直接使用 快捷键（Ctrl+逗号）打开。在搜索框中搜索“toolchain”，找到设置（新版是tool），在“右侧”粘贴配置的设置，保存，并退出 VS Code。

```
{
        "latex-workshop.latex.toolchain": [
        {
            "command": "latexmk",
            "args": [
            "-synctex=1",
            "-interaction=nonstopmode",
            "-file-line-error",
            "-pdf",
            "%DOC%"
            ]
        }
    ]
}
```

快捷键
```
1. Ctrl+Alt+B 编译，Build LaTeX project。
2. Ctrl+Alt+T 分栏预览生成的 PDF。
```
放一些资源：

[VS Code 与 LaTeX 真乃天作之合 - 简书](https://www.jianshu.com/p/57f8d1e026f5)，[配置VSCode为LaTeX集成开发环境(IDE) - 初级版](https://zhuanlan.zhihu.com/p/31883018)，[VS Code神用法之一：如何用VS Code在Mac环境下优雅地编写latex文档 - CSDN博客](https://blog.csdn.net/u010751257/article/details/54615563)
### 小插件

#### Chrome
Chrome下（也许其他浏览器也可以），在遇到网页中用mathjax编辑的公式时，右键可选show math as，点击tex commands，直接蹦出来latex命令（第一次发现是在cross validated上找统计推断一道题的解答时候发现的），谁用谁说好。

![Markdown](http://i4.fuimg.com/640680/e7de5ce7e69e471b.png)

#### Mathpix Snipping Tool
最近发现的，基于先进的 ~~人工智能~~图像识别技术，截图，识别出公式，然后提供latex 命令，谁用谁说好。


# 论文管理 
排版部分的话上面已经讲得很清楚了，正儿八经的论文不用LaTeX写真的合适嘛？当然不合适，CS和EE应该没有人不用LaTeX了吧，也就公式少、不喜欢折腾的人还愿意面对着几十页word动不动卡死崩溃却不愿意学点新东西了。话说现在各种资源这么多，THU的本科论文博士论文LaTeX模板都有，拿过来往里面填充运行就行了，孟孟不会LaTeX都能在美赛的时候边问边摸索用美赛的LaTeX模板把文章排出来，可见现在成本真的很低了。

## Zotero
论文管理强烈推荐zotero，貌似略小众，但是功能很强，索引很强，管理很细致，尤其是chrome插件简直无敌，什么都能推过去。


[Zotero开箱指南](https://zhuanlan.zhihu.com/p/31852030)

这个资源还是讲了很多东西的，包括一些插件，如何插文献，包括修改引文样式[zh:styles    Zotero Documentation](https://www.zotero.org/support/zh/styles)，[四步实现自定义Zotero参考文献格式](https://zhuanlan.zhihu.com/p/31326415)等等，支持word插入以及LaTeX插入。

比如[Better BibTeX for Zotero](https://retorque.re/zotero-better-bibtex/)，看起来可以更好管理LaTeX的文献插入，以后再折腾。

[RefTools](https://zhuanlan.zhihu.com/reftools)
[参考文献管理——简易Zotero教程 - 简书](https://www.jianshu.com/p/68f0e4134b04)

