---
title: Deep Learning in Medical Image
publishDate: 2018-08-16T19:03:19Z
excerpt: "As a student from life science background with machine learning and deep learning skills, I have a broader mind to think about medical image problems from different views. From my perspectives, deep learning aided medical image analysis will soon have a wide range of application."
author: "James Chen"
tags: ["project", "research", "deep learning", "computer vision", "medical image"]
category: "projects"
math: true
draft: false
---

I always have a strong interests in applying deep learning models to medical images analysis. I have two projects related to medical image analysis using deep learning. During the projects I tried to experience the whole pipeline: 

- collect data from hospitals and open source database
-  clean data and organize information
-  learn experience from doctors, develop models and consider about its reliability.

As a student from life science background with machine learning and deep learning skills, I have a broader mind to think about medical image problems from different views. From my perspectives, deep learning aided medical image analysis will soon have a wide range of application. 



# Work Summary

## X-ray image for heart disease analysis
<iframe src="https://arxiv.org/pdf/1808.08277.pdf" width="100%" height="600px"></iframe>

## CT images for lung disease analysis
<iframe src="https://drive.google.com/file/d/1L6WLM41eIwzIi1NB6x8X6UrChYFtH_2u/preview" width="100%" height="600px"></iframe>


We propose some change to analyze the image. For example we propose to use U-net to segment heart mask first. Force the classification model to pay more attention to heart region to make the model more reliable.

For segmentation task, it is suggested to use DICE coefficient. However, it is really hard to use DICE loss to optimize model. We make some changes to DICE loss to restrict the predicted region.

<iframe src="https://drive.google.com/file/d/1VE2Ni3iAJLEtiMks2WmuT-uqamUaqxt-/preview" width="100%" height="600px"></iframe>

# codes
[3D deep learning model for lung disease CT images](https://github.com/james20141606/Summer_Intern)
[X-ray heart disease image classification](https://github.com/james20141606/CardiacAI)

# related:
- X-ray image for heart disease analysis is in a student research training program. With fundings of $20,000
- X-ray image for heart disease analysis also wins second prize in **The First National College Students’ Brain Computation and Application Competition**.
- CT image analysis is under the construction of [Professor Xuegong Zhang](http://www.au.tsinghua.edu.cn/publish/au/1714/2011/20110323105408606814635/20110323105408606814635_.html)

