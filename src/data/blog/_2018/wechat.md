---
title: 分享一个微信机器人
pubDatetime: 2018-05-16T21:13:27Z
description: "去年最火的微信机器人似乎是GitHub - littlecodersh/ItChat: A complete and graceful API for Wechat. 微信个人号接口、微信机器人及命令行微信，三十行即可自定义个人号机器人。，尤其是这种文章用微信控制深度学习训练：中国特色的keras插件还是相当有趣的。今天又看到一个功能很全的微信接口https://github.com/youfou/wxpy"
author: "James Chen"
tags: ["techniques", "codes"]
categories: ["techniques"]
draft: false
---


去年最火的微信机器人似乎是[GitHub - littlecodersh/ItChat: A complete and graceful API for Wechat. 微信个人号接口、微信机器人及命令行微信，三十行即可自定义个人号机器人。](https://github.com/littlecodersh/ItChat)，尤其是这种文章[用微信控制深度学习训练：中国特色的keras插件](https://zhuanlan.zhihu.com/p/25670072)还是相当有趣的。今天又看到一个功能很全的微信接口https://github.com/youfou/wxpy



功能非常多，不过有一些bug，比如会多次重复弹出二维码扫描。另外因为中文编码的不友好，用来处理些中文信息还是挺不顺畅的。

Share一下用来获取所有好友的个性签名的代码，比一篇微信文章的教程多了一些东西，换成了numpy，把好友名字对应起来了。

```
# coding=utf-8
from wxpy import *
# 初始化机器人，扫码登陆
bot = Bot()
# 获取所有好友
my_friends = bot.friends()
import re
filterdata= {}
for i in range(len(my_friends)):
    friend = my_friends[i]
    #pattern = re.compile(r'[一-龥]+')
    filterdata[i] = friend.signature
import numpy as np
sig = np.array([filterdata[i] for i in range(len(my_friends))])
induse = np.where(sig !='')[0]
sign = np.ndarray([induse.shape[0],2]).astype('str')
for i in range(induse.shape[0]):
    sign[i,0] = my_friends[induse[i]].name
    sign[i,1] = sig[induse[i]]
np.savetxt('signature',sign,fmt='%s')#,encoding='utf-8')

```

看了一遍有签名的的好友的微信签名，蛮有意思的，然后浏览了一下wxpy的文档[wxpy: 用 Python 玩微信 — wxpy 0.3.9.8 文档](http://wxpy.readthedocs.io/zh/latest/)，陷入沉思：**这玩意儿就是为微商量身打造的垃圾信息骚扰利器，，，**

资源：[人工智能头条/用Python更加了解微信好友](https://mp.weixin.qq.com/s/hGptTYZnO4DVPTshgiJZmg)

