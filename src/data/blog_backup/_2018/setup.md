---
title: Setup and Linux
pubDatetime: 2018-04-12T23:39:17Z
description: "分享一点setup和linux的东西，包括使用git，使用支持markdown的笔记软件Bear，Anaconda的一些使用技巧以及jupyter在服务器上的设置。也可以在这里找到更多分享"
author: "James Chen"
tags: ["techniques", "linux", "bioinformatics"]
categories: ["techniques"]
draft: false
---

分享一点setup和linux的东西，包括使用git，使用支持markdown的笔记软件Bear，Anaconda的一些使用技巧以及jupyter在服务器上的设置。也可以在[这里](https://legacy.gitbook.com/book/lulab/bioinfo-training-2018/details)找到更多分享

# Setup
## 版本控制与GitHub管理
### Git简介
#### Git是目前世界上最先进的分布式版本控制系统。
##### 没有版本控制系统会遇到什么困难：
- 版本更新的困难：如果你用Microsoft Word写过长篇大论，那你一定有这样的经历：想删除一个段落，又怕将来想恢复找不回来怎么办？于是只好先把当前文件“另存为”一个新的Word文件，再接着改，改到一定程度，再“另存为”一个新文件，这样一直改下去，最后你的Word文档可能会有几十个不同版本的备份。过了一周，你想找回被删除的文字，但是已经记不清删除前保存在哪个文件里了，只好一个一个文件回去找，非常麻烦。如果是代码的话，来回的更改就更频繁了，如果想找到之前某个版本的代码，很有可能已经被删除了，对于稍微大一点的工程来说可能麻烦就大了。
- 合作时的困难：有些部分需要你的合作者帮助写，于是你把文件Copy到U盘里给她（也可能通过Email发送一份给她），然后，你继续修改文件。一段时间后你的合作者把改动后的文件给你，此时，文件的合并就是一件麻烦事了，你要不然得问她一个一个指出她的改动，或者你就要记录自己的改动，和她的文件合并。<br><br>

如果有一个软件，不但能自动帮我记录每次文件的改动，还可以让同事协作编辑，这样就不用自己管理一堆类似的文件了，也不需要把文件传来传去。如果想查看某次改动，只需要在软件里看一眼就可以看到改动的日期和内容，岂不是很方便？
##### 这就是21世纪的版本控制系统，Git。
#### Git诞生
Git是Linus (Linux之父)花了两周时间用C写的，在2002年以前，世界各地的志愿者把源代码文件通过diff的方式发给Linus，然后由Linus本人通过手工方式合并代码，Linux反对集中式的，需要联网的版本控制系统，也反对商业版的版本控制系统，于是创造了Git，一个月之内，Linux系统的源码已经由Git管理了。
Git迅速成为最流行的分布式版本控制系统，尤其是2008年，GitHub网站上线了，它为开源项目免费提供Git存储，无数开源项目开始迁移至GitHub，这就是程序员最爱的Git和Github的诞生史。

### 安装与使用Git
#### 安装git
只介绍Mac OS系统安装方法
- 方法一：先安装homebrew，然后通过homebrew安装Git。安装homebrew可查看http://brew.sh/
```
brew install git
```
- 方法二：
第二种方法更简单，也是推荐的方法，就是用Xcode，Xcode集成了Git，不过默认没有安装，在终端输入命令安装command line tools，即可安装git。
```
xcode-select --install
```

#### 使用git

##### 创建或使用文件夹作为需要管理的仓库
在本地建立项目文件夹，或者使用已存在的项目文件夹，如helloworld
```
cd helloworld
git init #通过git init命令把这个目录变成Git可以管理的仓库
```

##### 添加或更改文件
```
vi README.md #创建一个新文件README.md，添加内容并保存
git add README.md
#用命令git add告诉Git，把文件README.md添加到仓库
#如果一次性添加了多个文件，可以使用git add . git会自己判别哪些是新文件。
```
所有的版本控制系统只能跟踪文本文件的改动，比如TXT文件，网页，所有的程序代码等等，Git可以告诉你每次的改动，比如在第5行加了一个单词“Linux”，在第8行删了一个单词“Windows”。而图片、视频这些二进制文件，只知道大小的改动，但更改的内容版本控制系统无法知道。

##### 添加更改信息
下面可以告诉git你本次更改的内容，如果一次add了多个文件，则所有的文件都会被标注同样的更改信息。比如：
```
git commit -m "first commit"
git commit -m "add README.md"
```

##### 上传至GitHub
首先在github上新建一个repository，如helloworld，你将会看到跳转页面上提示你需要推送到的HTTPS地址https://github.com/accountname/repositoryname.git
接下来使用
```
git remote add origin https://github.com/accountname/repositoryname.git
git push -u origin master
```
即可把自己的本地仓库推送到github上，速度很快。
注意如果第一次把远程地址输入错误，可以用以下命令更正地址
```
git remote set-url origin https://github.com/accountname/repositoryname.git
```




#### 使用ssh key 免账户与密码推送方法：
##### 在终端输入
```
git config --global user.name "yourgithubname"
git config --global user.email "yourgithubaccountmail"
```
##### 生成ssh key
```
ssh-keygen
```
生成的密钥在~/.ssh/id_rsa.pub位置。

##### 配置git 的ssh key
- 登录github 点击头像选择settings
- 选择左侧菜单SSH and GPG keys ；点击右上角的NEW SSH key
- 新建ssh 链接。
- title 可随意填写
- Key 将上一步生成的 id_rsa.pub文件 的内容全部复制到此处


参考链接：
[Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
[SSH连接GitHub、GitHub配置ssh key](http://blog.csdn.net/u012373815/article/details/53575362)
[version control](https://peerj.com/preprints/3159/)

## 支持markdown的轻量笔记软件 Bear
推荐一款Mac下的非常好用额轻量级笔记软件Bear
##### 它的优点包括：
- 轻量级，非常顺滑，无任何延迟
- 快捷键/markdown支持，符合程序员思维
- 加粗，下划线，项目列举，待办方块，代码块，多级标题，均有键盘快捷键以及markdown格式下的快捷键
- 网页链接、文件可拖拽至笔记，并显示内容概要。
- 内容可无缝衔接至gitbook等支持markdown格式的场合。（比如这些tips都可以直接在Bear编辑好，复制粘贴来就可以。）
- 可以快速通过# 加入标签，对笔记进行分类

# Linux

##### Edited by 19' Under Xupeng Chen

## Conda & Bioconda

Conda是一个包管理软件，可以帮助方便地下载各种软件而不需要编译。尤其是Bioconda可以用来管理linux系统上的生信相关的软件，是解决安装权限不够的问题的好工具。

### Conda

conda是一个包，依赖和环境管理工具，适用于多种语言，如: Python, R, Scala, Java, Javascript, C/ C++, FORTRAN

#### 安装

Anaconda安装可以去官方下载，但是强烈推荐使用tuna镜像，免流量，而且速度极快。
[下载地址](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)，下载.sh文件后运行，按照提示一步一步往下运行即可。
下载Anaconda后，很多python的常用库都会被自动安装好，另外建议运行以下命令

```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes
```

这样以后使用conda install packages命令下载需要的包的时候，会自动从tuna镜像下载，速度会非常快。

### Bioconda

Bioconda是conda上一个分发生物信息软件的频道，使用它的最大好处是，你不用自己编译软件了。
Conda tuna 安装 conda设置 从tuna下载免流量，快
目前Bioconda有超过130个添加、更新和维护生物信息软件的贡献者，他们为这个频道发布了1500多个软件包。总结起来，bioconda有以下几个特点：

* 软件是编译好的，无需自己编译
* 跨平台，支持Linux和Mac OS（本身conda还支持Windows）
* 支持多种语言，Python/Perl/R/Java/Go等
* 兼容多种语言的包管理器，如pip，CRAN，CPAN，Bioconductor，apt-get以及 homebrew
针对Python来说，使用conda相比pip的很大优势，就是不用自己编译。安装软件最头疼的问题，就是解决编译报错，很多时候忙活一天就为了把一个软件装好。

#### 使用方法

先添加Bioconda频道

```
conda config --add channels defaults
conda config --add channels conda-forge
conda config --add channels bioconda
```

然后即可用conda安装各种需要的软件，可以先去bioconda channel看看自己需要的软件在不在列表内。

```
conda install bowtie
conda create -n myenv bwa bowtie hisat star #a new environment can be created
source activate myenv #activate the environment
```

参考资料：
[Using Bioconda — Bioconda documentation](https://bioconda.github.io/)
[packages list](https://bioconda.github.io/recipes.html)

## 在服务器上运行jupyter notebook并在本地浏览器使用

Jupyter Notebook是基于网页的用于交互计算的应用程序。其可被应用于全过程计算：开发、文档编写（markdown）、运行代码和展示结果。

* jupyter适合课题的早期尝试、绘图等非常便利，代码重复运行和复制粘贴方便，方便反复调试，尤其适合尚未工程化，需要大量尝试的阶段。

* jupyter非常适合教学，交互效果非常好，github上有大量的教学项目是用jupyter notebook展示的，方便查看结果，查看相关说明、公式，方便学习者进行反复实验。

#### 本地设置服务器信息

```
vi .ssh/config
Host ibme
HostName 166.111.152.116 #ibme的ip
ControlPersist yes
ControlMaster auto
User chenxupeng
DynamicForward 127.0.0.1:32987 #最后的port（如32987）要自己设置，不能与他人冲突
```

#### 使用SwitchOmega在本地浏览器设置代理

##### 添加情景模式，如ibme

代理协议SOCKS5，代理服务器127.0.0.1，代理端口填写自己设置的port。

##### 在auto switch页面添加规则

```
172.235.0.*，192.235.0.*，node50*等，情景模式选择ibme
```

点击应用选项

##### 在服务器上设置start-jupyter文件

```
vi ~/bin/start-jupyter
填写：
#! /bin/bash
bsub <<EOF
#BSUB -J jupyter
#BSUB -R span[hosts=1]
#BSUB -q Z-LU
cd
jupyter notebook --no-browser --ip=0.0.0.0 --port=10087 #port自己设置一个，不要冲突
EOF
```

\(也可以使用\#BSUB -q Z-BNODE\)

#### start jupyter

首先start-jupyter启动，会自动提交一个任务到某个节点

##### 使用节点名称连接

接下来可以用bjobs看到jupyter被提交到了哪个节点。接下来打开本地浏览器，输入

```
node50*:port #如node504/10087
```

若使用Z-BNODE，可在浏览器填写

```
zbnode01.cluster.com:port
```

##### 使用ip连接

用nslookup获得节点的ip，在本地浏览器输入：

```
ip:port #如192.235.5.48:10087
#获得ip方法
nslookup node504.cluster.com
nslookup zbnode01.cluster.com
```

第一次登陆需要密码，用bpeek查看任务输出，即可看到token，复制至浏览器即可使用jupyter notebook进行编程了。




