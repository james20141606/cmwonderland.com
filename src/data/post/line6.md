---
title: Linear Regression Assignment 12
publishDate: 2018-05-20T10:01:19Z
excerpt: "The twelveth assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running."
author: "James Chen"
tags: ["codes", "R", "assignment", "statistics", "linear regression"]
category: "school work"
math: true
draft: false
---

The twelveth assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running.



> **most recommend:** [**click here**](https://www.cmwonderland.com/linearweek12.html) for **html version** of assignment, you can see codes as well as plots.

You may also find the [**PDF Version**](https://github.com/james20141606/somethingmore/tree/master/linear_regression_pdf) of this assignment from github. **Or if you can cross the fire wall, just see below**:
<iframe src="https://drive.google.com/file/d/1TV_5cYmIUSdir6iIdjqZsDHVsWejGBpE/preview" width="100%" height="600px"></iframe>


# 1
## a
```r
x <- seq(-5, 18, length=1000)
y1 <- dnorm(x, mean=5.1, sd=2.8)
y2 <- dnorm(x, mean=6.3, sd=2.8)
y3 <- dnorm(x, mean=7.9, sd=2.8)
y4 <- dnorm(x, mean=9.5, sd=2.8)
plot(x, y1, type="l", lwd=1)
lines(x, y2, type="l", lwd=1)
lines(x, y3, type="l", lwd=1)
lines(x, y4, type="l", lwd=1)
abline(v=5.1)
abline(v=6.3)
abline(v=7.9)
abline(v=9.5)
```
## b
$$
E(MSE) = \sigma^2 = 7.84 \\
E(MSTR) = \sigma^2 + \frac{\sum _i(\mu_i-\mu  )^2}{\gamma -1} \\
=7.84+\frac{100[(5.1-7.2)^2+(6.3-7.2)^2+(7.9-7.2)^2+(9.5-7.2)^2]}{3} \approx 374
$$

It suggests that the different treatments have substantially impact on Y

## c
$$
\text{Use same equation as b, we have: }
E(MSTR) = \sigma^2 + \frac{\sum _i(\mu_i-\mu  )^2}{\gamma -1} \\
=7.84+\frac{100[(5.1-7.2)^2+(5.6-7.2)^2+(9-7.2)^2+(9.5-7.2)^2]}{3} \approx 523
$$
It is because the points distribution are more scattered compared to b.

# 2 
```r
dat<-read.table("CH16PR10.txt")
names(dat)<-c("x","age","num")
```
## a
```r
plot(x=dat$age, y=dat$x)
```
The factor level means seem to differ, at least the middle ge group differs from the other two.
The variability within each factor level seems to be constant.


## b
```r
code <- rbind(diag(1,3),-1)
xx <- code[dat$age,]
dat$x1 <- xx[,1]
dat$x2 <- xx[,2]
dat$x3 <- xx[,3]

dat$age <- factor(dat$age)
fit1 <- aov(x~age,data=dat)
yhat <- fitted(fit1)
yhat

```

## c
```r
resid1 <- resid(fit1)
resid1
```
## d

```r
summary(fit1)
```
## e
$$H_0:\mu_1=\mu_2=\mu_3 \\
H_1: \text{otherwise} \\
F^*=\frac{MSTR}{MSE}
$$
Reject null hypothesis if F*>$F_{0.99,3,33}$
The p value is 4.769e-12 
We reject H_0

## f
If seems that middle aged people tend to offer more cash for a used car, while young and old people tend to offer less.

# 3

## a
```r
fit2 <- lm(x~age,data=dat)
summary(fit2)
```
The model is $Yhat=21.5+6.25X_1-0.0833X_2$ 
The intercept term estimates the average cell sample mean.

## b
```r
anova(fit2)
```
$H_0:\tau_1=\tau_2$ 

$H_1: otherwise$

$F^*=\frac{MSR}{MSE}$

Reject null hypothesis if F*>$F_{0.99,2,33}$
The p value is 4.769e-12, so We reject H_0

# 4
## b
```r
Young=c(23, 25, 21, 22, 21, 22, 20, 23, 19, 22, 19, 21)
Middle=c(28, 27, 27, 29, 26, 29, 27, 30, 28, 27, 26, 29)
Elderly=c(23, 20, 25, 21, 22, 23, 21, 20, 19, 20, 22, 21)
FactorLevels=c(1,2,3)
n1=length(Young)
n2=length(Middle)
n3=length(Elderly)

MyData=data.frame(
Values=c(Young,Middle,Elderly),
Treatment=c(rep(1,n1),rep(2,n2),rep(3,n3)))

y=MyData$Values
x=factor(MyData$Treatment)
means=tapply(y,x,mean)
n=tapply(y,x,length)
df=sum(n)-2

MSE=2.49
alpha=0.01
l1=means[1]-qt(1-alpha/2,df)*sqrt(MSE/n[1])
u1=means[1]+qt(1-alpha/2,df)*sqrt(MSE/n[1])
print(c(l1,u1))
```
So the confidence level is (20.2572,22.7428)

## c
```r
MSE=2.49
alpha=0.01
l31=means[3]-means[1]-qt(1-alpha/2,df)*sqrt(MSE/n[1]+MSE/n[3])
u31=means[3]-means[1]+qt(1-alpha/2,df)*sqrt(MSE/n[1]+MSE/n[3])
print(c(l31,u31))
```
This confidence interval contains 0, so we cannot reject the null hypothesis that $\mu_1=\mu_3$
## d
```r
MSE=2.49;
alpha=0.01;
lcontrast=-means[1]+2*means[2]-means[3]-qt(1-alpha/2,df)*sqrt(MSE/n[1]+4*MSE/n[2]+MSE/n[3])
ucontrast=-means[1]+2*means[2]-means[3]+qt(1-alpha/2,df)*sqrt(MSE/n[1]+4*MSE/n[2]+MSE/n[3])
print(c(lcontrast,ucontrast))

```
$H_0:\mu_2-\mu_1=\mu_3-\mu_2$
$H_1: otherwise$
Since the confidence interval for the contrast does not contain 0, we do not reject the null hypothesis.

## e
```r
results<-aov(y~x);
TukeyHSD(results)

```
There is significant difference between young and middle aged people, as well as mlderly and middle aged people. But there is no significant difference between the young and elderly.


## f
```r
pairwise.t.test(y,x,p.adjust="bonferroni")
```
The bonferroni method gives the same result. But it won't be more efficient, since it "overstates" the significnce level.

# 5
## a
This has been done in the previous problem, question d.
The confidence interval is (-15.627664,-9.539003)

## b
D_1 = 6.2500, D_2 =  −6.3333, D_3 = −0.0833, 

L_1 =−12.5833, s{D_i} =0.6442 (i = 1, 2, 3), s{L_1} = 1.1158,

F(0.90, 2, 33) = 2.47, S = 2.223

Then we can obtain the family intervals:

(4.818,7.682)

(−7.765,−4.901)

(−1.515,1.349)

(−15.064,−10.103)




