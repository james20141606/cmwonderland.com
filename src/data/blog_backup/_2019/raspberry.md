---
title: Raspberry for the first time
pubDatetime: 2019-04-23T14:59:19Z
description: "A cute raspberry is a fantastic toy to play with."
author: "James Chen"
tags: ["hardware", "raspberry", "linux"]
categories: ["techniques"]
math: true
draft: false
---

A cute raspberry is a fantastic toy to play with.



## setting up and materials

# respberrypi
Hardware
[file:BA02449E-58F1-452E-87CB-1B06C8173061-354-0000295B6F57EF42/Setting up your Raspberry Pi _ Raspberry Pi Projects.pdf]

The Raspberry Pi 3 Model B+ is the newest, fastest, and easiest to use.

The Raspberry Pi Zero and Zero W are smaller and require less power, so they’re useful for portable projects such as robots. It’s generally easier to start a project with the Raspberry Pi 3, and to move to the Pi Zero when you have a working prototype that the smaller Pi would be useful for.

[使用安卓手机控制树莓派 - 简书](https://www.jianshu.com/p/25275e05bb29)
[树莓派折腾记:纯手机+数据线连接树莓派 - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1159908)
[树莓派玩家应该安装的6个Android应用 - 资讯 - 伯乐在线](http://top.jobbole.com/9766/)

电源供应注意要求
a power supply which provides at least 2.5 amps.

You will need a micro SD card with a capacity of at least 8 GB.
Your Raspberry Pi needs an SD card to store all its ~les and the Raspbian operating system.

To start using your Raspberry, you will need a USB keyboard and a USB mouse.

Once you’ve set your Pi up, you can use a Bluetooth keyboard and mouse, but you’ll need a USB keyboard and mouse for setting up.

https://projects.raspberrypi.org/zh-CN/projects/where-is-the-space-station

If you have an SD card that doesn’t have the Raspbian operating system on it yet, or if you want to reset your Raspberry Pi, you can easily install Raspbian yourself. To do so, you need a computer that has an SD card port — most laptop and desktop computers have one.

The Raspbian operating system via NOOBS Using the NOOBS software is the easiest way to install Raspbian on your SD card.

[RaspberryPi 树莓派无显示器连接说明 - 简书](https://www.jianshu.com/p/173b34892d31)

[树莓派+YOLO打造人工智能相机 – 树莓派中文站](http://www.52pi.net/archives/1163)

 [http://www.ruanyifeng.com/blog/2017/06/raspberry-pi-tutorial.html](http://www.ruanyifeng.com/blog/2017/06/raspberry-pi-tutorial.html) 

Berryconda



```
ln -s /usr/local/opt/readline/lib/libreadline.8.dylib /usr/local/opt/readline/lib/libreadline.7.dylib
```
****
步骤：
SD card formater
把系统烧进TF卡：在 [http://www.raspberrypi.org/downloads/](http://www.raspberrypi.org/downloads/) 下载所需要的系统镜像。对于Mac系统，可以使用 [https://github.com/RayViljoen/Raspberry-PI-SD-Installer-OS-X](https://github.com/RayViljoen/Raspberry-PI-SD-Installer-OS-X) 这个小脚本，将下载到的install放到与解压出来的img镜像同一文件夹下

- [x] 开启ssh  免密码访问：
以后只需要连接wifi和电源
- [ ] 命令行版清华网
- [x] berryconda
- [ ] autostart程序如vnc
- [ ] 如何关机

sudo ifconfig
```

```
pi@
VNC
```
sudo apt-get update
sudo apt-get install tightvncserver

vncserver :1
```

 [https://www.boydwang.com/2016/05/adafruit-series-tutorial/](https://www.boydwang.com/2016/05/adafruit-series-tutorial/) 
enable SSH
[树莓派开启SSH的N种方法 - 简书](https://www.jianshu.com/p/654ee08d2b3a)

```
关机命令：sudo shutdown -h now（立刻进行关机）

                  halt（立刻进行关机）

                  poweroff（立刻进行关机）

重启命令：shutdown -r now（现在重新启动计算机）

                  reboot（现在重新启动计算机）

```

Tensorflow on raspberry

```
CI_DOCKER_EXTRA_PARAMS="-e CI_BUILD_PYTHON=python3 -e CROSSTOOL_PYTHON_INCLUDE_PATH=/usr/include/python3.4" \
  tensorflow/tools/ci_build/ci_build.sh PI-PYTHON3 \
  tensorflow/tools/ci_build/pi/build_raspberry_pi.sh

tensorflow/tools/ci_build/ci_build.sh \
  tensorflow/tools/ci_build/pi/build_raspberry_pi.sh

pip install tensorflow-2.0.0-cp34-none-linux_armv7l.whl

```

install opencv
 [https://www.quora.com/How-do-I-install-OpenCV-Python-on-Raspberry-Pi](https://www.quora.com/How-do-I-install-OpenCV-Python-on-Raspberry-Pi) 

- [ ] 命令行版清华网
- [ ] autostart程序如vnc

资源
[你今天太帅了：来用树莓派打造一个魔镜吧 - 文章 - 伯乐在线](http://blog.jobbole.com/97180/?utm_source=top.jobbole.com&utm_medium=relatedArticles)
[树莓派晚上可以用来做什么？ - 文章 - 伯乐在线](http://blog.jobbole.com/97483/?utm_source=top.jobbole.com&utm_medium=relatedArticles)
[树莓派+YOLO打造人工智能相机 – 树莓派中文站](http://www.52pi.net/archives/1163)
[用树莓派DIY共享鱼缸，支持微信远程喂鱼 | 树莓派实验室](http://shumeipai.nxez.com/2017/09/27/nature-aquarium-for-sharing.html)
[树莓派能用来做啥？ | 树莓派实验室](http://shumeipai.nxez.com/what-raspi-used-for)
[**树莓派基于深度学习的一些有趣应用](https://blog.csdn.net/minstyrain/article/details/82386011) 
[GitHub - thibmaek/awesome-raspberry-pi: 📝 A curated list of awesome Raspberry Pi tools, projects, images and resources](https://github.com/thibmaek/awesome-raspberry-pi)
 [https://github.com/wwj718/awesome-raspberry-pi-zh](https://github.com/wwj718/awesome-raspberry-pi-zh) 

 [http://www.ruanyifeng.com/blog/2017/06/raspberry-pi-tutorial.html](http://www.ruanyifeng.com/blog/2017/06/raspberry-pi-tutorial.html) 
[树莓派程序开机自启动方法总结 - 老野的成长之路 - CSDN博客](https://blog.csdn.net/feixuedongji/article/details/79891735)
[几种设置树莓派开机自启的方法 - 简书](https://www.jianshu.com/p/1a160067d8fd)
 [http://www.boydwang.com/2014/05/adafruits-raspberry-pi-lesson-5-using-a-console-cable/](http://www.boydwang.com/2014/05/adafruits-raspberry-pi-lesson-5-using-a-console-cable/) 
 [http://www.boydwang.com/2014/05/adafruits-raspberry-pi-lesson-4-gpio-setup/](http://www.boydwang.com/2014/05/adafruits-raspberry-pi-lesson-4-gpio-setup/) 
 [https://www.boydwang.com/2016/05/adafruit-series-tutorial/](https://www.boydwang.com/2016/05/adafruit-series-tutorial/) 




透明壳子
wifi连接  
时钟装置  早晚叫醒   提醒喝水
温度传感器    降温增温    注意保暖
湿度   提醒喝水
声音   
拍照 
自动浇水？  寒假？（这个十几块钱就可以）
空气指数
文字转语音服务  （提醒看手机）
机械装置

识别一些特定的特征拍照
时间播报，个性化闹钟，

[「树莓派」是什么以及普通人怎么玩？ - 知乎](https://www.zhihu.com/question/20859055)
http://shumeipai.nxez.com/what-raspi-used-for
http://shumeipai.nxez.com/2015/10/07/saks-diy-tutorials-pm25-display-and-alarm.html
http://shumeipai.nxez.com/2013/10/05/three-methods-developed-in-text-to-voice-services.html
https://sspai.com/post/38542
http://www.ruanyifeng.com/blog/2017/06/raspberry-pi-tutorial.html




