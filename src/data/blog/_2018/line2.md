---
title: Linear Regression Assignment 7
pubDatetime: 2018-04-16T14:01:19Z
description: "The seventh assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running."
author: "James Chen"
tags: ["codes", "R", "assignment", "statistics", "linear regression"]
categories: ["school work"]
math: true
draft: false
---

The seventh assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running.



> **most recommend:** [**click here**](https://www.cmwonderland.com/linearweek7.html) for **html version** of assignment, you can see codes as well as plots.

You may also find the [**PDF Version**](https://github.com/james20141606/somethingmore/tree/master/linear_regression_pdf) of this assignment from github. **Or if you can cross the fire wall, just see below**:
<iframe src="https://drive.google.com/file/d/10Oo7Rb7sKNbT7XPEzdGwlfQRO1O42Y0h/preview" width="100%" height="600px"></iframe>


# 1 
## a
```r
# read the data
setwd('~/Desktop/三春/5线性回归分析/作业/HW7/')
Data<-read.table("hw7.txt")
names(Data) = c("Hours","Cases","Costs","Holiday")
Fit = lm(Hours~Cases+Costs+Holiday, data=Data)
anova(Fit)
SSTO = sum( anova(Fit)[,2] )
MSE = anova(Fit)[4,3]
SSR = sum( anova(Fit)[1:3,2] )  
MSR = SSR / 3                  
SSE = anova(Fit)[4,2]
```
From the table we have: $SSR(X_1) = 136366$,$SSE(X_1,X_2,X_3) = 985530$


```r
Fit2 = lm(Hours~Cases+Holiday, data=Data)
anova(Fit2)
```
$SSR(X_3|X_1) = 2033565$

$SSR(X_2|X_1,X_3) = SSE(X_1,X_3)-SSE(X_1,X_2,X_3)$ = 992204 - 985530 = 6674

## b
$$
H_0: \beta_2 = 0, H_a: \beta_2 \neq 0. \\
$$
From a we have:
$$
SSR(X_2|X_1,X_3)  = 6674, SSE(X_1,X_2,X_3) =  985530\\
F^* = \frac{(6674/1)}{985530/48} = 0.32491 \\
F(0.95,1,48) = 4.04265 \\
If \  F^* \leqslant 4.04265 \ conclude H_9, otherwise \ conclude H_a \\
P-value = 0.5713
$$

## c
```r
Fit2 = lm(Hours~Cases+Costs, data=Data)
anova(Fit2)
Fit3 = lm(Hours~Costs+Cases, data=Data)
anova(Fit3)
```
So we have $SSR(X_2|X_1) +SSR(X_1) = 136366 + 5726 = 11395+130697 =SSR(X_1|X_2) +SSR(X_2)$ 

Yes, it is always true because: $SSR(X_2|X_1)+SSR(X_1) = SSE(X_1) - SSE(X_1,X_2) +SSR(X_1) = SSTO -SSE(X_1,X_2)$

$SSR(X_1|X_2)+SSR(X_2) = SSE(X_2) - SSE(X_1,X_2) +SSR(X_2) = SSTO -SSE(X_1,X_2)$

# 2
From question1, We have $SSR(X_1) = 136366,SSR(X_2) =  5726 , SSR = 2176606,SSTO = 3162136$ \\
So $R^2_{Y_1} = 0.0431,R^2_{Y_2} =0.00181,R^2 = 0.6883$ \\
From homework6 we have $r_12 = 0.10059216$, so $R^2_{12} =0.0101 $ \\

```r
Fit4 = lm(Hours~Costs, data=Data)
anova(Fit4)
Fit5 = lm(Hours~Cases, data=Data)
anova(Fit5)
```

$R^2_{Y1|2} = \frac{SSR(X_1|X_2)}{SSE(X_2)}$ = 130697/3150741 = 0.04148\\
$R^2_{Y2|1} = \frac{SSR(X_2|X_1)}{SSE(X_1)}$ = 5726/3025770 = 0.001892\\

```r
Fit6 = lm(Hours~Cases+Holiday, data=Data)
anova(Fit6)
```

$R^2_{Y2|13} = \frac{SSR(X_2|X_1,X_3)}{SSE(X_1,X_3)}$

$SSR(X_2|X_1,X_3) = SSE(X_1,X_3)-SSE(X_1,X_2,X_3)$ = 992204 - 985530 = 6674 

$SSE(X_1,X_3)$ = 992204, so $R^2_{Y2|13}$ = 6674/992204 = 0.006726

# 3
## a 
```r
Fit = lm(Hours~Cases, data=Data)
summary(Fit)
```
So regression function is $\hat Y = 4080 +0.0009355X_1$ \\

## b
The regression function in 6.10a is $Y=0.0007871X_1-13.17X_2+623.6X3+4150$

The coefficient $\beta_1$ is bigger than coefficient in 6.10a.

## c
No, from question 1, $SSR(X_1) = 136366,SSR(X_1|X_2)=130697$. It's not substantial

## d
The correlation of $X_1,X_2$ is highest in all predictors, so the $SSR(X_1) and SSR(X_1|X_2)$ don't have substantial difference.

# 4
## a
To run a polynomial regression model on one or more predictor variables, it is advisable to first center the variables by subtracting the corresponding mean of each, in order to reduce the intercorrelation among the variables.

```r
x1 <- Data$Cases - mean(Data$Cases)
x3 <- Data$Holiday - mean(Data$Holiday)
x1sq <- x1^2
x3sq <- x3^2
x1x3 <- x1 * x3
Grocery <- cbind( Data, x1, x3, x1sq, x3sq, x1x3 )
Poly <- lm(  Hours ~ x1 + x3 + x1sq + x3sq + x1x3, data=Grocery )
summary(Poly)
```
So the model is $\hat Y = 4367+8.61 \times 10^{-4} X_1+623.7 X_3-1.154 \times 10^{-9}X_1^2 -8.87 \times 10^{-5} X_1 X_3$

## b
```r
anova(Poly)
```
```r
Fit7 <-lm(  Hours ~ x1 + x3, data=Grocery )
anova(Fit7)
qf(0.95,3,46)
```

$$
H_0: \beta_3,\beta_4,\beta_5 =0, H_a: \text{not all }\beta_k in H_0 = 0\\
F^* = \frac{SSR(X_1^2,X_3^2,X_1X_3|X_1,X_3)/3}{SSE(X_1^2,X_3^2,X_1X_3,X_1,X_3)/(n-6)}\\
=\frac{(SSE(X_1,X_3)-SSE(X_1^2,X_3^2,X_1X_3,X_1,X_3))/3}{991173/46}\\
=\frac{(992204-991173)/3}{991173/46}\\
=0.01594945\\
F(0.95,3,46) = 2.806845, So \ F^* < F(0.95,3,46), \text{Do not reject H_0.}
$$
```r
pf(0.01594945,3,46)
```
p-value = 0.002785933

