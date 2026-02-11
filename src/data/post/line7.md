---
title: Linear Regression Assignment 13
publishDate: 2018-05-28T16:01:19Z
excerpt: "The thirteenth assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running."
author: "James Chen"
tags: ["codes", "R", "assignment", "statistics", "linear regression"]
category: "school work"
math: true
draft: false
---

The thirteenth assignment of Linear Regression. The assignment is written in Rmarkdown, a smart syntax supported by RStudio helping with formula, plot visualization and plugin codes running.



> **most recommend:** [**click here**](https://www.cmwonderland.com/linearweek13.html) for **html version** of assignment, you can see codes as well as plots.

You may also find the [**PDF Version**](https://github.com/james20141606/somethingmore/tree/master/linear_regression_pdf) of this assignment from github. **Or if you can cross the fire wall, just see below**:
<iframe src="https://drive.google.com/file/d/1WibEAysXOszktnD3d1BK8bDNcS-vN6wN/preview" width="100%" height="600px"></iframe>


# 1 
## a
```r
dat<-read.table("CH19PR10.txt")
names(dat)<-c('y','age','gender')
dat$age<-factor(dat$age)
dat$gender<-factor(dat$gender)
fit<-aov(data=dat,y~age*gender)
summary(fit)
```
```r
library("ggpubr")
ggboxplot(dat, x = "age", y = "y", color = "gender",
          palette = c("#00AFBB", "#E7B800"))
```
## b
```r
for (i in c(1,2,3,4,5,6)){
  print (sum(fit$residuals[(6*(i-1)+1):(6*i)]))
}
```
Yes, they sum to zero for each treatment.


## c
```r
par(mfrow=c(1,2))
stripchart(split(resid(fit), dat$gender), method = "stack",  pch = 19)
abline(h = seq(2, 4)-0.1)
title("Aligned Residual Dot Plot gender")
stripchart(split(resid(fit), dat$age), method = "stack",  pch = 19)
abline(h = seq(2, 4)-0.1)
title("Aligned Residual Dot Plot age")
```

## d
```r
rq<-c()
for (i in c(1:36)) {
  qq<-qnorm((i-3/8)/(36+1/4))
  rq<-c(rq,qq)
}
plot(rq,sort(fit$residuals))
abline(0,1)

```

```r
cor(rq,sort(fit$residuals))**2
```

when n = 36 and significance value = 0.05, the Critical Values for Coefficient of Correlation between Ordered Residuals and Expected Values under Normality is 0.97. And the correlation calculated is 0.9720399. So it appears reasonable.

## e
```r
par(mfrow=c(1,2))
arrofres = matrix(nrow = 6,ncol = 6)
for (i in c(1,2,3,4,5,6)){
  arrofres[i,]<-fit$residuals[(6*(i-1)+1):(6*i)]
}
matplot(arrofres)
plot(fit$residuals,type = 'b')
```
residuals in each treatment's sum is equal to zero, and it seems that the residuals has no relation with treatments.


# 2
## a
```r
interaction.plot(dat$age,dat$gender,dat$y,type="b",col=c("red","blue"),pch=c(16,18))
```
age has larger effect and gender has small effect, since they are nearly parrallel, they have little interaction.

## b
```r
fit<-aov(data=dat,y~age*gender)
anova(fit)
```
age, it has the largest SSR.

## c
```r
fit<-aov(data=dat,y~age*gender)
anova(fit)
qf(0.95,2,30)
1-pf(1.0581,2,30)
```

- Hypothesis: $H_0 : \sigma^2_{\alpha\beta}>0, i =1,2,3,j=1,2 $
- Decision rule: Reject $H_0$ if $F* >F_{0.95,2,30}$
- Conclusion: Since $F∗ = \frac{MSAB}{MSE} = 1.0581$ , we do not reject $H_0$ and conclude that there
are no interaction effects with p = 0.3597133


## d
```r
qf(0.95,2,2)
qf(0.95,1,2)
1-pf(66.2907,2,2)
1-pf(2.2791,1,2)
```


### i. Factor A (age) main effect
- Hypothesis: $H_0 : \alpha_i = 0 vs H_a$ : at least one $\alpha_i$ is not 0, i = 1, 2, 3
- Decision rule: Reject $H_0$ if $F∗ = MSA/MSE > F_{0.95,2,2} = 19$
- Conclusion: Since F∗ = 158.361/2.528 =62.6428 , we reject $H_0$ and conclude that there is
Factor A main effect for the number of coats with p =0.01486089

### ii. Factor B (gender) main effect
- Hypothesis: $H_0 : \beta_i = 0 vs H_a$ : at least one $\beta_i$ is not 0, i = 1, 2
- Decision rule: Reject $H_0$ if $F∗ = MSB/MSE > F_{0.95,1,2} = 18.51282$
- Conclusion: Since F∗ = 2.2791 , we do not reject $H_0$ and conclude that there is no
Factor B main effect for the number of coats with p =0.2701973

## f
Yes, age has large effect and gender has little effect, and there are no apparent interactions

## g
- single factor: age 316.7, Residuals   82.2 
- two factor: age 316.7, gender    5.44, age:gender   5.06, Residuals   71.67
factor A age has same sum of squares, and residuals' sum of squares in single factor ANOVA equals to all other sum of squares in two factor ANOVA except age. Yes, the degree holds the same relation.


