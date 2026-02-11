---
title: Jupyter自定义设置详解
pubDatetime: 2018-05-04T15:09:56Z
description: "下面就讲一下jupyter的一些高级玩法。"
author: "James Chen"
tags: ["techniques", "codes", "python"]
categories: ["techniques"]
draft: false
---

今天专门花时间总结梳理一下jupyter的一些高级设置，jupyter我已经介绍过一次基本内容了,[Setup and Linux | James Chen’s Blogs](https://james20141606.github.io/2018/04/12/setup/)，尤其是如何在服务器运行jupyter并且在本地浏览器显示，简直是使用python进行机器学习、深度学习、大数据的工作者的巨大福音。作为一个重度python&jupyter使用者，我已经习惯于在jupyter上进行大量的实验以及一次性的小工作、作业，需要跑很久的代码才会在运行通过后用VSCode编辑一下提交上去跑。用jupyter写了很多脚本，尤其适合可视化、展示和教学。可以在我的[GitHub](https://github.com/james20141606/)找到很多用jupyter写的代码，事实上很多教程和实验大家也都习惯于jupyter做了，比如我在这篇[Deep Learning Practice](https://james20141606.github.io/2018/04/10/Deep-Learning-Practice/)介绍的资源中就有大量用jupyter写的。

下面就讲一下jupyter的一些高级玩法。

## 自定义主题
https://github.com/dunovank/jupyter-themes
![Markdown](http://i4.fuimg.com/640680/6dd3179b5d60eccb.png)


## jupyter  extension
**相见恨晚，用着非常非常爽，强烈推荐**
https://github.com/ipython-contrib/jupyter_contrib_nbextensions

```
pip install jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
pip3 install jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
```

### 推荐使用的插件
#### table of contents
设置着很简单，找到后打个对勾就行了，**效果很棒**：
![Markdown](http://i4.fuimg.com/640680/5bfe6a9b5a48e822.png)

jupyter支持markdown，只需要将某个代码框选为markdown格式，使用table of contents插件，就会自动在左边栏生成目录。对于写的很长的代码，可以帮助整理思路，快速定位代码。大家用jupyter一般是做前期的各种各样的实验，思路可能比较发散，所以用table of contents可以帮忙梳理思路，也方便以后再寻找、理解代码

#### freeze
可以“冰冻”某个代码块，有个代码块儿暂时不再使用，就可以暂时冰冻，这样就无法运行，也不会被误删除。是个很有用的功能。
![Markdown](http://i4.fuimg.com/640680/a6412152652237a6.png)

#### highlighter
可以高亮注释
![Markdown](http://i4.fuimg.com/640680/5cf4c30a3f01295d.png)

#### Gist-it
Adds a button to publish the current notebook as a gist

#### Snippets menu
帮助懒人插入一些经典库的经典方法的代码块，感觉很不错哦，比去Stack Overflow搜要快一些~不过支持的还是比较少的。
![Markdown](http://i4.fuimg.com/640680/7fc861662f88de4a.png)

#### Snippet:
**强烈强烈推荐！**感觉有望帮助节约不少写代码的时间

![Markdown](http://i4.fuimg.com/640680/5a2fe35422f87b5e.png)

This extension adds a drop-down menu to the IPython toolbar that allows easy insertion of code snippet cells into the current notebook. The code snippets are defined in a JSON file in nbextensions/snippets/snippets.json and an example snippet is included with this extension

Snippets are specified by adding a new JSON block to the list of existing snippets in $(jupyter --data-dir)/nbextensions/snippets/snippets.json. **(I put my customized json file in jupyter-notebooks directory in /Users/james/)** For example, to add a new snippet that imports numpy, matplotlib, and a print statement, the JSON file should be modified。

先分别列一下各种情景下需要导入哪些库：

##### Basic science
```
import argparse, sys, os, errno
%pylab inline
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
plt.style.use('ggplot')
import seaborn as sns
import h5py
import os
from tqdm import tqdm
import scipy
import sklearn
from scipy.stats import pearsonr
import warnings
warnings.filterwarnings('ignore')
```

##### Highlevel plot
```
import matplotlib.animation as animation
from matplotlib import rc
from IPython.display import HTML, Image
rc('animation', html='html5')
import plotly
import plotly.offline as off
import plotly.plotly as py
import plotly.graph_objs as go
```

##### Deeplearning  keras
```
import keras
from keras import backend as K
from keras.callbacks import TensorBoard
from keras.callbacks import EarlyStopping
from keras.optimizers import Adam
from keras.callbacks import ModelCheckpoint
import tensorflow as tf
from keras.models import Model
from keras.layers import Input, Conv2D, MaxPooling2D, UpSampling2D,Lambda, Dot,average,add, concatenate
from keras.layers.normalization import BatchNormalization
from keras.layers.core import Dropout, Activation,Reshape
from keras.layers.merge import concatenate
from keras.callbacks import TensorBoard, EarlyStopping, ModelCheckpoint
from keras.initializers import RandomNormal
import os
os.environ['CUDA_DEVICE_ORDER'] = 'PCI_BUS_ID' 
os.environ['CUDA_VISIBLE_DEVICES'] = '4'
from keras.backend.tensorflow_backend import set_session
config = tf.ConfigProto()
config.gpu_options.per_process_gpu_memory_fraction = 0.99
set_session(tf.Session(config=config))
```

##### Pytorch
```
import torch
import math
import torch.nn as nn
import torch.nn.functional as F
```

总结起来就是下面这样，注意语法别错，东西一多看着还是很头疼的，配置好就可以用了。

```
{
    "snippets" : [
	{
		"name" : "science basic",
		"code" : [
			"import argparse, sys, os, errno",
			"%pylab inline",
			"import numpy as np",
			"import pandas as pd",
			"import matplotlib.pyplot as plt",
			"plt.style.use('ggplot')",
			"import seaborn as sns",
			"import h5py",
			"import os",
			"from tqdm import tqdm",
			"import scipy",
			"import sklearn",
			"from scipy.stats import pearsonr",
			"import warnings",
			"warnings.filterwarnings('ignore')"
		]
        },
	{
        	"name" : "high level plot",
        	"code" : [
                    "import matplotlib.animation as animation",
		    "from matplotlib import rc",
		    "from IPython.display import HTML, Image",
		    "rc('animation', html='html5')",
		    "import plotly",
		    "import plotly.offline as off",
		    "import plotly.plotly as py",
		    "import plotly.graph_objs as go"
                ]
        },
	{
		"name" : "deep learning",
		"code" : [
			"import keras",
			"from keras import backend as K",
			"from keras.callbacks import TensorBoard",
			"from keras.callbacks import EarlyStopping",
			"from keras.optimizers import Adam",
			"from keras.callbacks import ModelCheckpoint",
			"import tensorflow as tf",
			"from keras.models import Model",
			"from keras.layers import Input, Conv2D, MaxPooling2D, UpSampling2D,Lambda, Dot,average,add, concatenate",
			"from keras.layers.normalization import BatchNormalization",
			"from keras.layers.core import Dropout, Activation,Reshape",
			"from keras.layers.merge import concatenate",
			"from keras.callbacks import TensorBoard, EarlyStopping, ModelCheckpoint",
			"from keras.initializers import RandomNormal",
			"import os",
			"os.environ['CUDA_DEVICE_ORDER'] = 'PCI_BUS_ID'",
			"os.environ['CUDA_VISIBLE_DEVICES'] = '4'",
			"from keras.backend.tensorflow_backend import set_session",
			"config = tf.ConfigProto()",
			"config.gpu_options.per_process_gpu_memory_fraction = 0.99",
			"set_session(tf.Session(config=config))"
			]
		},
	{
        	"name" : "pytorch",
        	"code" : [
                    "import torch",
		    "import math",
		    "import torch.nn as nn",
		    "import torch.nn.functional as F"
                ]
        }
    ]
}
```

这个配置这里坑了我很久，主要是snippets不会显示错误信息，debug得很仔细一个一个找，因此花了很久发现是keras部分的几个破双引号冲突了，还有一个注释竟然也忘删了，折腾了很久才配置好。用sublime text是可以很容易发现语法错误的，可惜最开始没在意

update on 02/05/2020:
```
{
    "snippets" : [
    {
        "name" : "science basic",
        "code" : [
            "import gc, argparse, sys, os, errno",
            "%pylab inline",
            "import numpy as np",
            "import pandas as pd",
            "import matplotlib.pyplot as plt",
            "import seaborn as sns",
            "#sns.set()",
            "#sns.set_style('whitegrid')",
            "import h5py",
            "from PIL import Image",
            "import os",
            "from tqdm import tqdm_notebook as tqdm",
            "import scipy",
            "import sklearn",
            "from scipy.stats import pearsonr",
            "import warnings",
            "warnings.filterwarnings('ignore')"
        ]
        },
    {
            "name" : "high level plot",
            "code" : [
                    "import matplotlib.animation as animation",
            "from matplotlib import rc",
            "from IPython.display import HTML, Image",
            "from ipywidgets import interact,Dropdown,IntSlider,FloatRangeSlider, FloatSlider, RadioButtons",
             "rc('animation', html='html5')",
            "import plotly",
            "import plotly.offline as off",
            "import plotly.plotly as py",
            "import plotly.graph_objs as go"
                ]
        },
    {
        "name" : "deep learning",
        "code" : [
            "import keras",
            "from keras import backend as K",
            "from keras.callbacks import EarlyStopping,TensorBoard,ModelCheckpoint",
            "from keras.optimizers import Adam",
            "import tensorflow as tf",
            "from keras.models import Model,Sequential",
            "from keras.layers import Merge,Input,Conv1D,  Conv2D, MaxPooling1D,MaxPooling2D, UpSampling2D,Lambda, Dot,average,add, concatenate,GlobalMaxPooling1D, GlobalMaxPooling2D, AveragePooling1D",
            "from keras.layers.normalization import BatchNormalization",
            "from keras.layers.core import Dense, Dropout, Activation, Flatten,Reshape",
            "from keras.layers.merge import Concatenate, Add",
            "from keras.initializers import RandomNormal",
            "from keras.regularizers import l2, l1, l1_l2",
            "from keras.layers.wrappers import Bidirectional",
            "from keras.layers.recurrent import LSTM",
            "from functools import partial",
            "import os",
            "os.environ['CUDA_DEVICE_ORDER'] = 'PCI_BUS_ID'",
            "os.environ['CUDA_VISIBLE_DEVICES'] = '4'",
            "from keras.backend.tensorflow_backend import set_session",
            "config = tf.ConfigProto()",
            "#config.gpu_options.per_process_gpu_memory_fraction = 0.99",
            "config.gpu_options.allow_growth =True",
            "set_session(tf.Session(config=config))"
            ]
        },
    {
            "name" : "pytorch",
            "code" : [
            "import torch",
            "import math",
            "import torch.nn as nn",
            "import torch.nn.functional as F"
                ]
        },
    {
            "name": "misc",
            "code" : [
            "%lsmagic",
            "%store",
            "%who",
            "<div class='alert alert-block alert-success'>",
            " This is <b>gooood</b>!",
            "</div>",
            "InteractiveShell.ast_node_interactivity = 'all'",
            "%%time",
            "%%writefile utils.py",
            "from IPython.core.interactiveshell import InteractiveShell",
            "import pandas_profiling",
            "#anndate_df.iloc[:5000].profile_report()"
            ]
        },
    {
        "name": "finace",
        "code" : [
            "from io import BytesIO",
            "from ipywidgets import interact,interactive, FloatSlider,IntSlider, RadioButtons,Dropdown,Tab,Text",
            "from pyecharts import Grid, Bar, Line, Kline, Overlap",
            "import talib",
            "import numpy as np",
            "import tushare as ts"
        ]
    },
    {
        "name": "IFTTT",
        "code" : [
            "from py2ifttt import IFTTT",
            "ifttt = IFTTT('iOn2wIPNnZW2r9uNgo_azDyi3Qw-n5COZp85qFbWrHG', 'jupyter training notification')",
            "# IFTTT notification",
            "model_name = 'AutoEncoder'",
            "training_loss = 0.2",
            "test_loss = 0.1",
            "ifttt.notify(model_name, str(training_loss), str(test_loss))"
        ]
    },
    {
        "name": "toggle one cell",
        "code" : [
            "from IPython.display import HTML",
            "import random",
            "def hide_toggle():",
            "    this_cell = '''$('div.cell.code_cell.rendered.selected')'''",
            "    next_cell = this_cell + '.next()'",
            "    toggle_text = 'Toggle show/hide'  # text shown on toggle link",
            "    target_cell = this_cell  # target cell to control with toggle",
            "    js_hide_current = ''  # bit of JS to permanently hide code in current cell (only when toggling next cell)",
            "    js_f_name = 'code_toggle_{}'.format(str(random.randint(1,2**32)))",
            "    html = '''<script>function {f_name}() {{{cell_selector}.find('div.input').toggle();}}{js_hide_current} </script>",
            "        <a href='javascript:{f_name}()'>{toggle_text}</a>'''.format(f_name=js_f_name,cell_selector=target_cell,",
            "        js_hide_current=js_hide_current, toggle_text=toggle_text)",
            "    return HTML(html)",
            "hide_toggle()"
        ]
    },
    {
        "name": "toggle all",
        "code" : [
            "from IPython.core.display import HTML,Image",
            "HTML('''<script> code_show=true;  function code_toggle() {  if (code_show){  $('div.input').hide();  } else {  $('div.input').show();  }  code_show = !code_show }  $( document ).ready(code_toggle); </script> <form action='javascript:code_toggle()'><input type='submit' value='Toggle Code'></form>''')"
        ]
    },
    {
        "name": "subplots",
        "code" : [
            "fig,ax=plt.subplots(10,10,figsize=(30,30))",
            "for i in range(10):",
            "    for j in range(10):",
            "        ax[i,j].imshow(images_example[i*10+j])",
            "        ax[i,j].set_title(text_annotate[i,j])",
            "fig.tight_layout()"
        ]
    }
    ]
}
```


本地的snippets.json在：

```
/Users/james/Library/Jupyter/nbextensions/snippets/snippets.json
```

我在james目录下也放了一份，因为最近估计需要不断更新完善，所以就放一份在：

```
/Users/james/snippets.json
```

每次修改后，需要同步到本地以及ibme、cnode、hpc1几个机器上面，这样**不用我几个地方都各自改一遍**，费事。

首先找到各个机器上的json文件在哪儿

```
$(jupyter --data-dir)/nbextensions/snippets/snippets.json
```

然后写个同步的脚本syncsnip.sh

```
cp /Users/james/snippets.json /Users/james/Library/Jupyter/nbextensions/snippets/snippets.json
rsync -avzh /Users/james/snippets.json ibme:/Share/home/chenxupeng/.local/share/jupyter/nbextensions/snippets/
rsync -avzh /Users/james/snippets.json cnode:/home/chenxupeng/.local/share/jupyter/nbextensions/snippets/snippets.json
rsync -avzh /Users/james/snippets.json hpc1:/home/chenxupeng/.local/share/jupyter/nbextensions/snippets/
```

然后做个同步快捷方式：

```
alias snip='bash syncsnip.sh'
```

测试几个机器的配置均通过

配置好了还是很美的：

![Markdown](http://i1.fuimg.com/640680/c493f72487089e34.png)


jupyter dashboard
看起来是可以进一步帮助展示的利器
```
pip install jupyter_dashboards
jupyter dashboards quick-setup --sys-prefix
jupyter nbextension install --py jupyter_dashboards --sys-prefix
jupyter nbextension enable --py jupyter_dashboards --sys-prefix
```

不过用了一下，过分自动化的布局反而限制的比较死，，不太好看

### hide input
不显示code，只显示output，适合展示时用。

### ipywidgets interactive coding
使用专为jupyter设计的ipywidgets，可以更好地展示、调整代码，尤其适合运行较快、有较多参数需要探索、选取的场合，比如绘图

以使用python的seaborn绘制boxplot为例，我们有多个参数待选，比如：
- context & style 可以设置不同的背景和字体风格
- width & height 设置图片的宽和高
- boxplot/violinplot 使用传统的box表示还是用可以同时表示点的分布密度的violinplot表示
- showdot & showbox  可以选择是否显示点，以及是否显示box，或者同时都显示、都不显示
- fondsize & dotsize，分别调整文字大小和点的大小
- boxwidth 调整box和violin的宽度
- ylim 调整纵坐标的最大与最小值
- compareheight*  调整几个注释文字距离box顶点的高度
- palettesind 选择第几套配色方案
- saturation 调整色彩饱和度

可以看到python的绘图函数一般都留有很大的调整空间，可选参数较多，可以组合出很多效果，但是也给调整带来了很多麻烦。如果把这些参数都传入绘图函数中，每次调整其中的一个或几个，依照经验来调整，效率就比较低。这个时候就可以考虑使用ipywidgets方便地调整这些参数。通过ipywidgets，可以把这些控制浮点型、整型或字符串控制参数用Float、Int slider、Dropdown，RadioButtion等控制，不需要每次更改参数再运行代码框，可以快速地调整出自己想要的图像。

效果如下：

![Markdown](http://i4.fuimg.com/640680/a5c74f6ebc23a233.png)

一份示例代码plots_roc.ipynb放在了[something more](https://github.com/james20141606/somethingmore/interact_plot)



