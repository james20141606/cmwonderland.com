---
title: RNA Structural Motif Finding using Deep Learning
publishDate: 2018-10-11T00:30:36Z
excerpt: "We then turn to predict RNA motif (especially RNA-protein interaction related motif). It is another harder problem compared with simply applying deep neural network to 1D and 2D structure data. We develop the mixture model for PWM optimization. We explore the possibility to use VAE for unsupervise"
author: "James Chen"
tags: ["project", "deep learning", "RNA structure", "VAE", "GCN"]
category: "projects"
math: true
draft: false
---
**DeepShape: RNA Structural Motif Finding**

**DeepShape** is the project I like the most and devote the most during my undergraduate research time. It originates the interests of applying deep learning to predict RNA structure and structure probing data. During a lot of trying we realized current convolutional and recurrent neural network are not suitable to **really understand RNA structure**. We can get a "pseudo" good result yet learn little about the real structure information.

We then turn to predict RNA motif (especially RNA-protein interaction related motif). It is another harder problem compared with "simply" applying deep neural network to 1D and 2D structure data. We develop the mixture model for PWM optimization. We explore the possibility to use VAE for unsupervised learning. What's more, I strongly believe a relatively new model: **graph convolutional neural network** has a great potential to really utilize and discover the structural information in motif finding problem. 



## abstract

RNAs play key roles in cells through the structural specificity and interactions with proteins known as the RNA-binding proteins(RBP). The binding motifs enable crucial understanding of the regulation of RNAs. Many automatic tools have been developed to predict the RNA-protein binding sites from the rapidly growing multi-resource data, e.g. sequence, structure, their domain specific features. MEME, RNApromo and GraphProt can utilize sequence and structural feature using algorithms like expectation maximization (EM) or support vector machine (SVM). 

However, there are several limitations in existing methods. For example, the SCFG-based model has a very high computational complexity and the position-weight matrix (PWM) model does not learn structural information. Machine learning model like GraphProt and DeepBind relies on class labels and can’t handle unsupervised motif finding task. Deep learning-based algorithms are believed  to be capable of capturing features in structural data, e.g. image and sequence data.  However, current models didn’t incorporate structure probing data like icSHAPE. What’s more, convolutional neural network cannot accept secondary structure data as input.

We propose to use Variational Auto-Encoder (VAE) as motif model and incorporate it into EM algorithm to predict motif existence and locate motif position.  VAE can encode sequence data and decode it as probability in PWM. It can be optimized by optimizing the combination of KL loss and reconstruction loss. VAE-based mixture model achieves good performance in sequence data (JASPAR). We also propose to use Graph Convolutional Neural Network (GCN) to capture RNA secondary structure feature for structural related motif finding. We first represent RNA structure as graph, encoding nucleotides and base pairs as nodes and edges. We also encode higher level graph features like hairpin, helix and bulge. GCN can incorporate and utilize both sequence and structural features to predict motif existence and location. It achieves good performance compared with other methods considering accuracy and computational efficiency.

## Poster
![Markdown](http://i1.fuimg.com/640680/c5d74bc8ee9e44d9.jpg)

## Work report
We are still making progress in DeepShape project, using Graph Convolutional Neural Network to discover structural motif.

The Project introduction can be divided into two parts: predicting RNA secondary structure probing data and discover motif.

### Predicting icSHAPE: secondary structure probing data

<iframe src="https://drive.google.com/file/d/1Iv1r7LUNpYxNrXm450GGUzT67M61qf4E/preview" width="100%" height="600px"></iframe>

### methods:
We use window to convert RNA sequence into uniform slices for 1D deep learning model. We also try something **new and fun**: we convert one sequence to a 2D map and use **specialized designed 2D U-net** to predict it. (*Later we find that google use the similar idea to predict SNP as images*).

- 1D
    - CNN
    - RNN
    - ResNet
    - Seq2Seq
    - Attention
- 2D
    - U-net

   
### Discover MOTIF: predict existence and location of motif

<iframe src="https://drive.google.com/file/d/11XfyNguAXpVCcWGKQhgyspLA7w5M2fYa/preview" width="100%" height="600px"></iframe>

### methods:
We revise and improve MEME's EM algorithm to Mixture-PWM to make the model more robust to noises.

We also replace the PWM matrix with a Variational Auto-Encoder (**VAE**).

We then use Graph Convolutional Neural Network (**GCN**) to explore the possibility to predict **Structural related motif**. During our long time exploration, we find GCN may be the best method (in deep learning) to truly understand the structural information in RNA sequence.

## Codes:
[DeepShape GitHub](https://github.com/james20141606/Deepshape/)

