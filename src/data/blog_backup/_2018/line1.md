---
title: Linear Regression Assignment 6
pubDatetime: 2018-04-16T13:59:19Z
description: "The sixth assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running."
author: "James Chen"
tags: ["codes", "R", "assignment", "statistics", "linear regression"]
categories: ["school work"]
math: true
draft: false
---

The sixth assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running.



> **most recommend:** [**click here**](https://www.cmwonderland.com/linearweek6.html) for **html version** of assignment, you can see codes as well as plots.

You may also find the [**PDF Version**](https://github.com/james20141606/somethingmore/tree/master/linear_regression_pdf) of this assignment from github. **Or if you can cross the fire wall, just see below**:
<iframe src="https://drive.google.com/file/d/1-lgCaX4w7FjBMdYdr330UWjqdkMCJtuf/preview" width="100%" height="600px"></iframe>



# 1 
```r
# read the data
setwd('~/Desktop/三春/5线性回归分析/作业/HW6/')
dat<-read.csv("hw6.csv")
cases<-dat$X1
percent<-dat$X2
holiday<-dat$X3
labor<-dat$Y
# plot stem and leaf plots
stem(cases)
stem(percent)
```
The plots are above.
There seems to be some outliers. For example for $X_2$, the values more than 9 and lower than 5 seem to be outliers. The gaps are obvious.

```r
# plot time plots
time<-1:52
plot(time,dat$X1,xlab="time (weeks)",ylab="X1")
plot(time,dat$X2,xlab="time (weeks)",ylab="X2")
plot(time,dat$X3,xlab="time (weeks)",ylab="X3")
```

1) $X_1$ may depent on time. it has a tendency to be larger over time
2) $X_2$ is independent of time
3) $X_3$ seems independent of time 



```r
pairs(~cases+percent+holiday+labor,data=dat, 
   main="Simple Scatterplot Matrix")
cor(dat[,1:4])
```

It is obvious that $X_3$ and Y has a very strong correlation(it also makes sense). the others have no significant correlation.

# 2
```r
dat.fit<-lm(labor~cases+percent+holiday)
sm<-summary(dat.fit)
sm
resid1<-dat.fit$residuals
resid1
```
a) The regression function is $$ Y=0.0007871X_1-13.17X_2+623.6X3+4150 $$
$b_1, b_2, b_3$ are unbiased estimates of $$\beta_1 , \beta_2 , \beta_3  $$

b) 
```r
boxplot(resid1,ylab="residuals", pch=19)
```
From the boxplot, we can know the median, maximum, minimum, 25 and 75 percent quantile of the residuals.



```r
plot(labor,resid1)
plot(cases,resid1)
plot(percent,resid1)
plot(holiday,resid1)
plot(cases*percent,resid1)
qqnorm(resid1, main="Normal Probability Plot", pch=19)
qqline(resid1)
```

c) The plots show that the regression function may not be linear. The residuals change systematically as Y increases, as shown in the first plot. Also the normal probability plot shows that the residuals may not be strictly normally distributed.

```r
plot(time,resid1)
```
d) There does not seem to be any indication that the error terms are correlated.

# 3

a) 
$$
H_0:\ \beta_1=\beta_2=\beta_3=0\;\;H_a:\ otherwise
$$
$$
We\;reject\;H_0\;if\;F^*=\frac{MSR}{MSE}>F_{0.95,3,48}
$$
Based on the result:"F-statistic: 35.34 on 3 and 48 DF,  p-value: 3.316e-12", we reject H0 and conclude Ha.
The p value is 3.316e-12
The t-test result from above implies that $$ \beta_1 \; and\; \beta_3$$ are likely to be non-zero but $\beta_2$ may be zero.

b) 
```r
confint(dat.fit,c(2,4),level = 1-0.05/4)
```
The family confidence interval is shown above. The family  confidence coefficient means that when doing many simulations, the proportion of samples which values fall correctly in the cofifence interval.

c.Coefficient of multiple determination is 0.6883. It can be viewed as a coefficient of simple determination between the responses and the fitted values.


# 4
```r
plot(cases, percent,ylim=c(4,11))
points(400000,7.2,pch=2)
points(400000,9.9,pch=3)
```
It is a plot of the two variables: X1 and X2. The cross and triangle represent the two points where predictions are to be made. It can be seen that the triangle lies well within the joint range of the two variables, but the cross seems to be out of the scope of the model.

# 5
```r
new1 <- data.frame(cases=230000,percent=7.5,holiday=0)
new2 <- data.frame(cases=250000,percent=7.3,holiday=0)
new3 <- data.frame(cases=280000,percent=7.1,holiday=0)
new4 <- data.frame(cases=340000,percent=6.9,holiday=0)
predict(dat.fit, new1, se.fit = F, interval = "prediction", level = 1-0.05/8)
predict(dat.fit, new2, se.fit = F, interval = "prediction", level = 1-0.05/8)
predict(dat.fit, new3, se.fit = F, interval = "prediction", level = 1-0.05/8)
predict(dat.fit, new4, se.fit = F, interval = "prediction", level = 1-0.05/8)
```
The intervals are presented above.

# 6
```r
new <- data.frame(cases=282000,percent=7.1,holiday=0)
predict(dat.fit, new, se.fit = T, interval = "prediction", level = 1-0.05)
mse <- mean(dat.fit$residuals^2)
mse
```
We obtained MSE and se.fit.
```r
lwr<-4278.365-qt(1-0.05/2,df=48)*sqrt(mse/3+22.83758^2)
upr<-4278.365+qt(1-0.05/2,df=48)*sqrt(mse/3+22.83758^2)
lwr
upr
```
a. The interval is (4112.088,4444.642)
b. Just multiply the interval by 3. We obtain (12336.27,13333.92)






