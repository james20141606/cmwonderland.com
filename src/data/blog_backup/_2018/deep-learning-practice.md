---
title: Deep Learning Practice
pubDatetime: 2018-04-10T21:23:55Z
description: "This is the JC talking about deep learning in Lu Lab."
author: "James Chen"
tags: ["deep learning", "machine learning", "techniques"]
categories: ["machine learning"]
draft: false
---

This is the JC talking about deep learning in Lu Lab.


## 前言
这次learning club希望和大家分享一下如何更好地通过实践来踏进深度学习的领域，深度学习是个快速发展的、牛人云集、前景广阔的领域，深入的研究需要深厚的数学功底和工程实现能力，但是踏入深度学习的领地也绝不那么困哪，大多数的深度学习算法都使用基于python的平台写成，易读性很强，而且相关的资源和原理及代码实现过程中的问题解答都十分充分，很适合快速地学习。


也许大家也都有这样的经历：到处看到关于人工智能解决了某某问题的报道，对神经网络、卷积等概念有粗浅的印象，知道深度学习很强大，探讨着和深度学习相关的话题，却是否没有真正去试图学一学，正所谓Talk is Cheap, Show Me the Code. 其实最好的入门方法就是动手试一试。
仅仅从入门的角度来看，在现在这个时间节点，搭建起一个基本的神经网络，乃至应用深度学习解决一个自己正在研究的问题，都比以往任何时候简单很多。

在这个分享中我主要简单介绍了深度学习相关的资源、平台、教程，通过几个例子展示如何利用深度学习平台搭建模型解决一个具体的问题。

## 深度学习
### 什么是深度学习
**深度学习（deep learning）**是机器学习的分支，是一种试图使用包含复杂结构或由多重非线性变换构成的多个处理层对数据进行高层抽象的算法。
深度学习是机器学习中一种基于对数据进行表征学习的算法。观测值（例如一幅图像）可以使用多种方式来表示，如每个像素强度值的向量，或者更抽象地表示成一系列边、特定形状的区域等。而使用某些特定的表示方法更容易从实例中学习任务（例如，人脸识别或面部表情识别）。深度学习的好处是用**非监督式或半监督式的特征学习和分层特征提取高效算法来替代手工获取特征**。

深度学习是一个框架，包含多个重要算法: 
- Convolutional Neural Networks (CNN) 卷积神经网络
- Recurrent neural Network (RNN)  循环神经网络
- AutoEncoder 自动编码器，包括Deep Auto Encoder (DAE) Variational Auto Encoder (VAE)等

增强学习(Reinforcement Learning)与深度学习的结合也创造了许多了不起的成果，如AlphaGo。



### 资源
#### 书籍资源

[神经网络与深度学习电子书](https://www.gitbook.com/book/hit-scir/neural-networks-and-deep-learning-zh_cn/details)  
[Deep Learning](http://www.deeplearningbook.org/)  **(Recommend)**
[深度学习中文版](https://github.com/exacity/deeplearningbook-chinese)

#### 课程资源
[CS229: Machine Learning](http://cs229.stanford.edu/) **(Recommend)**

[Stanford University CS231n: Convolutional Neural Networks for Visual Recognition](http://cs231n.stanford.edu/) **(Recommend)**

[CS224d: Deep Learning for Natural Language Processing](http://cs224d.stanford.edu/)

## 快速实践入门
###  为什么从实践开始

#### 内力和剑法哪个更重要 
深度学习新手的入门路径问题：了解模型的内部原理，和快速实现模型解决问题，哪个更重要呢？这篇文章就是关于入门的两种方式的争论：

[深度学习究竟怎么入门？两位Google大神掀起剑气之争](https://mp.weixin.qq.com/s/R-29UGMvHyBp8OkWk7zdpw)

这篇文章讲的非常好，我认为其中的很多大牛的争论和思想已经远远超出深度学习，适用于非常广泛的领域。下面列一下两派人士的观点：
##### “气宗”
代表人物：谷歌大脑的研究员David Ha，[SketchRNN](https://arxiv.org/pdf/1704.03477.pdf)之父。

观点：从零开始（**用纯Python、numpy**、甚至JS）实现全连接网络、卷积神经网络、RNN、反向传播、SGD，然后用小训练集来训练这些模型是一种学习神经网络如何工作的好方法。在跳到框架上之前，应该花时间从这里收获宝贵的直觉力。

##### “剑宗”
代表人物：谷歌研究员François Chollet，[Keras](https://keras.io/) 之父。

观点：实现神经网络能教你怎样实现神经网络，让你从算法上理解它们的工作原理。**但这不能教会你它们是做什么的，或者说能否实现哪些功能**。要学习这些，你应该把它们应用到一系列真实问题上去。

##### 以气驭剑？
徒手搭模型，显然不是速成之法。那么，花这么多时间“打坐练气”的意义何在？追求的，当然是一个以气驭剑。
David Ha说，深度学习框架都是些样板化的模型，入门就用框架，会限制眼界，让你泯然众人。从零开始徒手搭模型就不一样了，对于那些跨行业入门深度学习的人来说，**有机会从自己的独特视角，看到大多数人忽略的东西。**

在斯坦福CS231n课上就要求学生将神经网络的向前和向后传递都用numpy实现一遍（清华大学的人工神经网络课程也选择了这样的教学方式）。学生有意见：拿个框架（tensorflow、keras等）就能自动算的东西，我为什么要徒手来搭？
最重要的原因是，徒手将向前和向后传递都实现一遍才能真正理解其中的工作原理。如果单纯依赖框架的自动计算，在反向传播出现问题时就无法应对。

一些资深码农在入行深度学习时，选择的就是这样的方式，比如闭关花一周时间用C++实现了神经网络的前向、反向传播算法和各种细节，以及故意什么课程文献都不看，自己思考几个月。

**但是**，这对“学生”本身的基础要求非常高：名校计算机系的高材生或者资深码农可以在练气中获得很大的收获。未必适合普通人用来入门

##### 一招制敌？
对于上面这种学习方法，Fast.ai创始人Jeremy Howard路过参与到话题中来，吐槽了“气宗”的最强大势力：高校里的计算机专业。他说，计算机学位教育非要让人先从底层开始构建一堆东西，然后才能学习那些抽象的东西，结果他有很多朋友大一没读完就退学了。

枯燥，确实是徒手搭建神经网络的一大缺陷。而Keras之父Chollet对这种方法的反对是出于别的原因。他觉得这种方法，实在不够学以致用。**招式内部原理分析得再清楚，不知道该用在哪儿，也是白搭。**

Chollet举了很多例子来说明这一观点：
练习手写奇异值分解（SVD）有什么用？写完还是不知道SVD能干什么，**把它用到各种数据集上看结果，才能获得直观的印象**。
研究生们2000年就会用C语言写神经网络了，可是他们对神经网络的理解，可能还不如一名只会鼓捣框架的2018年高中生，毕竟现在有更多的应用环境。

现在很多人从没动手实现过神经网络的底层，但是对使用神经网络挺熟练的，知道这个东西如何工作。10年后，这样的人可能会占90%，就像现在的软件工程师了解操作系统，但基本都没开发过操作一样。

他还来了一段现身说法：“我2009年念书的时候，第一次用C语言写了神经网络，**从中学到的C比神经网络多**。后来又过了好几年我才开始理解神经网络能干什么，为什么有用。关键在于更好的工具+现实世界数据集上的应用。”

总之，时代在进步，下一代学的东西就是更抽象，不该拿老一套方法来要求学生们了。**他建议学生们去参加Kaggle竞赛，除了神经网络之外也用一用其他的机器学习模型，再通过可视化方法来探索其中的特征。**

“剑招”（tensorflow、keras、pytorch等平台）已经打包好了。Chollet希望未来的学生们知道什么时候该出哪一招，对于内部的原理，其实不必深究。

搞清细节未必是一开始就必须做的，我们可以折中一下，懂基本概念，平台使用，参数调整，读懂并会用别人代码，懂结果的基本分析，就已经可以算入门了。

### 用jupyter notebook学习各种入门教程
Jupyter notebook是适合python以及其他语言的开发环境，非常适合快速地进行实验以及学习。

Jupyter官方提供的的一些范例  [A gallery of interesting Jupyter Notebooks](https://github.com/jupyter/jupyter/wiki/A-gallery-of-interesting-Jupyter-Notebooks)，涵盖了很多用jupyter展示的不同的学科、语言、以及机器学习、数据科学等问题的入门教程。用这些教程可以更加可视化、更加方便地学习python和一些具体的python实践项目。

在服务器运行jupyter并在本地浏览器打开的设置在这里。[jupyter服务器配置](https://lulab.gitbooks.io/bioinfo-training-2018/content/19-xupeng-chen-linux.html)

[CS228 python and numpy tutorial](https://github.com/kuleshov/cs228-material/blob/master/tutorials/python/cs228-python-tutorial.ipynb)

这是著名的CS231n和CS228课程给学生共同准备的，**入门深度学习必备的python和numpy的知识**，可以让读者快速了解如何使用numpy对矩阵和张量进行操作。而且是用jupyter写的，可读性非常好，基本一个命令一个代码框，非常方便反复的尝试和理解。

#### 动手实践理解卷积：
##### 神经网络在做什么
这是一个很google的研究院制作的，给初学者体验神经网络是如何work的网页。非常有意思，可以让读者一下子就可视化地明白神经网络究竟在做什么。可以有很多选项来调试你的网络：
- 不同的函数对图案有不同的分割方式
- 通过增加隐藏层的数量，增加每层神经元数量
- 挑选不同的激活函数，如ReLU，tanh，Sigmoid
- 调整学习率、Bacth size，Cross validation的比例

可以直观地看到随着训练轮数增加损失函数在训练集和测试集上的变化，如果遇到了过拟合现象，还可以增加正则化项。可以看到这个全连接网络相邻层神经元之间的连接权重，甚至还可以自己手动调整权重。还可以看到每个神经元在“做什么”，即把图案分成了什么样子，你可以直观的看到通过线性和非线性组合，一个多层的简单神经网络就可以把一个分类或回归问题做的相当好。
[A Neural Network Playground](https://playground.tensorflow.org/#activation=tanh&batchSize=10&dataset=circle&regDataset=reg-plane&learningRate=0.03&regularizationRate=0&noise=0&networkShape=6,5,5,4&seed=0.88851&showTestData=false&discretize=false&percTrainData=50&x=true&y=true&xTimesY=true&xSquared=true&ySquared=true&cosX=false&sinX=true&cosY=false&sinY=true&collectStats=false&problem=regression&initZero=false&hideText=false). **(Recommend)**

##### 卷积神经网络为什么有效？
卷积神经网络可以看做是对视觉神经系统的一种简单模拟
1981 年的诺贝尔医学奖，颁发给了 David Hubel（出生于加拿大的美国神经生物学家） 和TorstenWiesel，以及 Roger Sperry。前两位的主要贡献，是**“发现了视觉系统的信息处理”，视觉皮层是分级的。**

对于不同的物体，人类视觉是通过逐层分级，来进行认知的：
![Markdown](http://i2.bvimg.com/640680/fefc8e3a01a27627.jpg)
<br>
在最底层特征基本上是类似的，即各种物体的非常抽象的边缘，越往上，越能提取出此类物体的一些**特征**（轮子、眼睛、躯干等），到更高级的层，不同的高级特征最终组合成相应的图像，从而能够让人类准确的区分不同的物体。

可不可以模仿人类大脑的这个特点，构造多层的神经网络，较低层的识别初级的图像特征，若干底层特征组成更上一层特征，最终通过多个层级的组合，最终在顶层做出分类呢？
这是许多深度学习算法（包括CNN）的灵感来源。其中非常重要的一步就是对图像从低级到高级的特征提取，Lecun等人发现了一种非常好的提取特征的方法，即卷积操作。

卷积网络通过一系列方法，成功将数据量庞大的图像识别问题不断降维，最终使其能够被训练。CNN最早由Yann LeCun提出并应用在手写字体识别上（MINST）。LeCun提出的网络称为LeNet，其网络结构如下：
![Markdown](http://i2.bvimg.com/640680/989124bdbb83b921.jpg)

这是一个最典型的卷积网络，由卷积层、池化层、全连接层组成。其中卷积层与池化层配合，组成多个卷积组，逐层提取特征，最终通过若干个全连接层完成分类。


卷积核(filter)，感受野，卷积核越小总参数量越小计算量也越小，但是能看到的区域小（折中：Dilated CNN）。
Feature map：每一层输入都是一系列叠在一起的二维feature map，与该层的不同卷积核相乘形成新的feature map。
此外还有pooling、padding等概念大家可以自行搜索。

##### 使用opencv中的卷积函数对图像进行变换
接下来就通过**代码**展示一下卷积是如何实际起作用的，通过opencv中的卷积函数可以对一张计算机视觉领域的经典图片进行一系列的操作。
<br>
![Markdown](http://i2.bvimg.com/640680/af93d6a2daaba726.png)

[代码在这里](https://pan.baidu.com/s/1L1Wf6tMuA49JtW3yiPDbhQ)  密码: qecg

代码参考了[这篇文章](https://blog.csdn.net/zouxy09/article/details/49080029)，可以发现通过简单的卷积操作（通过卷积核对原图像矩阵做线性变换）就可以实现边缘检测、锐化、浮雕等多种操作。
卷积操作天然地模拟了人眼对物体轮廓的检测，通过多个卷积、池化层的组合，可以解决深度学习领域不同的问题。目前除了图像识别、检测、分割会用到卷积，其他很多需要对数据特征进行抽象和提取的深度学习方法都会广泛的用到卷积操作，甚至包括自然语言处理、结构预测等等。


### 深度学习平台介绍
动手实践深度学习，重要的就是选择一个合适的平台，一个好的深度学习平台会把一些底层的组件实现完毕供人调用，比如卷积核、RNN cell，以及经过优化的反向传播必备的求梯度的方法，如果你手工用numpy实现以下CNN的反向传播，和Tensorflow之类的平台比一下训练的速度，就会发现这些平台在底层做了很多优化，大大提高的训练效率，这在深度学习中非常重要。

#### Tensorflow & Keras.  (Recommend)
##### 安装
目前应用最广泛的是谷歌家开发的Tensorflow，但是代码较为复杂，实现起来不是很容易。有很多基于tensorflow的高层库，其中最广受欢迎的是[剑气之争](https://mp.weixin.qq.com/s/R-29UGMvHyBp8OkWk7zdpw)中的剑宗代表人物Chollet开发的Keras。

安装起来颇为简单
```
#Tensorflow安装
$ pip install tensorflow      # Python 2.7; CPU support (no GPU support)
$ pip3 install tensorflow     # Python 3.n; CPU support (no GPU support)
$ pip install tensorflow-gpu  # Python 2.7;  GPU support
$ pip3 install tensorflow-gpu # Python 3.n; GPU support 
#Keras安装
pip install keras
```
还有其他的安装方式，参考：
[Tensorflow 安装](https://www.tensorflow.org/install/install_linux) 
[Keras 安装](https://keras.io/#installation)

##### 文档
Tensorflow和Keras都有很详细的文档支持，包括热心用户翻译的中文文档（已经成文官方中文文档）和社区。比如[Keras中文文档](https://keras-cn.readthedocs.io/en/latest/),[TensorFlow中文社区-首页](http://www.tensorfly.cn/)

因为两个库还处于快速迭代更新的阶段，所以有的时候去它们的github仓库搜索相关的代码也是个解决问题的方式。

[Keras github](https://github.com/keras-team/keras) 该项目共有接近30,000 star

[Tensorflow github](https://github.com/tensorflow/tensorflow)  该项目共有超过90,000 star

更推荐入门和简单使用时选择Keras，可以和Tensorflow无缝衔接，但是语法简单很多。

##### Tensorboard监控学习情况
Tensorboard是Tensorflow的一大利器，Keras也可以无缝使用Tensorboard，而且在Keras中的使用要简单得多。
```
model.fit(images_train, y_train, batch_size=32,nb_epoch=150,validation_split=0.2,
callbacks[model_checkpoint,EarlyStopping(monitor='CrossEntropyLoss', patience=10),TensorBoard(log_dir='path)])

#训练完成后，输入：
tensorboard --logdir=path
#即可在本地浏览器打开查看训练情况
```
Tensorboard可以帮助可视化loss曲线的变化，各项指标的变化，重要参数的分布，计算图的图像等，可以清楚地看到整个网络的逻辑，这些对于分析训练的过程，调整参数都非常有用。

参考链接：[06：Tensorflow的可视化工具Tensorboard的初步使用 - CSDN博客](https://blog.csdn.net/sinat_33761963/article/details/62433234)

#### Pytorch  (Recommend)
作为深度学习平台的后起之秀，被Facebook接管的pytorch虽然发布不是很久，但是极受推崇

在Pytorch发布不到三个月的时候，CS231n课程上已经把作业的实现平台列为Tensorflow和Pytorch二选一，而且在评价各个平台时认为‘**Pytorch is Best**’

深度学习领域的大神贾扬清说：“如果你想认真学machine learning，那请不要用keras，我一般收到的反馈是，keras做简单的东西容易，一旦你要做点真research，就很难改，因为包装太多。”
而Tensorflow虽然可以用来做真正的research，但是它的的问题在于其对于代码水平要求非常高，整个系统抽象层次比较高，有些臃肿，其静态图的构建方式使得更改网络结构很不方便。因此在考虑了模型构建和调试时间的情况下，Pytorch反而效率更高，对人类友好得多。CS231n的著名讲师、Tesla的AI主管Karpathy就这样评价Pytorch:

![Markdown](http://i2.bvimg.com/640680/58bc934f371dcd6f.jpg)

Pytorch优点：
- 入门简单，上手快，堪比Keras。
- 代码清晰，设计直观，符合人类直觉。
- Facebook托管，质量不需担心，迭代很快。
- 定位是快速实验研究，使用动态图设计，构建新层很迅速
- 社区友好，问题解答迅速
![Markdown](http://i2.bvimg.com/640680/71440c6ba2a94251.jpg)
可以看到，pytorch的代码的简洁性已经和numpy做普通的科学计算差不多了，比Tensorflow要简洁许多。

**安装pytorch**：

打开页面[PyTorch](http://pytorch.org/) ，选择所需要的配置即可，最简单的方法是使用conda安装，非常简介，如linux，python2.7，CUDA8.0，运行下面命令即可：
```
conda install pytorch torchvision -c pytorch
```

最后用Pytorch创始人的话结束：
PyTorch，就让学生们能充分利用普通Python代码的灵活性和能力，来构建、训练神经网络。这样，他们就能解决更广泛的问题。
PyTorch的另一个好处是，它能让学生们更深入地了解每个算法中发生了什么。用TensorFlow那样的静态计算图库，你一旦声明性地表达了你的计算，就把它发送到了GPU，整个处理过程就是一个黑箱。
但是通过动态的方法，你可以完全进入计算的每一层，清楚地看到正在发生的情况。我们认为学习深度学习的最佳途径就是通过编程、实验，动态的方法正是我们的学生所需要的。

#### 高层库
包括[Gluon](https://zh.gluon.ai/)、[Sonnet](https://github.com/deepmind/sonnet)、[TFLearn](http://tflearn.org/)、[TensorLayer](https://github.com/tensorlayer/tensorlayer)等
代码一般更加简洁，适合快速上手学习，但是可能不方便进行深入的研究。

#### 关于平台的一些教程
这里推荐的教程都是用jupyter notebook写的，这样非常适合自己一步一步运行代码，尤其适合学习pytorch和keras

##### 深度学习框架PyTorch：入门与实践
这个github仓库是[深度学习框架PyTorch的相关代码](https://github.com/chenyuntc/pytorch-book)，也可以作为一个独立的PyTorch入门指南和教程。也是用jupyter notebook教学的，而且Pytorch的特性导致在学习的过程中可以方便地查看变量，很适合初学者，而且该教程用Pytorch实现了几个非常有趣的例子，比如用这两年很火的生成对抗网络(GAN)做了一个生成动漫头像的模型，对图片进行风格迁移以及用神经网络写诗，虽然这不是作者的原创，但是作者的讲解稍微完善，本身就是为了向读者讲解用的，因此更加易于学习

##### Keras Tutorials   (Recommend)
[Keras-Tutorials](https://github.com/xingkongliang/Keras-Tutorials)
中国人用jupyter notebook写的教程，利用几个经典问题和模型教授Keras相关知识。



#### 几个不错的基于深度学习平台的学习资源

##### 动手学深度学习（基于GLUON） (Recommend)
[动手学深度学习 — GLUON](https://zh.gluon.ai/)

Gluon是基于MXNet的接口，我认为Gluon虽然比较小众，但是代码的清新简洁程度和Pytorch差不多，也很适合用来学习深度学习中的基本概念。

这个教程是GLUON的开发者亲自完成的，我认为写的非常漂亮，讲解的非常清晰又不乏深度，因此把这个教程排到了第一位。它从线性回归、逻辑回归、感知机开始一路讲到CNN、RNN这样的基础网络，再到计算机视觉和自然语言处理两大经典领域，而且非常注重实践，比如它有一个章节专门讲了个如何用Gluon实战Kaggle上的一个对狗的图片进行分类的问题[实战Kaggle比赛——使用Gluon识别120种狗](https://zh.gluon.ai/chapter_computer-vision/kaggle-gluon-dog.html)

该文档还在不断更新，最近几个月增加了很多新内容，是一个很好的可以跟着学的教程。

该教程还有视频教学[《动手学深度学习》第一季课程汇总 - 课程信息 - MXNet/Gluon论坛](https://discuss.gluon.ai/t/topic/753)

##### DeepLearningProject
一个比较受欢迎的原Harvard TA的对机器学习和深度学习的介绍，每个部分都不是很长，讲解的文字部分比较多，也很适合入门学习。
[DeepLearning Project](https://spandan-madan.github.io/DeepLearningProject/)

Github:[An in-depth machine learning tutorial introducing readers to a whole machine learning pipeline from scratch.](https://github.com/Spandan-Madan/DeepLearningProject)

##### DeepSchool.io
[deepschool.io: Deep Learning tutorials in jupyter notebooks.](https://github.com/sachinruk/deepschool.io)

也是个比较受欢迎的深度学习入门教学，也是用jupyter notebook写的，而且顺带讲了一些机器学习的概念，所以也很适合初学者来学习，包括带正则化的线性回归，如何调超参数，XGBoost和sklearn的使用，同时还有一些高级的模型和应用，比如迁移学习，强化学习、对抗网络、语义分析等等。

##### 其他类似的学习资源
- Fastai出的深度学习教学课程也十分好

[The fast.ai deep learning library, lessons, and tutorials](https://github.com/fastai/fastai)

- 一个讲了keras和Tensorflow的教程，从MLP到RNN的实现都讲了

[Introduction to Deep Neural Networks with Keras and Tensorflow](https://github.com/leriomaggio/deep-learning-keras-tensorflow)
- DeepLearningZeroToAll，这个教程还有视频，用了mxnet、Pytorch、keras在内的多个平台，也很受欢迎。

[DeepLearningZeroToAll: TensorFlow Basic Tutorial Labs](https://github.com/hunkim/DeepLearningZeroToAll)




## 动手实践部分

### 气宗派：徒手实现simple neural network

[这个系列](https://github.com/zotroneneis/machine_learning_basics)是一个女程序员做的，笔记写的相当好，有详细的公式推导，有很多基础的机器学习的算法和讲解。如果想深入理解诸如前向与反向传播的梯度计算等细节的话可以仔细研究，同样是用jupyter notebook写的，在能够讲解数学原理比较深入的那些教程中应该算是比较友好易学的一个。



### MNIST手写数据识别问题 level 1
使用Keras方便地搭建MLP和CNN等神经网络解决一个具体的图像识别问题
![Markdown](http://i2.bvimg.com/640680/35dfa92b54debbe6.png)

MNIST是一个手写数据集，被誉为机器学习的果蝇(Geofrrey Hinton)，几乎是每一个入门者会尝试的数据集。

这里使用了两种网络**MLP和CNN**来解决手写数据的分类问题，从载入数据、可视化数据、one hot coding、搭建网络、训练以及测试都有展示。

还可以使用**Tensorboard**可视化训练过程。

[代码在这里](https://pan.baidu.com/s/1L1Wf6tMuA49JtW3yiPDbhQ)  密码: qecg


### MNIST手写识别及语义分析 level 2
这是清华大学人工神经网络课程的四次作业：使用numpy实现MLP和CNN，以及使用Tensorflow实现CNN和RNN并用于解决手写数字识别以及语义分割问题，这四个任务的详细要求、数据集和解答已经上传到百度网盘，可以作为一个练习。[代码在这里](https://pan.baidu.com/s/1L1Wf6tMuA49JtW3yiPDbhQ)  密码: qecg。注意在作业中，大多数的代码是写好的，只有少量代码需要自己添加
- 用numpy实现MLP解决手写识别
- 用numpy实现CNN解决手写识别
- 用tensorflow基本函数实现CNN模块与其他结构解决手写识别
- 用tensorflow基本函数实现RNN基本模块解决语义分析



同时这个作业和CS231n的作业十分相像，大家也可以参考这个github仓库：
[一个学生的CS231n作业](https://github.com/bruceoutdoors/CS231n)  

它的代码是用jupyter notebook记录的。用numpy实现MLP和CNN的过程相当繁琐，因此用jupyter notebook来学习应该更容易一些。


### 使用U-net探索Deepshape问题基本介绍
[代码在这里](https://pan.baidu.com/s/1L1Wf6tMuA49JtW3yiPDbhQ)  密码: qecg

#### 数据形式
将同一个序列片段重复128次，用16维one hot向量编码，每个片段形成128*128*16通道的图片
#### U-net
U-net属于一种全卷积网络（FCN），是解决图像分割尤其是医疗图像问题的非常经典和有用的网络，因为全卷积的设计，可以最终输出图像每个像素点的预测值，而不仅仅是一个或几个数值.
一个经典的U-net如图所示
![Markdown](http://i2.bvimg.com/640680/acf000d769f49e4f.png)

[U-Net 简介](https://blog.csdn.net/hduxiejun/article/details/71107285)
[U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597)
#### 设计
经典的U-net、VGG、Resnet等网络框架，网络上不但有大量的代码，而且还提供了预训练的模型，即在一些公开的数据集，比如ImageNet上预训练过的网络，将其权重存储下来，Keras提供了model. load_model以及load_weights方便用户导入他人提供的模型权重，还可以通过save存储自己的训练好的模型，以备预测或者以后使用。
```
model = UNET_128()
optim = Adam()
model.compile(optimizer=optim, loss=CrossEntropyLoss(model,10), metrics=[binary_accuracy_with_nan,binary_crossentropy_with_nan,MSE(model)])
```
这里我们采取了Adam作为优化器，它是一种比普通的梯度下降更为有用的方法，Keras在这里列出了多种优化器供选择[优化器Optimizer - Keras中文文档](https://keras-cn.readthedocs.io/en/latest/other/optimizers/)
Loss function我们使用了自己定义的交叉熵，这是因为我们需要对网络进行一些额外的设计：根据我们所生成的图像，其必然是**对称的**，但是在开始尝试时，模型并不能顾及到这一点，因此我们对模型进行了一些额外的设计：
（要注意一点，为了模型能够顺利地进行求梯度以便进行训练，Keras、Tensorflow都要求相关的损失函数和网络层定义必须使用其自己提供的相关函数，而不能用numpy直接做矩阵操作。比如用K.sum()代替np.sum()进行求和。）

##### 使用Lambda函数按列对图像求平均值
```
final = Lambda(lambda x: K.sum(x, axis=1), output_shape=(128,))(conv_final)
#sum by columns output a vector of 128 elements
final_ = Reshape((128,), input_shape=(128,1))(final)
final =Lambda(lambda x: x/128.0, output_shape=(128,))(final_)
```
因为虽然最终预测结果依然是图像，但是我们的y是一维的向量，我们需要讲对整幅图像的预测值做按行或者按列的平均，再和true value比较。
##### 维持对称性设计
这里我们使用了特殊的交叉熵函数，交叉熵是一种经典的衡量分类准确率的损失函数，Keras同样提供了很多种损失函数可供选择[Losses - Keras Documentation](https://keras.io/losses/)，这里要特别注意的是数据中的y有很多NaN值，因此不考虑缺失值点。
在我们定义的CrossEntropyLoss损失函数中，我们额外增加了一项用MSE来衡量对称性。通过Keras提供的函数model.get_layer，我们可以方便的操作对网络内部的某层进行操作，我们对网络的最后一个卷积层进行对角线对称性的衡量，添加进损失函数中，在接下来的训练中，预测出的结果的对称性得到了很好的改善。这里也可以体现出深度学习通过损失函数的设计来约束模型的训练就可以达到自己的某种目的“方便”。
```
def binary_crossentropy_with_nan(y_true, y_pred):
    not_nan = tf.logical_not(tf.is_nan(y_true))
    y_true = tf.boolean_mask(y_true, not_nan)
    y_pred = tf.boolean_mask(y_pred, not_nan)
    return K.mean(K.binary_crossentropy(y_pred, y_true), axis=-1)

#define new loss using output layer and hidden layer
class CrossEntropyLoss(object):
    def __init__(self, model,alpha):
        self.layer = model.get_layer(index = -8).output
        self.__name__ = 'CrossEntropyLoss'
        self.alpha = alpha
    def __call__(self,y_true, y_pred):
        return binary_crossentropy_with_nan(y_true, y_pred) + self.alpha * mean_squared_error(self.layer,tf.transpose(self.layer, perm=[0, 2, 1, 3]))
```
使用model.summary还可以查看网络的结构，每层的数据的维度。

##### 训练
接下来就是用数据训练数据，可以定义的参数包括每批投入的样本量，轮数，是否混合，cross validation的比例，是否需要提前中止训练，训练过程保存到Tensorboard，模型权重的保存等等
```
model_checkpoint = ModelCheckpoint('newunet__row_col_weights_mse.hdf5', monitor='binary_accuracy_with_nan', save_best_only=True)

def Model(images_train,y_train,cv,seq_counts):
    model.fit(images_train, y_train, batch_size=32, nb_epoch=150,verbose=1,shuffle=True,validation_split=0.2,callbacks=[model_checkpoint,EarlyStopping(monitor='CrossEntropyLoss',patience=10,verbose=0),TensorBoard(log_dir=path)])
    model.save(path)
```

使用K.function函数，可以查看一个输入数据每一层的输出情况，再通过画图可视化之后，非常适合对模型做进一步的分析。
```
inp = model.input                                           # input placeholder
outputs = [layer.output for layer in model.layers]          # all layer outputs
functor = K.function([inp]+ [K.learning_phase()], outputs ) # evaluation function
# Testing
layer_outs = functor([images_train[80], 1.])
```



