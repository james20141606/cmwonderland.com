---
title: Synaptic Partner and Cluster Project
pubDatetime: 2018-07-14T23:58:06Z
description: "- SummerIntern/synapticpartner at master · james20141606/SummerIntern · GitHub - Synapse polarity - SummerIntern/synapsecluster at master · james20141606/SummerIntern · GitHub"
author: "James Chen"
tags: ["project", "neural science", "summer intern", "connectomics", "computational neural science", "deep learning", "computer vision", "Jeff Lichtman"]
categories: ["projects"]
draft: false
---


It is part of my computational task during my summer intern in [Lichtman Lab](https://lichtmanlab.fas.harvard.edu/) and [Hanspiter Lab](https://vcg.seas.harvard.edu/people).

It is part of the big synapse project. Also the challenge 3 of [CREMI](https://cremi.org)

For **whole work summary** please [see here](https://www.cmwonderland.com/2018/09/12/100_summer_intern/)

<iframe src="https://drive.google.com/file/d/1XyEPj9r7p8VNk5nLlLIPNhZjuDHu2KTY/preview" width="100%" height="600px"></iframe>

Also I finished another NMJ project during summer intern in [Lichtman Lab](https://lichtmanlab.fas.harvard.edu/) 

# Codes 

- [Summer_Intern/synaptic_partner at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/tree/master/synapse_prediction)
- [Synapse polarity](https://github.com/james20141606/EM-network)
- [Summer_Intern/synapse_cluster at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/tree/master/synapse_cluster)


# weekly report

## First
<iframe src="https://drive.google.com/file/d/1bmWX9M1aTgOw7YB9xrnUNynWfxuoa_Rz/preview" width="100%" height="600px"></iframe>

## Second
<iframe src="https://drive.google.com/file/d/1OOaFajkLcwQBEf1XQuEIYqFAkl9psPrt/preview" width="100%" height="600px"></iframe>

## Third
<iframe src="https://drive.google.com/file/d/1We4g3Ltd2gqzmICoLtKFKsL-2zP2BVeV/preview" width="100%" height="600px"></iframe>

## Fourth
<iframe src="https://drive.google.com/file/d/19zhoBM6GP94a-bNj7bFIZdExC0x6yw_2/preview" width="100%" height="600px"></iframe>


*****


# first two weeks

## creteria
I try to understand the task3, I read through metrics provided by CREMI website, and find the data processing and evaluation scripts provided by Cremi organization.
[cremi_python/synaptic_partners.py at master · cremi/cremi_python · GitHub](https://github.com/cremi/cremi_python/blob/master/cremi/evaluation/synaptic_partners.py). 

They made it very hard to use their pipeline to store and process data. Since we have our own pipeline, I only use the core function about evaluation. By rewriting the scripts I understand how to calculate F-score, it is harder to fully understand the criteria since it needs many steps to calculate, so it is essential to read the original scripts.

I have summarized the metrics and show it to zudi and donglai.

![Markdown](http://i2.tiimg.com/640680/ad617dc9489cb429.png)

This means we need the location data and neuron_id for wrong partner evaluation



### steps to calculate F-score
- cost_matrix :
    - pre_post_locations get pre and post location，may consider offset shift       get rec and gt location
    - pre_post_labels  get pre and post segmentation( GT neuron_id) as rec_labels  segmentation[pre]  return the pixel value of a certain coordinates for further comparison of wrong partners for further comparison of wrong partners
    - create cost matrix，find the bigger one of rec and gt location as matrix size  init value is  2*matching_threshold
    - use cost function to calculate, for every rec and gt pair, input rec_locations[i], gt_locations[j], rec_labels[i], gt_labels[j], matching_threshold
    - in cost function, set max_cost = 2*matching_threshold，fisrt if labels1 != labels2(rec_labels[i], gt_labels[j]), from pre_post_labels we can know rec and gt comes from different segmentation(neuron).return max_cost
    - cost function continue, use np.linalg.norm to calculate pre and post L2 distance, if any of it is larger than thres, return max_cost. Else return average of pre and post. i.e. if  wrong partner (rec and gt not in same seg),  or FP: succeed thres
    - if none of them happens, return average of pre and post
    - return to cost_matrix, if distance less than thres, add potential pair count by 1, through loop, cost_matrix is filled with numbers, but the loop traverse rec_locations，gt_locations, positions not traverseed is max_cost
- match using Hungarian method
>All detected pairs that have both annotations inside the matching areas of a ground truth pair are considered potential matches. Of all potential matches, we find true matches by solving an assignment problem minimizing the Euclidean distance. Unmatched detected pairs are considered FP, unmatched ground truth pairs FN. The final score is the F1-score of the FPs and FNs.
    - use linear_sum_assignment(costs - np.amax(costs) - 1)  np.amax(costs) almost is max_cost(2*matching_threshold)
        - scpiy的linear_sum_assignment **solves assign problems**, which is one of the tricky part in this criteria.
        let X be a boolean matrix where X[i,j] =1 if row i is assigned to column j. Then the optimal assignment has cost $$min \sum_i \sum_j C_{ij}X_{ij}$$, it finds the minimum Euclidean distance in all potential pairs. So we can submit all locations in a random way, it doesn’t matter.
 - retain the assigned pairs by distance less than threshold
- unmatched in rec = FP，all pairs detected by models subtracted by cost matrix’s pairs are FP
- unmatched in gt = FN，all GT pairs subtracted by cost matrix’s pairs are FN
- all ground truth elements - FN = TP
- Then we can calculate fscore, precision, recall, fp, fn, filtered_matches
        



## Study others’ methods
#### 1st place
Last month Funkey put a paper **Synaptic partner prediction from point annotations in insect brains** it is the  top in leaderboard method. They combined synapse detection and partner identification into one steps. They train a 3D Unet，directly predict directed edges formed by voxels. Balance computational resource and coverage of synaptic partner. Then calculate score of all edges from one segment to another segment. Threshold and certify candidate synapse，for candidate synapse, calculate the mass center of all related edges, getting coordinates of synapse’s pre and post.
- 3D U-Net architecture to directly identify pairs of voxels that are pre- and postsynaptic to each other
- formulate the problem of synaptic partner identiﬁcation as a classiﬁcation problem on long-range edges between voxels to encode **both the presence of a synaptic pair and its direction**. This formulation allows us to **directly learn from synaptic point annotations** instead of more expensive voxel-based synaptic cleft or vesicle annotations.
- The proposed representation also allows us to learn from synaptic point annotations only, since we do not rely on labeled synaptic features, such as synaptic clefts or vesicle clouds.

From fig 1we can have a connectome matrix, actually it is what the evaluation scripts do(they are written by funkey group too.)


#### 2nd place by previous postdoc in Hanspeter group
Use 3D convolutional neural network for two steps.
3D U-net+3D CNN, Use 3D U-net to learn labels by formulate a function, then prune it by 3D CNN
https://www.dropbox.com/s/vug579prnxt454n/miccai18syn.pdf?dl=0 
学习代码[GitHub - paragt/EMSynConn: One algorithm to detect synaptic location AND connectivity, both dyadic and polyadic, in Electron Microscopy volume.](https://github.com/paragt/EMSynConn)

#### 4th place, FN is good
Use Asymmetric Unet
[GitHub - nicholasturner1/Synaptor: Processing voxelwise Convolutional Network output trained to predict synaptic clefts for connectomics](https://github.com/nicholasturner1/Synaptor)

## Cluster

I did some data visualization for cerebellum and CREMI data which will be used in clustering work. Also implement some computer vision algorithm for feature extraction.[visualize cerebellum](https://github.com/james20141606/Summer_Intern/blob/master/synapse_cluster/jupyter/visualize_cerebellum_sample.ipynb)

I am considering to use deep learning based clustering methods, to do feature selection and clustering simultaneously. Also it is essential to consider model interpretability. 

Resources: [ELEKTRONN - Convolutional Neural Network Toolkit in Python. Fast GPU acceleration and easy usage.](http://elektronn.org/) is used for generate skeletons using deep learning.



*******
 Week 3
The main focus of week 3 is on NMJ labeling and synapse prediction project. So the progress of clustering and synaptic partner project is not much.

## cluster
I have further considered **clustering**  project. Since we will have a huge amount of data to cluster, it is a natural thought to use deep learning based clustering method, which I have mentioned last time. After discussion with donglai and zudi, they also agree we can use a (variational) auto-encoder to cluster and analyze the synapse. If have time, I may try 3D VAE to cluster the synapse, but it need some preprocessing work. We may at first align and rotate the 2D image for better results.

I have read some papers including
[Learning a Probabilistic Latent Space of Object Shapes via 3D Generative-Adversarial Modeling](https://arxiv.org/pdf/1610.07584.pdf)
[Clustering with Deep Learning:Taxonomy and New Methods](https://arxiv.org/pdf/1801.07648.pdf)

Which I thought will be useful

## synaptic partner
I have read and summarized some paper and codes last week on synaptic partner project. This week zudi and I discuss about previous work’s strategy. We have decided that I read and study the synaptic partner codes written by a previous postdoc. 

Now the codes is incomplete in github, later we may get the complete codes. The codes isn’t in a very good structure, and task 3 is harder and more complex than synapse prediction, so it will take me some time to fully understand the codes and make more improvements on it.


******
# Week 4
## synaptic partner
This week we mainly focus on task 3, synaptic partner prediction, this is a new and more challenging task for us. Previously we never try to predict synaptic partner, so we have to understand this task and process the raw data to get the train label.


### Align and process location to create training labels

I study and understand the synaptic partner’s identification criterion and process the location value in the same alignment steps with raw and clefts image.

- extract location and pre-post id, put these points in a volume
- align the volume, padding and deal with bad slices using same strategy 

location is only point id, we can shift the point by first draw the point in zero array and then extract location. Each point use pre and post id to trace back. The premise is location and clefts matches, I have checked it.

![Markdown](http://i1.fuimg.com/640680/db4521d532057170.png)

![Markdown](http://i1.fuimg.com/640680/239c484ca9b1ab55.png)

Codes:

- alignment matlab script
[Summer_Intern/T_align.m at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synaptic_partner/bin/T_align.m)
This script can align raw, clefts and location and reverse them
- jupyter
Deal with pre and post processing of locations array.
[Summer_Intern/cremi_shift.ipynb at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synaptic_partner/jupyter/cremi_shift.ipynb)



**visualize shift results**

![Markdown](http://i1.fuimg.com/640680/c6241b5b0bf7630b.png)

I also find that in A, B, C three volumes, the partner numbers differ a lot:432, 1324, 2276
But clefts numbers are similar:123, 131, 165


The align work needs many patience, I did it over ten times to ensure it is 100 percent right. The axis, scatter and imshow tradition and many steps process made it easy to make mistakes. At last I found that it is best to dilate the points in location array and visualize it using imshow uniformly to check the alignment.

### Synaptic partner identification model
The model can be derived from synapse identification model. We also use 3D U-net and add some changes. We study Funke’s previous work, it has some strengths and drawbacks.

For example, they use 14 vectors to represent all possible partner vectors. And the model predict a 14 channel one-hot vector. But this methods deliberately overfits on CREMI datasets. Since we would like to develop a model to predict synaptic partners on JWR datasets, we should use a more generalized methods. But the searching space will increase a lot.



- dilate location point
for each points(so it can specify location)
- Generate 4 channel output (binary, Z, Y, X)
binary for **localization**, and Z, Y, X for vector **orientation**
We will use cosine loss to evaluate orientation
So this can be considered as a multi task training
- use branched model to predict two parts
Output mask and vector separately.
A very natural thought is we can design the model further to multiply the binary channel to the orientation part as **Attention mechanism**, the two branched models can share weights. I use a similar architecture in another project and it works well

It is hard to both predict orientation and length. So maybe we can do post-processing work: we only predict orientation, and calculate the distance from pre synapse to clefts, and add the distance to produce post synapse location.



### Hacking toufiq’s codes:

I also try to study and understand Toufiq’s work. I found Toufiq and Lee has done a lot on task 3 and related synapse work. They have some valuable work and codes to be recovered. So I try to find something useful to use. 

They have a github  repo which has many useful codes for synapses. It even has codes for finding seeds etc. [GitHub - microns-ariadne/pipeline_engine: reconstruction pipeline](https://github.com/microns-ariadne/pipeline_engine/)

Prediction of pre and post and segmentation(pre and post is self-labeled and segmentation is predicted) and clefts(ground truth in original dataset)

![Markdown](http://i1.fuimg.com/640680/44ce375316d09d8a.png)

use binary dilation for gt-syn
Use segment_vesicle_style function



## Synapse cluster
Help siyan with 3D skeleton. Direct 3D skeleton isn’t very good since the distance of sections (30/40 nm) is a little long. Direct interpolation or dilation also works badly.

So I try a ICP and KNN algorithm to maximize matching of two 2D contours and find the nearest neighbor of each point in two neighbor contour. This idea originate from calculating the volume size of a 3D object. After finding each points neighbor, we can do linear interpolation to create another 9 sections for better 3D skeleton.  

Codes: 
[Summer_Intern/ICP_KNN.ipynb at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synapse_cluster/jupyter/ICP_KNN.ipynb)

****************

# Week 5 & 6
## Cluster
Use auto encoder to reconstruct synapse and cluster the latent variable. Generate missing slides, intensity, rotation, elastic to force auto-encoder learn

I also find a paper by FAIR:  Deep Clustering for Unsupervised Learning of Visual Features https://arxiv.org/pdf/1807.05520v1.pdf, it proposed an end-to-end method using  deep learning for clustering. They test it on  ImageNet and outperforms the current model. Maybe it is also useful in our datasets too.



## Synaptic partner
### Run and test a model to predict synapse and synaptic partner simultaneously
I try to understand toufiq’s paper https://arxiv.org/pdf/1807.02739.pdf Detecting Synapse Location & Connectivity by Signed Proximity Estimation and Pruning with Deep Nets. And rebuild the model using Keras. So we can have two different kinds of models to solve the **synaptic partner problems**. One is discussed before, and the other is toufiq’s model. We will compare this two model and take the advantages of two models to get better performance on CREMI.



I  rewrite and modify toufiq’s model using our data and understand his solutions about synaptic partner problems.
I apply multiple changes to the model.
- Change keras backend from theano to tensorflow and modify the corresponding codes.
- Change depraceted function and update codes.
- Change merge to concatenate, update model, conv3D 

The model looks like this:

![Markdown](http://i4.fuimg.com/640680/14407c5eb5a7dc2e.png)

```
THEANO_FLAGS=device=cuda$1,floatX=float32,dnn.enabled=True,dnn.library_path=/n/home05/paragt/cuda/lib64,dnn.include_path=/n/home05/paragt/cuda/include python -u  bin/vertebrate/pixel/unet_3d_valid_unnorm_leaky_f24.py --trial=kasthuri_synapse_polarity_full_linear_leaky_f24_316_32 --imagedir=/n/coxfs01/paragt/test_submit/ecs_synapse_polarity_full/grayscale_maps2_ac4/  --gtname=/n/coxfs01/paragt/test_submit/ecs_synapse_polarity_full/ac4_syn_polarity_both_corrected.h5 --ft=0
```


```
module load cuda/9.0-fasrc01
module load cudnn/7.0.3-fasrc02
module load Anaconda
source ~/anaconda2/bin/activate kears_theano

THEANO_FLAGS=device=cuda,floatX=float32,dnn.enabled=True python -u test_pixelwise.py --imagedir test_data/grayscale_maps_half/ --savename test_data/jwr_pixelwise_polarity.h5 --modelname models/3D_unet_jwr_synapse_polarity_half_linear_leaky_f24_316_32_100000.json --weightname models/3D_unet_jwr_synapse_polarity_half_linear_leaky_f24_316_32_100000_weights.h5
```

![Markdown](http://i4.fuimg.com/640680/2a531757ef1d035b.png)





### post processing
Toufiq has many post processing methods and it will be useful to process our prediction. So I study his codes and implement them.

dilate gt-syn to have bigger region

![Markdown](http://i4.fuimg.com/640680/9cd40ceb9e49ebe8.png)

![Markdown](http://i4.fuimg.com/640680/cb94994ad0869007.png)

some functions in 
https://github.com/microns-ariadne/pipeline_engine

- segment_vesicle_style
Segment according to the "Vesicle" algorithm  See 
http://arxiv.org/abs/1403.3724 
VESICLE: Volumetric Evaluation of  Synaptic Interfaces using Computer Vision at Large Scale

Volumetric Evaluation of Synaptic Interfaces using Computer vision at Large Scale
Segment according to the "Vesicle" algorithm

![Markdown](http://i4.fuimg.com/640680/abd068c68b9d05f6.png)

It seems the algorithm  **segment_vesicle_style** do some post processing to **smooth the results**

- match_synapses_by_overlap(gt_syn_np, syn_seg)
Determine the **best ground truth synapse for a detected synapse by overlap**,  **gt_syn_np**: dilated gt synapse, **syn_seg**: post processed prediction
Return two vectors. 
	- The first vector is the matching label in d for each gt label (with zero for "not a match"). 
	- The second vector is the matching label in gt for each detected label.

interactively show blend of EM and dilated prediction

```
def draw_synseg(idx):
    fig,ax=plt.subplots(1,figsize=(8,8))
    pylab.imshow(img[idx], cmap='gray')
    pylab.imshow(gt_syn_np[idx], cmap='tab20', alpha=.3)
    pylab.colorbar()
    pylab.show()
interact(draw_synseg, idx=(0, 144))
```

Dilated GT

![Markdown](http://i4.fuimg.com/640680/78d027d947270dee.png)

post processed prediction

![Markdown](http://i4.fuimg.com/640680/1f61c116cc41a292.png)




****

Last three weeks
Week 7,8,9 (10)

Continue to improve synaptic partners model. It first uses a 3D U-net  to generates candidate synaptic connections from voxel-wise predictions of signed proximities. A second 3D CNN then prunes the set of candidates to produce the final detection of cleft and polar. 

The U-net first generates candidate with many false positives

![Markdown](http://i1.fuimg.com/640680/1da2e8575a992b08.png)

Then the 3D CNN uses EM image, predicted candidate and segmentation to classify if a candidate is a syanpse or not.

![Markdown](http://i1.fuimg.com/640680/2216275efd0ce764.png)

****


#### use bin/vertebrate/pixel/test.py to generate candidate
```
THEANO_FLAGS=device=cuda$1,floatX=float32,dnn.enabled=True,dnn.library_path=/n/home05/paragt/cuda/lib64,dnn.include_path=/n/home05/paragt/cuda/include python -u bin/vertebrate/pixel/test.py --imagedir  vol3_pngspad/ --savename jwrprediction/jwr_pixelwise_polarity_vol3.h5 --modelname models/3D_unet_jwr_synapse_polarity_half_linear_leaky_f24_316_32_100000.json --weightname models/3D_unet_jwr_synapse_polarity_half_linear_leaky_f24_316_32_100000_weights.h5
```
test_pixel_wise.py 是bin/vertebrate/pixel/test.py

- imagedir  /n/coxfs01/xupeng/projects/EMSynConn-master/vol3_image
- imagedir   /zudi_data/jwr-test/grayscale_maps_half/image_00105.png
- savename 
- modelname   JWR_annotation/trained_models/Toufiq/keras1/3D_unet_jwr_synapse_polarity_half_linear_leaky_f24_316_32_100000.json
- weightname  JWR_annotation/trained_models/Toufiq/keras1/3D_unet_jwr_synapse_polarity_half_linear_leaky_f24_316_32_100000_weights.h5

Must keep the following parameters, so we should do padding on jwr data.

```
patchSize = 316
patchSize_out = 228
patchZ = 32
patchZ_out = 4
```



#### 8.28 CNN
##### Step1 
Test.py in **bin/candidate/pixel/test.py**

```
#!/bin/bash
# add all other SBATCH directives here...
#SBATCH -p seas_dgx1 
#SBATCH --gres=gpu:1
#SBATCH -n 1 # Number of cores
#SBATCH -N 1 # Ensure that all cores are on one machine                        
#SBATCH --mem=60000
#SBATCH -t 3-0:00:00
#SBATCH -o jwr_candidate_prune.log

pred_thd_start=-0.5
iteration_start=21500
for ((imultiple=0;imultiple<20;imultiple++));
do
    iteration1=`echo $iteration_start + 500*$imultiple | bc -l`
model_name=kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased/syn_prune_kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased_${iteration1}.json
    weightname=kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased/sys_prune_kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased_${iteration1}_weights.h5
    echo model $model_name
    echo weight $weightname
    echo threshold $pred_thd
    THEANO_FLAGS=device=cuda,floatX=float32,dnn.enabled=True python -u test.py  --trial=jwrdata_candidate_prune --datadir=kasthuri_test_files --imagedir=grayscale_maps2_cropped --predname=ac3_synapse-polarity_full_linear_leaky_f24_316_32_122500.h5 --syn_gtname ac3_syn_groundtruth_cropped.h5  --segname=ac3-seg_m.h5 --seg_gtname ac3_seg_groundtruth_cropped.h5  --inputSize_xy=160 --inputSize_z=16 --modelname $model_name  --weightname $weightname  --cleft_label

done
exit 0;
```


****
##### Step2
First generate proposals

```
#!/bin/bash
# add all other SBATCH directives here...

#SBATCH -p cox
#SBATCH -n 1 # Number of cores
#SBATCH -N 1 # Ensure that all cores are on one machine                        
#SBATCH --mem=60000
#SBATCH -t 3-00:00:00
#SBATCH -o ecs_synapse_multiclass_f24_316_32_%j.log


iter=150000
python generate_proposals.py  --trial test_seg_trial_0.3_o100_leaky_f24_160_16 --datadir test_files --imagedir grayscale_maps2_tst4x6x6 --predname test_ecs_synapse_polarity_full_margin_linear_leaky_f24_316_32_196000-cropped.h5  --syn_gtname ecs-syn-tst-groundtruth-polarity.h5  --segname result_ecs-4x6x6-100K-40000-itr3-thd0.1_xml_m.h5  --seg_gtname seg_groundtruth0.h5  --inputSize_xy=160 --inputSize_z=16

exit 0;
```

##### Step3
**submit_test_dgx_kasthuri.sh**  test.py  do prediction

```
#!/bin/bash
# add all other SBATCH directives here...
#SBATCH -p seas_dgx1 
#SBATCH --gres=gpu:1
#SBATCH -n 1 # Number of cores
#SBATCH -N 1 # Ensure that all cores are on one machine                        
#SBATCH --mem=60000
#SBATCH -t 3-0:00:00
#SBATCH -o ecs_test_316_32_%j.log
source ~/anaconda2/bin/activate kears_theano

pred_thd_start=-0.5
iteration_start=21500
for ((imultiple=0;imultiple<20;imultiple++));
do
    iteration1=`echo $iteration_start + 500*$imultiple | bc -l`
model_name=kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased/syn_prune_kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased_${iteration1}.json
    weightname=kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased/sys_prune_kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased_${iteration1}_weights.h5
    echo model $model_name
    echo weight $weightname
    echo threshold $pred_thd
    THEANO_FLAGS=device=cuda,floatX=float32,dnn.enabled=True python -u test.py  --trial=kasthuri_test_seg_trial_0.3_o100_leaky_f24_160_16_122K --datadir=kasthuri_test_files --imagedir=grayscale_maps2_cropped --predname=ac3_synapse-polarity_full_linear_leaky_f24_316_32_122500.h5 --syn_gtname ac3_syn_groundtruth_cropped.h5  --segname=ac3-seg_m.h5 --seg_gtname ac3_seg_groundtruth_cropped.h5  --inputSize_xy=160 --inputSize_z=16 --modelname $model_name  --weightname $weightname  --cleft_label

done
exit 0;
```

**run_unet_06_f24_kasthuri.sh**  train a unet_3d_valid_unnorm_leaky_f24 model

```
THEANO_FLAGS=device=gpu$1,floatX=float32,dnn.enabled=True,dnn.library_path=/n/home05/paragt/cuda/lib64,dnn.include_path=/n/home05/paragt/cuda/include python -u  unet_3d_valid_unnorm_leaky_f24.py --trial=kasthuri_synapse_polarity_full_linear_leaky_f24_316_32 --imagedir=/n/coxfs01/paragt/test_submit/ecs_synapse_polarity_full/grayscale_maps2_ac4/  --gtname=/n/coxfs01/paragt/test_submit/ecs_synapse_polarity_full/ac4_syn_polarity_both_corrected.h5
```

```
pred_thd_start=-0.5
iteration_start=21500
for ((imultiple=0;imultiple<20;imultiple++));
do
    iteration1=`echo $iteration_start + 500*$imultiple | bc -l`
model_name=kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased/syn_prune_kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased_${iteration1}.json
    weightname=kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased/sys_prune_kasthuri_val_seg_trial_0.3_o100_leaky_f24_160_16_122K_unbiased_${iteration1}_weights.h5
    echo model $model_name
    echo weight $weightname
    echo threshold $pred_thd
done
```



We compare the model with SynEM on Kasthuri data. The model makes better prediction.

![Markdown](http://i1.fuimg.com/640680/8b04e56610dffdea.png)

We will also test another model, Resnet+U-net, originated from task2 and it has many improvements in this summer.
It includes dilation CNN, batch normalization for multi-GPU, squeeze-and-excitation block. For polarity prediction, now the pixel can be either background, pre-synapse or post-synapse, so we can adapt the model to 3 channel  output. And we can change the loss function to MSE.

![Markdown](http://i1.fuimg.com/640680/e80d496181dafa1e.png)

It has better generalization than what Funke’s group’s model since they over fit the CREMI dataset. It performs well on JWR data.

I will apply our model to predict synEM data. Thus we both test synEM model on our data and test our model on their data, this will give us enough result to compare our model.


SynEM data has four channels, using different size of synapse. We only use the small polarity for post synapse and large for pre synapse.
[image:F10F22C4-AAA4-4868-B496-BF7DB0A73A97-385-0000D376F35FA1C0/屏幕快照 2018-09-04 下午5.27.40.png]


`env create -f bin/synapse_pytorch/envs/py3_pytorch.yml`

`source activate py3_pytorch`


```
source activate py3_pytorch
CUDA_VISIBLE_DEVICES=0 python3 -u bin/synapse_pytorch/train_sync_polarity.py -t /n/coxfs01/xupeng/projects/synapse/data/synEM/synEM_train_data/ -dn raw/synEM_train_raw_000.h5 -ln label_new/synEM_train_label_new_channel_000.h5 -o outputs/9.6_single -lr 1e-03 --volume-total 1600000 --volume-save 100000 -mi 8,160,160 -g 1 -c 1 -b 1
```



```
source activate py3_pytorch
CUDA_VISIBLE_DEVICES=0 python3 -u bin/synapse_pytorch/train_sync_polarity.py -t data/synEM/synEM/synEM_train_data/ -dn raw/synEM_train_raw_000.h5 -ln label_new/synEM_train_label_new_channel_000.h5 -o outputs/9.6_single -lr 1e-03 --volume-total 1600000 --volume-save 100000 -mi 8,160,160 -g 1 -c 1 -b 1
```


```
source activate py3_pytorch
CUDA_VISIBLE_DEVICES=0 python3 -u bin/synapse_pytorch/train_sync_polarity.py -t /n/coxfs01/zudilin/research/data/JWR/syn_vol1/ -dn im.h5 -ln jwr_syn_polarity.h5 -o outputs/9.10_single -lr 1e-03 --volume-total 1600000 --volume-save 100000 -mi 8,160,160 -g 1 -c 1 -b 1
```


```
source activate py3_pytorch
CUDA_VISIBLE_DEVICES=0,1,2 python3 -u bin/synapse_pytorch/train_sync_polarity.py -t /n/coxfs01/xupeng/projects/synapse/data/synEM/synEM_train_data/ -dn raw/synEM_train_raw_000.h5@raw/synEM_train_raw_001.h5@raw/synEM_train_raw_002.h5 -ln label_new/synEM_train_label_new_channel_000.h5@label_new/synEM_train_label_new_channel_001.h5@label_new/synEM_train_label_new_channel_002.h5 -o outputs/9.6 -lr 1e-03 --volume-total 1600000 --volume-save 100000 -mi 8,160,160 -g 3 -c 3 -b 3
```

```
#!/bin/bash
# add all other SBATCH directives here...

#SBATCH -p cox
#SBATCH --gres=gpu:8
#SBATCH --constraint=titanx
#SBATCH -n 8 # Number of cores
#SBATCH -N 1 # Ensure that all cores are on one machine
#SBATCH --mem=50000
#SBATCH -t 5-00:00:00
#SBATCH -o logs/train_%j.log

module load cuda
source activate py3_pytorch

CUDA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7 python3 -u bin/synapse_pytorch/train_sync_polarity.py -t /n/coxfs01/xupeng/projects/synapse/data/synEM/synEM_train_data/ -dn raw/synEM_train_raw_000.h5@raw/synEM_train_raw_001.h5@raw/synEM_train_raw_002.h5@raw/synEM_train_raw_003.h5@raw/synEM_train_raw_004.h5@raw/synEM_train_raw_005.h5@raw/synEM_train_raw_006.h5@raw/synEM_train_raw_007.h5@raw/synEM_train_raw_008.h5@raw/synEM_train_raw_009.h5 -ln label_new/synEM_train_label_new_channel_000.h5@label_new/synEM_train_label_new_channel_001.h5@label_new/synEM_train_label_new_channel_002.h5@label_new/synEM_train_label_new_channel_003.h5@label_new/synEM_train_label_new_channel_004.h5@label_new/synEM_train_label_new_channel_005.h5@label_new/synEM_train_label_new_channel_006.h5@label_new/synEM_train_label_new_channel_007.h5@label_new/synEM_train_label_new_channel_008.h5@label_new/synEM_train_label_new_channel_009.h5 -o outputs/9.5_10_volumes -lr 1e-03 --volume-total 1600000 --volume-save 100000 -mi 8,160,160 -g 8 -c 8 -b 32

# end of program
exit 0;
```


