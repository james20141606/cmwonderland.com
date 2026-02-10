---
title: MDN for Signal Position Prediction
pubDatetime: 2018-10-09T00:50:56Z
description: "We collaborate with Jun Li in New York University."
author: "James Chen"
tags: ["project", "signal", "machine learning", "MLP", "Mixture model", "MDN", "attention mechanism"]
categories: ["projects"]
math: true
draft: false
---


This page summarize our work on using mixture density network to jointly predict position coordinates.

We collaborate with Jun Li in New York University. 


## presentation of current work
<iframe src="https://drive.google.com/file/d/12kdQZKUrz-z_4k-eSW83ogKvTRwPjn3o/preview" width="100%" height="600px"></iframe>



## methods

### model
We use pytorch and tensorflow to develop our mixture density network. 

- A MLP is used to generate pi, mu and sigma for 2D isotropic gaussian distribution.
- Several 2D gaussian distribution is mixed to form a mixed gaussian distribution.
![Markdown](http://i2.tiimg.com/640680/4d39615fdca66f67.png)
- We use Maximum Likelihood Estimation, choose negetive log likelihood as our loss function for optimization
- 
![Markdown](http://i2.tiimg.com/640680/abf549073048f5f9.png)


Several tricks:

- deal with loss nan: we use log transform of signa, mu and pi, also a cutoff of sigma and pseudo counts of pi is used to prevend loss explosion of vanishing
- z score normalization to optimize the model easier.
- we use mean shift to find modes in gaussian mixture

![Markdown](http://i2.tiimg.com/640680/0ef0ba152c39f99f.png)

### result
![Markdown](http://i2.tiimg.com/640680/e7e107d4d04e6849.png)

### data
#### mountain data
- data position
![Markdown](http://i2.tiimg.com/640680/1668bdf4741445b1.png)
- t-SNE to cluster data
![Markdown](http://i2.tiimg.com/640680/c06e0baac3381bc4.png)
- feature distribution
![Markdown](http://i2.tiimg.com/640680/258900a437c4a544.png)

#### city data
- data position
![Markdown](http://i2.tiimg.com/640680/c84923de5dd7b62a.png)
- receriver position
![Markdown](http://i2.tiimg.com/640680/37d804dc03e44805.png)
- transmitter position
![Markdown](http://i2.tiimg.com/640680/ed56538e48c4a54f.png)

#### explore useful features
We use PCC to quantify the PCC between samples' features and distance. We use dynamic weight to pick features having higher relation with distance. It seems TOA has the significant higher weight
![Markdown](http://i2.tiimg.com/640680/1533405e66d3b4c4.gif)

We plan to use some **imputation method**, including some methods from single cell analysis. We also aim to use **RNN** for changeable size feature and **attention model** to pick more related features.


## codes

https://github.com/james20141606/Signal

