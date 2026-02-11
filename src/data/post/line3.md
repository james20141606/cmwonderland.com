---
title: Linear Regression Assignment 8
publishDate: 2018-04-20T10:01:19Z
excerpt: "The eigth assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running."
author: "James Chen"
tags: ["codes", "R", "assignment", "statistics", "linear regression"]
category: "school work"
math: true
draft: false
---

The eigth assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running.



> **most recommend:** [**click here**](https://www.cmwonderland.com/linearweek8.html) for **html version** of assignment, you can see codes as well as plots.

You may also find the [**PDF Version**](https://github.com/james20141606/somethingmore/tree/master/linear_regression_pdf) of this assignment from github. **Or if you can cross the fire wall, just see below**:

<iframe src="https://drive.google.com/file/d/1JQjkq4iBhUmCgrJ9ijq9lxTrsroQKeZC/preview" width="100%" height="600px"></iframe>


# 1 
## a
```r
# read the data
setwd('~/Desktop/三春/5线性回归分析/作业/HW8/')
dat<-read.csv("hw8.csv")
X1<-dat$x1
X2<-dat$x2
X3<-dat$x3
X4<-dat$x4
Y<-dat$y
# plot stem and leaf plots
stem(X1)
stem(X2)
stem(X3)
stem(X4)
```
It seems that X3 has a denser concentration and the following boxplot supports it. X1 has two outliers. X2 is asymmetric

```r
library(vioplot)
vioplot(X1,X2,X3,X4,col="gold")
boxplot(X1,X2,X3,X4)
```

## b
```r
pairs(~X1+X2+X3+X4+Y,data=dat, 
   main="Scatterplot Matrix")
cor(dat)
```
obviously X3 and X4 has high correlation.

## c
```r
Fit = lm(Y~X1+X2+X3+X4, data=dat)
anova(Fit)
summary(Fit)
```
$\hat Y = -124.38 + 0.30 x_1 + 0.05 x_2 + 1.31 x_3 + 0.52 x_4$
It seems X2 should be excluded from the model since the p-value=0.4038.

# 2
## a
```r
library(leaps)
best <- function(model, ...) 
{
  subsets <- regsubsets(formula(model), model.frame(model), ...)
  subsets <- with(summary(subsets),
                  cbind(p = as.numeric(rownames(which)), which, adjr2))

  return(subsets)
}  
round(best(Fit, nbest = 6), 4)
```
The four best subset regression models are

subset	|$R^2_{a,p}$
--- | ---
x1, x3, x4 |	0.956
x1,x2,x3,x4	|0.955
x1,x3|	0.927
x1,x2,x3|	0.925

## b
There are $C_p$ Criterion, #AIC_p# and #SBC_p# which can be used as criterion to select the best model. They all place penalties for adding predictors.

# 3
```r
library(MASS)
Null = lm(Y ~ 1, dat)
```

```r
addterm(Null, scope = Fit, test="F")
NewMod = update( Null, .~. + X3)
addterm( NewMod, scope = Fit, test="F" )
NewMod = update( NewMod, .~. + X1)
dropterm(NewMod , test = "F")
addterm( NewMod, scope = Fit, test="F" )
NewMod = update( NewMod, .~. + X4)
dropterm( NewMod, test = "F" )
addterm( NewMod, scope = Fit, test="F" )
```
- As shown, start with no predictors, X3 is chosen because of smallest p-value.
- Then regressing y on x3 and additional one predictor, the result shows that X1 has the smallest p-value (1.578e-06< 0.05). Therefore X1 can be included in the model. In the same time a test is given to see if x3 should be dtropped. Since p-value (6.313e-13<0.10), X3 is retained.
- Then regressing y on X3, X1 and any one of the rest two, it shows that X4 has the smallest p-value (0.0007354 < 0.05) and hence being included in the model.In the same time a test is given to see if x3 or x1 should be dtropped. Since both of their p-value < 0.10, they are both retained.
- Finally, regressing y on all four predictors and x2 isn’t significant to be included (0.4038 > 0.05). Thus it is deleted from the model.
- The best subset of predictor variables to predict job proficiency is (x1,x3,x4)

## b
The model evaluated using the forward stepwise regression shows the same result as earlier chosen variables under the criteria of adjusted R square.



