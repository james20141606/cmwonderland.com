---
title: MAC用automator创建小应用解决一些简单需求
pubDatetime: 2018-05-22T17:35:37Z
description: "显然既然automator还可以用shell脚本，能低成本实现的东西还是很多的。"
author: "James Chen"
tags: ["techniques", "mac", "setup"]
categories: ["techniques"]
draft: false
---

**本来是要解决mac一个很蠢的问题的：无法新建文件。**

之前的策略有两种：一是复制粘贴其他的文件过来。另一个是cd到当前目录下然后touch一个文件。这个有点麻烦，首先cd还得拖到终端一个文件才能找对位置。

这次用了Mac自带的automator自己做一个简单的生成新文件的应用，非常简单。

显然既然automator还可以用shell脚本，能低成本实现的东西还是很多的。



<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=21224493&auto=1&height=66"></iframe>

## STEPS
### open automator
#### select application

![Markdown](http://i4.fuimg.com/640680/f7023d7d9b64c7a6.png)


#### select AppleScript on left bar


**WRITE**
```
on run {input, parameters}

	tell application "Finder"
	set selection to make new file at (get insertion location)
	end tell

	return input
end run
```


### save as file.app in somewhere

> YOU can use your own icon, just change the picture to icns and drag it to apps/contents/resources to replace the original one. And also copy your picture to the **Get Info Menu**

### customize toolbar
#### drug your new application to toolbar

![Markdown](http://i4.fuimg.com/640680/a26d9176d1204015.png)



**DONE**

![Markdown](http://i4.fuimg.com/640680/8d684b37c5e1ad34.png)


**NEXT TIME click the button above to enjoy your design**

As you can see, I design another one to sync my scripts, contents:

```
rsync -avzh /Users/james/Desktop/website/jamesblog /Volumes/New\ Drive/
rsync -avzh /Users/james/Desktop/bear /Volumes/New\ Drive/
rsync -avzh /Users/james/Desktop/爷爷回忆录gitbook /Volumes/New\ Drive/
rsync -avzh /Users/james/Desktop/三春 /Volumes/New\ Drive/
rsync -avzh --max-size='5M' --exclude-from='exclude_me.txt' hpc1:~/projects/ /Volumes/New\ Drive/hpc1backup
rsync -avzh --max-size='5M' --exclude-from='exclude_me.txt' ibme:~/projects/ /Volumes/New\ Drive/ibmebackup
cp /Users/james/snippets.json /Users/james/Library/Jupyter/nbextensions/snippets/snippets.json
rsync -avzh /Users/james/snippets.json ibme:/Share/home/chenxupeng/.local/share/jupyter/nbextensions/snippets/
rsync -avzh /Users/james/snippets.json cnode:/home/chenxupeng/.local/share/jupyter/nbextensions/snippets/snippets.json
rsync -avzh /Users/james/snippets.json hpc1:/home/chenxupeng/.local/share/jupyter/nbextensions/snippets/
```


![Markdown](http://i4.fuimg.com/640680/4c85f5ca77cab348.png)

