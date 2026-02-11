---
title: Linear Regression Assignment 9
publishDate: 2018-05-20T10:01:19Z
excerpt: "The nineth assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running."
author: "James Chen"
tags: ["codes", "R", "assignment", "statistics", "linear regression"]
category: "school work"
math: true
draft: false
---

The nineth assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running.



> **most recommend:** [**click here**](https://www.cmwonderland.com/linearweek9.html) for **html version** of assignment, you can see codes as well as plots.

You may also find the [**PDF Version**](https://github.com/james20141606/somethingmore/tree/master/linear_regression_pdf) of this assignment from github. **Or if you can cross the fire wall, just see below**:

<iframe src="https://drive.google.com/file/d/1ZKK3pAgtaT3coeGr6Qm_tmOyXWi7dpNS/preview" width="100%" height="600px"></iframe>


# 1 
```r
# read the data
dat<-read.csv("ch6.csv")
names(dat)<-c("y","x1","x2","x3")
```
## a
```r
fit<-lm(y~x1+x2,data=dat)
summary(fit)
```

So the regression model is $Y=3995+0.0009192X_1+12.12X_2$

## b
```r
par(mfrow=c(1,2))
yonx1 <- lm(y~x1,data=dat)
yonx2 <- lm(y~x2,data=dat)
x1onx2 <- lm(x1~x2,data=dat)
x2onx1 <- lm(x2~x1,data=dat)
plot(x1onx2$residuals,yonx2$residuals,col="blue",pch=16,
xlab="e(X_1|X_2)", ylab="e(Y|X_2)")
abline(0,fit$coefficients[2])
abline(0,0,lty=2,col="gray")
plot(x2onx1$residuals,yonx1$residuals,col="red",pch=16,
xlab="e(X_2|X_1)", ylab="e(Y|X_1)",xlim=c(-50000,150000))
abline(0,fit$coefficients[3])
abline(0,0,lty=2,col="gray")
```

## c

 We use about the same scale in the two plots. In the first plot, the scatter of points around the least square line does not differ much compared to the scatter around the horizontal line. However, in the second plot, we can see that the scatter around the regression line (which is almost verticle under this scale) is significantly smaller than the scatter around the horizontal line. This tells us that X1 is of little use when X2 is in the model, while X2 can still explain a lot when X1 is present. 
So perhaps X1 can be discarded.

## d
```r
# The regression functions below are required
fit1<-lm(resid(yonx2)~resid(x1onx2)-1)
summary(fit1)
summary(yonx2)
summary(x1onx2)
```
Summarizing from the results above, the regression function is 
$[Y-(4237.47+17.04x_2)=0.000919[x_1-(263272+5348x_2)]$

Which is equivalent to $Y=3995+0.0009192X_1+12.12X_2$

# 2

## a
```r
newfit<-lm(y~x1+x2+x3,data=dat)
sdr<-rstudent(newfit)
sdr # the studentized deleted residuals
```

H_0: Not an outlier; H_1: Is an outlier
We reject the null hypothesis when the studentized deleted residuals are larger than $t(1-\alpha/2n;n-p-1)$
The results are below
```r
n=52
p=4
ifelse(sdr > qt(1-0.90/2/n,n-p-1), "YES", "NO")
```

So none is deemed as an outlier.

## b
```r
hatd<-hatvalues(newfit)
hatd
n=52
p=4
ifelse(hatd > 2*p/n, "YES", "NO")
```
According to the rule of the thumb, cases 4,16,21,22,43,44,48 are thought to be outliers.

## c
```r
attach(dat)
plot(x1,x2)
```
Judging from the scatter plot, this prediction does not seem to involve extrapolation beyond the range of the data.
```r
xnew<-c(300000,7.2,0)
X<-as.matrix(dat)
X<-X[,-1]
hnew<-t(xnew)%*%solve(t(X)%*%X)%*%xnew
ifelse(hnew > 2*p/n, "YES", "NO")
```
Using (10.29), the conclusion is the same, as stated above.

## d
```r
test<-cbind(
  "DFFITS"  = dffits(newfit),
  "DFBETA0" = dfbetas(newfit)[,1],
  "DFBETA1" = dfbetas(newfit)[,2],
  "DFBETA2" = dfbetas(newfit)[,3],
  "DFBETA3" = dfbetas(newfit)[,4],
  "Cook's Distance" =cooks.distance(newfit))
test<-test[c(16,22,43,48,10,32,38,40),]
test
qf(0.1,4,48)# 10% quantile of the corresponding F distribution
abs(test[,1])>2*sqrt(p/n)
abs(test[,c(2,3,4,5)])>2/sqrt(n)
```
It can be seen that  Cook's distance is well below 10% quantile of the corresponding F distribution which is roughly 0.26. 
Judging from DEFITS, it seems that case 43 and 32 are influential.
Judging from DFDETA, it seems that cse 16,43,10,32,40 are influential.

## f
```r
cd<-cooks.distance(newfit)
plot(seq(1:52),cd,xlab="Case Index Number",ylab="Cook's Distance", main="Index Plot",type="b")
```
None of the cases is deemed as influential according to this criteron.

# 3 
## a
```r
pairs(~cases+percent+holiday+labor,data=dat, 
   main="Simple Scatterplot Matrix")
cor(dat[,1:4])
```
There does not seem to be significant pairwise linear associations. X2 and X3 seem to have a relatively higher liner correlation.


## b
```r
#cases+percent+holiday
summary(lm(cases ~ percent+holiday))$r.squared 
summary(lm(percent~cases +holiday))$r.squared
summary(lm(holiday~cases +percent))$r.squared
myfun<-function(a){
  result <-1/(1-a**2)
  return (result)
  }
myfun(0.01181682)
myfun(0.01172621)
myfun(0.003705038)
```

$$
(VIF)_j = \frac{1}{1-R_j^2}\\
max_j(VIF)_j = 1.00014 \leq 10
$$

So there is no serious multicolinearity here.







