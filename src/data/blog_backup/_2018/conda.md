---
title: Conda introduction
pubDatetime: 2018-05-05T00:08:12Z
description: "Conda是个好东西，以前的文章介绍过Setup and Linux | James Chen’s Blogs，因为好几台机器，因为某些库，以及python2和3的问题，重装倒腾过N次，于是倒腾出来一个标准流程，记录如下。"
author: "James Chen"
tags: ["techniques", "software", "python", "bioinformatics"]
categories: ["techniques"]
draft: false
---

Conda是个好东西，以前的文章介绍过[Setup and Linux | James Chen’s Blogs](https://james20141606.github.io/2018/04/12/setup/)，因为好几台机器，因为某些库，以及python2和3的问题，重装倒腾过N次，于是倒腾出来一个标准流程，记录如下。


## 安装conda2与conda3
安装当然用清华开源镜像站的装啦，校园网下每秒几十兆，不用是傻子[Index of /_legacy_index/anaconda/archive/](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)
分别找到2和3的最新版本，wget .sh脚本，然后运行，按顺序来，最后添加环境变量到bashrc中即可。

### 使用tuna的镜像库
如下配置，以后conda install的时候用tuna的镜像，告别龟速(当然实验室的服务器本身已经很给力了，不过对于不能翻墙的人来说实在是福音)

```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes
```

### Anaconda2 和3兼容性
- 首先修改bashrc或者zshrc，加入两个路径
- 然后cd 到anaconda3下的bin，将conda和pip改成conda3和pip3
这样可以分别管理，pip，conda对应2，pip3，conda3对应3，可以顺便把anaconda2下面的pip和conda加上2（我记得一年多以前就是这样的，谁知道现在conda都统一写成不带数字了，让用两个版本的人很难受的）


可以用which pip(pip3)来看一下自己的pip是不是用的正确的位置的


### check是否完全删除以前的anaconda
```
conda install anaconda-clean
anaconda-clean --yes
rm -rf ~/anaconda2
~/.anaconda_backup/<timestamp>
```

### 把以前的依赖删除的方法
加到bashrc里，尤其是去除服务器统一配置的anaconda的好方法

```
unset CONDA_DEFAULT_ENV
unset CONDA_PREFIX
unset ONDA_PROMPT_MODIFIER
unset CONDA_PYTHON_EXE
unset CONDA_SHLVL
```
### 可能的jupyter的kernel问题

```
pip3 install ipykernel
python3 -m ipykernel install --user
pip install ipykernel
python2 -m ipykernel install --user
```

**需要额外装的package**（待不断补充），其实conda自带的常见package真的越来越多了，tensorflow不得不用低版本的主要还是cuda的版本和其他的一些小问题。

```
#tensorflow
pip install tensorflow-gpu==1.2.1
#pytorch
#plotly
#concise
```


