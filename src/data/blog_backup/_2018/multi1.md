---
title: Multivariate Statistics Assignment 4
pubDatetime: 2018-05-16T12:59:19Z
description: "The fourth assignment of Multivariate Statistics. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running."
author: "James Chen"
tags: ["codes", "R", "assignment", "statistics", "linear regression"]
categories: ["school work"]
math: true
draft: false
---

The fourth assignment of Multivariate Statistics. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running.


> **most recommend:** [**click here**](https://www.cmwonderland.com/multihw4.html) for **html version** of assignment, you can see codes as well as plots.

You may also find the [**PDF Version**](https://github.com/james20141606/somethingmore/tree/master/multi-variable_pdf) of this assignment from github. **Or if you can cross the fire wall, just see below**:
<iframe src="https://drive.google.com/file/d/1w9ByeBbuVBKFxahOIrwu2oZFuFXydeKa/preview" width="100%" height="600px"></iframe>


# 1 
```r
mp <- matrix(c(5,2,2,2),2,2,byrow=T) 
eigen(mp)
```
$$
\text{The eigenvalue-eigenvector pairs are } \lambda_1 =6, e_1 =  [\frac{2}{\sqrt5},\frac{1}{\sqrt5}]; \lambda_2 =1, e_2 =  [-\frac{1}{\sqrt5},\frac{2}{\sqrt5}].\\
\text{Therefore, the principle componenets become: }\\
Y_1 = e_1^T X = \frac{2}{\sqrt5}X_1 +\frac{1}{\sqrt5}X_2\\
Y_1 = e_2^T X = -\frac{1}{\sqrt5}X_1 +\frac{2}{\sqrt5}X_2\\
\text{The total population variance explained by first principal component is:}\\
\frac{var(Y_1)}{var(Y_1)+var(Y_2)} = \frac{\lambda_1}{\lambda_1+\lambda_2} = \frac{6}{1+6} \approx 85.71\%
$$

# 2
## a
```r
cov2cor(mp)
```
$$
\text{The correlation matrix } \rho = \left[
\begin{matrix}
1 & \sqrt\frac{2}{5} \\
\sqrt\frac{2}{5}&1
\end{matrix}\right]\\
\text{The eigenvalue-eigenvector pairs are }\\
\lambda_1
= \frac{5+\sqrt {10}}{5}, \ e_1=\left[
\begin{matrix}
\frac{1}{\sqrt 2} \\
\frac{1}{\sqrt 2}
\end{matrix}\right]\\
\lambda_1
= \frac{5-\sqrt {10}}{5}, \ e_1=\left[
\begin{matrix}
-\frac{1}{\sqrt 2} \\
\frac{1}{\sqrt 2}
\end{matrix}\right]
$$
$$
Let \ \mathbf{Z_i} = \frac{\mathbf{X_i}-\mu_i}{\sqrt {\sigma_{ii}}}, i =1,...,p. \text{The principal components become:}\\
Y_1 = e_1^T Z = \frac{1}{\sqrt2}Z_1 +\frac{1}{\sqrt2}Z_2\\
Y_1 = e_2^T Z = -\frac{1}{\sqrt2}Z_1 +\frac{1}{\sqrt2}Z_2\\
\text{The total population variance explained by first principal component is:}\\
\frac{var(Y_1)}{var(Y_1)+var(Y_2)} = \frac{\lambda_1}{\lambda_1+\lambda_2} = \frac{5+\sqrt{10}}{10} \approx 81.6\%
$$

## b
The principal components of Z obtained from the eigenvectors of the correlation
matrix ρ of X is different from those calculated from covariance matrix $\Sigma$. Because
the eigen pairs derived from $\Sigma$, in general not the same as the ones derived from $\rho$

## c
THe correlations between $Y_j$ and $Z_i$ are:
$$
\rho_{Y_1,Z_1} = e_{11}\sqrt {\lambda_1} = \frac{1}{\sqrt2}\sqrt \frac{5+\sqrt {10}}{5} \approx0.903 \\
\rho_{Y_1,Z_2} = e_{12}\sqrt {\lambda_1} = \frac{1}{\sqrt2}\sqrt \frac{5+\sqrt {10}}{5} \approx0.903 \\
\rho_{Y_2,Z_1} = e_{21}\sqrt {\lambda_2} = - \frac{1}{\sqrt2}\sqrt \frac{5-\sqrt {10}}{5} \approx -0.429
$$

# 3
## a
```r
# read the data
setwd('~/Desktop/三春/3多元统计分析/作业/作业4/')
dat<-read.csv("table8.4.csv")
X1<-dat$x1
X2<-dat$x2
X3<-dat$x3
X4<-dat$x4
X5<-dat$x5
covar <- cov(dat)
covar
```

```r
eigen(cov(dat))
prcomp(dat)
summary(prcomp(dat))
```


$$
Y_1 = e_1^T X= -0.2228228 X_1  -0.3072900 X_2 -0.1548103 X_3 -0.6389680 X_4 -0.6509044 X_5\\
Y_2 = e_2^T X = 0.6252260 X_1 + 0.5703900 X_2 +0.3445049 X_3 -0.2479475 X_4 -0.3218478 X_5\\
Y_3 = e_3^T X= -0.32611218 X_1 +  0.24959014 X_2 +0.03763929 X_3 +0.64249741 X_4 -0.64586064 X_5\\
Y_4 = e_4^T X=  0.6627590 X_1 -0.4140935X_2 -0.4970499 X_3 +0.3088689 X_4 -0.2163758 X_5\\
Y_5 = e_5^T X=-0.11765952 X_1 +0.58860803 X_2 -0.78030428 X_3 -0.14845546 X_4 +0.09371777 X_5
$$
## b
From the summary above, the proportion of the total sample variance explained by the rst
three principal components is: 89.881%. It means that the first three explain almost all
variance.

## c
From 8-33, we have the CI of m $\lambda_i$:
$$
[\frac{\hat \lambda_i}{1+z(\alpha/2m)\sqrt{2/n}},\frac{\hat \lambda_i}{1-z(\alpha/2m)\sqrt{2/n}}]
$$
```r
z <-qnorm(1-1/6)
cical <-function(lambda){
  c(lambda/(1+z*(1/103)**0.5),lambda/(1-z*(1/103)**0.5))
}
cical(0.0013676780)
cical(0.0007011596) 
cical(0.0002538024)
```
CIs are: [0.001248653 0.001511786], [0.0006401396 0.0007750385], [0.0002317147 0.0002805447]

## d
```r
plot(c(0.52926, 0.80059, 0.89881, 0.95399, 1.00000),ylab="Cumulative proportion",xlab="Component number",type='b')
```
From the cumulative proportion plot, it seems that three dimensions' PC are enough.

# 4
## a
```r
library(bootstrap)
data(scor)
plot(scor)
```

## b
```r
cor(scor)
```

## c
```r
prcomp(scor)
summary(prcomp(scor))
```
$$
Y_1 = e_1^T X= -0.5054457 X_1  -0.3683486 X_2 -0.3456612 X_3 -0.4511226 X_4 -0.5346501 X_5\\
Y_2 = e_2^T X = -0.74874751 X_1 -0.20740314 X_2 + 0.07590813 X_3 +0.30088849 X_4 +0.54778205 X_5\\
Y_3 = e_3^T X= 0.2997888 X_1   -0.4155900 X_2 -0.1453182 X_3 -0.5966265 X_4 +0.6002758 X_5\\
Y_4 = e_4^T X=  -0.296184264 X_1 + 0.78288817X_2 +0.003236339 X_3 -0.518139724 X_4 +0.175732020 X_5\\
Y_5 = e_5^T X= -0.07939388 X_1 -0.18887639 X_2 +0.92392015 X_3 -0.28552169 X_4 -0.15123239 X_5
$$
## d
```r
plot(c( 0.6191,0.8013 ,0.8948 ,0.97102, 1.00000),ylab="Cumulative proportion",xlab="Component number",type='b')
```
I will choose the first too for these three PCs take almost 80% of total variance.

## e
PC1 may stand for the indicator of scores on all subjects. PC2 has more straightforward mearning: it is related to closed or open rules.

## f
```r
library('ggfortify')
autoplot(prcomp(scor,scale=TRUE),colour='green',label=TRUE)
```


## g
$\chi^2_2(0.05) = 5.99$
I use python to check the outlier:
```
import numpy as np
from sklearn.decomposition import PCA
def convert(strr):
    return np.array(strr.split(' ')).astype('float').reshape(-1,1)
pca = PCA(n_components=2, svd_solver='full')
dat = pca.fit_transform(data)
def ellipse(i):
    x,y = dat[i,0],dat[i,1]
    a =  (x/26.2105)**2 + (y/14.2166)**2
    if a >=5.99:
        print (i,a)
for i in range(data.shape[0]):
    ellipse(i)
```

And we can find eight outliers: 1,2,23,28,66,76,81,87











