---
title: Android terminal for the first time
publishDate: 2019-04-23T17:59:19Z
excerpt: "Who don't like android?"
author: "James Chen"
tags: ["hardware", "android", "linux"]
category: "techniques"
math: true
draft: false
---

Who don't like android?



## setting up and materials

# 安卓手机
jupyter
Turmux  给自己发消息
[Welcome to the Xposed Module Repository! | Xposed Module Repository](https://repo.xposed.info/)
[Termux 高级终端安装使用配置教程 | 国光](https://www.sqlsec.com/2018/05/termux.html)
[神器Termux的使用日常 - 简书](https://www.jianshu.com/p/5c8678cef499)
 [https://www.leouieda.com/blog/scipy-on-android.html](https://www.leouieda.com/blog/scipy-on-android.html) 

[AirDroid Web | Manage your phone on web](http://web.airdroid.com/)

```
deb [arch=all,i686] https://mirrors.tuna.tsinghua.edu.cn/termux/
sh -c "$(curl -fsSL https://github.com/Cabbagec/termux-ohmyzsh/raw/master/install.sh)" 
```


```
http://172.22.220.125:8888 ip=0.0.0.0
```


- [ ] 我装的是一个更加完整的Linux环境，叫Arch Linux： [https://wiki.termux.com/wiki/Arch](https://wiki.termux.com/wiki/Arch) 
里面包含几乎所有的编译好的桌面版linux中的软件包，用pacman -Sy就能全部安装好


- [ ] 我在里面还装过桌面以及桌面版的chrome，用VNC连过去就跟电脑一样了
```
运行arch/startarch进入arch
pacman -S chromium xorg-server-xvfb supervisor
pacman -Sy x11vnc
```

Intsall vnc
Tigervnc没有64位？
[TigerVNC - ArchWiki](https://wiki.archlinux.org/index.php/TigerVNC#Installation)
 [https://wiki.archlinux.org/index.php/x11vnc](https://wiki.archlinux.org/index.php/x11vnc) 


访问手机数据
```
termux-setup-storage
```

The contents of the created $HOME/storage folder are symlinks to different storage folders:

Zsh
```
The zsh shell init files are ~/.zshrc and $PREFIX/etc/zshrcand more. Seeman zsh and info zsh for more information. It can be installed with:$ pkg install zsh
```
配置oh my zsh
[GitHub - 4679/oh-my-termux: oh-my-termux](https://github.com/4679/oh-my-termux)
```
pkg install curl
bash -c "$(curl -fsSL https://git.io/oh-my-termux)"
```

Install opencv
 [https://wiki.termux.com/wiki/Instructions_for_installing_python_packages](https://wiki.termux.com/wiki/Instructions_for_installing_python_packages) 
```
pkg install cmake pkg-config libjpeg-turbo-dev libpng-dev python python-dev

git clone  https://github.com/opencv/opencv  && cd opencv

mkdir build && cd build

LDFLAGS=" -llog -lpython3" cmake -DCMAKE_BUILD_TYPE=RELEASE -DCMAKE_INSTALL_PREFIX=$PREFIX -DBUILD_opencv_python3=on -DBUILD_opencv_python2=off -DWITH_QT=OFF -DWITH_GTK=OFF ..

make
make install
```


Berryconda
删除已有anaconda  一切都在arch里装


