---
title: NMJ Project
pubDatetime: 2018-07-14T20:35:19Z
description: "Also I finished another synapse prediction and synaptic polarity prediction work during summer intern in Hanspiter Lab"
author: "James Chen"
tags: ["project", "neural science", "summer intern", "connectomics", "computational neural science", "deep learning", "computer vision", "Jeff Lichtman"]
categories: ["projects"]
draft: false
---


It is my detailed progress of **Neural Muscular Junction project** during my summer intern in [Jeff Lichtman Lab](https://lichtmanlab.fas.harvard.edu/). With the generous help of Jeff, I complete NMJ tracing and segmentation work.
  
The **codes related** are here: 
[Main codes](https://github.com/james20141606/Summer_Intern)
[Automatic pipeline](https://github.com/james20141606/NMJ_automatic_pipeline)

For **whole work summary** please [see here](https://www.cmwonderland.com/2018/09/12/100_summer_intern/)

<iframe src="https://drive.google.com/file/d/1XyEPj9r7p8VNk5nLlLIPNhZjuDHu2KTY/preview" width="100%" height="600px"></iframe>

Also I finished another synapse prediction and synaptic polarity prediction work during summer intern in [Hanspiter Lab](https://vcg.seas.harvard.edu/people)


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
# First two weeks
Since the new data is still to be processed, I spent several days doing dense segmentation work both for study and future training. 

I have done 25 sections dense segmentation in W12-W14 for 4 days(7.5-7.8), it includes dense segmentation of Axons, Schwann cell, and Schwann cell nucleus. 

I have written codes to use python to visualize animation of the 25 segments ![Markdown](http://i2.tiimg.com/640680/674ef868297b66d0.gif). Since the computational  work use more python codes know, I also shared my animating code with others.  
[plot segment script](https://github.com/james20141606/Summer_Intern/blob/master/NMJ/jupyter/plot_segment.ipynb)

Core codes to plot animation in python

```
defdef  transform_rgbtransfor (img):
    num = np.unique(img.reshape(-1,3),axis=0).shape[0]
    #print (num)
    #rgbarr = np.ndarray([num*3])
    #for i in range(num*3):
      #  rgbarr[i] = np.random.uniform(0,1)
    #rgbarr = rgbarr.reshape(-1,3)
    image = np.zeros([img.shape[0]*img.shape[1],3])
    sumimg = np.sum(img.reshape(-1,3),axis=1)
    uniqueind = np.unique(img.reshape(-1,3),axis=0)
    for i in np.arange(0,num-1):
        image[sumimg==3*(uniqueind[i][0]+1)] = colorsgallery[i]
    #print (sumimg.shape)
    image[sumimg==0] = [1,1,1]
    return image.reshape(img.shape[0],img.shape[1],3)
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib import rc
def animations(opt='show',type='gif'):
    '''
    opt: show/save
    type:gif/mp4
    '''
    imagelist = [transform_rgb(imagedata[i][100:900,100:900]) for i in range(26)]
    fig,ax=plt.subplots(1,figsize=(16,12)) 
    im =ax.imshow(imagelist[0])
    def updatefig(j):
        im.set_array(imagelist[j])
        return [im]
    anim = animation.FuncAnimation(fig, updatefig, frames=range(26), 
                                  interval=100, blit=True)
    if opt=='show':
        return anim
    elif opt=='save':
        if type=='mp4':
            Writer = animation.writers['ffmpeg']
            writer1 = Writer(fps=10)
            anim.save('animation.'+type, writer=writer1,dpi=1000)
        elif type=='gif':
            #Writer = animation.writers['imagemagick']
            anim.save('animation.'+type, writer='imagemagick', fps=10)
```

I also read several articles Marco and Yaron recommened, including previous NMJ work, some segmentation and Connectome processing pipeline papers.

## Future work
We also discuss a lot about the future plan of the project. Since it is more challenging than other tasks, it seems we are a little slow in progress. We have worked with Marco to find a way to label the ROI and use a script to extract coordinates of the bounding box. We have labeled one mask, later we will test Adi’s align results and generate more.

- Manually create ROI region for bundles and NMJ for alignment
- Do segmentation and \textbf{statistical analysis} work on some NMJs(concerning our limited staying time, it seems there isn’t enough time to wait for all NMJs’ alignment and segmentation results to analyze)


*******
# Week 3
## mask and seeding
This week we have worked out a plan on alignment and seeding.

We use a mind map to record tree’s nodes to visualize our progress. The mask was sent to Adi for aligning. The alignment results seem very good.

I have seeded three masks Adi sent back, **for about 900 sections mainly in bundle area.**

I also wrote python script [Summer_Intern/plot_segment.ipynb at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/NMJ/jupyter/plot_segment.ipynb) for further analysis. Since I am proficient in using python for visualization, statistical analysis and machine learning, I wrote some python scripts to read seeding result, visualize them and plot them in 3D and animation. It will be better to have more statistical analysis when I collect more seeding data.
![Markdown](http://i1.fuimg.com/640680/45e727fc31a9b0dc.png)


## discussion on mask
When we put masks on ROI, we found many branches even in bundle area, two branches from one stem may encounter and form a closed loop. We are worried if it will be a problem when we merge all masks together. After discussing with Adi and Daniel, we understand that the spatial structure’s change isn’t a big problem.


**************
Week 4

## My thought about how the whole project
This week I continue to seed on Mask3, and then I do a lot of exploration on how to do the NMJ project automatically.

I have understood how big and challenging this project is, it requires so many manually labeling work than we can’t finish all the masking and seeding and segmentation and reconstruction work in two months. We know that it took KK and Marco several months to finish part of the bundle parts. But the remaining parts are more complex to seed, segment and it contains maybe 200 masks with approximately 50,000 sections. It is hard to estimate how long it will take to finish the whole project

However, as I am getting more familiar with this project, I am trying to build a more automatically pipeline for seeding, predicting membrane and segmentation. If it works, the project may move faster when we are here and after we leave:)


### Seeding on Mask3  
I felt that seeding on mask3 is much more complex than previous bundle seeding, the axon travels very fast and I should look up and down to look for one axon, it takes much more time to trace the branch than the main bundle.

## Automatic pipeline
**We would like to build up a more automatic pipeline before we leave and test the whole pipeline on several masks to see if they can be merged and reconstructed.**

We would like to build up the whole pipeline, prepare all the codes and model for prediction and processing and write down the protocol.

The complete pipeline should contain: 
**Generating Masks —> Seeding —> Predict Membrane —> Expand Seeds —> Merge different Masks**

Previously we do seeding manually and then predict membrane, but the remaining masks have so many sections, I would like to do the seeding work more automatically too.

### Predict Membrane
The automatically prediction parts must include membrane prediction, because it is “easier” to predict since the raw image already have the membrane.

### Automatically seeding
The traditional way is to manually put seeds on each axon, but we have approximately 50,000 sections if all masks are generated, it is so time-consuming to manually put seeds. I will **generate seeds by distance transformation from membrane**

Then the seeds must be indexed to track each seed is from which axon, so we will manually put seeds  per 100 sections, then do **Hungarian matching.**

### segmentation
Expand the seed to generate segments

### Merge masks
We are thinking about linear interpolation to merge anchor sections for loop problems. We will discuss it more with Daniel and Yaron after the segmentation

## Algorithm
The related codes are here:
[GitHub - james20141606/membrane_prediction: Use 3D U-net to predict membrane predition](https://github.com/james20141606/membrane_prediction)

### Predict Membrane
I will use a 3D U-net model to use contours extracted from dense segmentation sections. Use 50 sections for training, then predict more, proofread predicted sections to generate more training samples. **The iterative training and predicting method will make the model more precise.**

The model’s weight is adaptive to the pixels ratio, I can do fine tune on the model iteratively. So the model will be more precise and requires fewer proofreading. Last week I do many augmentation works, it is also useful to generate more training images since I only have 50 sections for training now.

**How to fine tune:**
If we want better result, we can manually label several sections on each mask and retrain the model on each mask.

For membrane prediction, since we do not consider affinity, we can also consider 2D U-net, it contains much less parameters and easier to train.

### Automatically seeding
- **Distance transformation** to generate seeds from membrane
- **Hungarian matching** to label each seeds for different axons. Manually label one section’ s seed and do Hungarian matching for the next 100 sections.

### Watershed
Use watershed to expand seeds and generate segments

### Useful resources
[hungarian-algorithm/hungarian.py at master · tdedecko/hungarian-algorithm · GitHub](https://github.com/tdedecko/hungarian-algorithm/blob/master/hungarian.py#L6)
[GitHub - hrldcpr/hungarian: Hungarian / Munkres’ algorithm for the linear assignment problem, in Python](https://github.com/hrldcpr/hungarian)

[pipeline_engine/ariadne_microns_pipeline/tasks at cf100202997d3c848a21de441e15deb9f975042d · microns-ariadne/pipeline_engine · GitHub](https://github.com/microns-ariadne/pipeline_engine/tree/cf100202997d3c848a21de441e15deb9f975042d/ariadne_microns_pipeline/tasks)



Other possible algorithm:
- seeding
Use EM data to predict seeds, train seeding prediction network, using affinity because the axon travels fast. Sebastian’s group has some work. But I think it is imprecise compared to membrane prediction--distance transformation algorithm

> Convolutional Networks Can Learn to Generate Affinity
> Graphs for Image Segmentation
> Maximin affinity learning of image segmentation

[GitHub - jiwoon-ahn/psa: Learning Pixel-level Semantic Affinity with Image-level Supervision for Weakly Supervised Semantic Segmentation, CVPR 2018](https://github.com/jiwoon-ahn/psa)


## Work on membrane prediction

### Prepare ground truth training set

I have started on membrane prediction pipeline after discussion with zudi, yaron and others. I would like to use previously label siyan and I have done in first two weeks to save time. We have done dense segmentation on 51 sections, I wrote a python script


Codes: [Summer_Intern/extract_membrane_gt.ipynb at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/NMJ/jupyter/extract_membrane_gt.ipynb)

 to extract the needed EM image and contours of the membrane in the following steps:

- export segmentation and EM ROI from VAST
- read in python, converting id array to RGB array for visualization

![Markdown](http://i2.tiimg.com/640680/8b18f43f830a2eb7.png)

- find bounding box of each segmentation and EM image

```
def find_bounding(data):
    xmin = np.sort(np.where(data[:,:,0]!=0)[0])[0]
    xmax = np.sort(np.where(data[:,:,0]!=0)[0])[-1]
    ymin = np.sort(np.where(data[:,:,0]!=0)[1])[0]
    ymax = np.sort(np.where(data[:,:,0]!=0)[1])[-1]
    return xmin, xmax, ymin, ymax
row = 26
fig,ax=plt.subplots(row,2,figsize=(16,6*row))
for i in range(row):
    for j in range(2):
        xmin, xmax, ymin, ymax = find_bounding(segdata[i*2+j])
        ax[i,j].imshow(transform_rgb(segdata[i*2+j][(xmin-10): (xmax+10), (ymin-10): (ymax+10)]))
```

- remove Schwann cell to concentrate on axons

First it has some problems

![Markdown](http://i2.tiimg.com/640680/2a5303ed7c054769.png)

Then I separately plot and find the black wrong region is 25 and 38

After correction:

![Markdown](http://i2.tiimg.com/640680/96c7c89bc409d6ba.png)

- convert the segment array to binary mask

![Markdown](http://i2.tiimg.com/640680/070eef826c0612ae.png)

- Make sure each mask and EM data are in same bounding box

![Markdown](http://i2.tiimg.com/640680/2b1b68b735d93e29.png)

- Generate contours as training set label
opencv’s findcontour function is not suitable for same grayscale image, so I use erode and dilation
```
open = cv2.erode(grayimg, None, iterations = 4)
open1 = cv2.dilate(open, None, iterations = 3)
imshow(open1-open)
```

![Markdown](http://i2.tiimg.com/640680/c9d99655bdaf9cac.png)


- Padding for same image size 
Do reflection padding on each image to generate images with same size.

![Markdown](http://i2.tiimg.com/640680/06d9ead45f4caa9a.png)

The margin is the reflection of the original image
Store in HDF5
- Save image and label as HDF5
EM data as training set’s image and contour as label

Save as uint8   (51, 530, 835)


### Train membrane prediction model
Input image and label are the 51 bundle sections.

**Train model args:** 
Run on two machines: one with one gpu and another with 4 gpus

```
CUDA_VISIBLE_DEVICES=3,4,5,6 python3 -u bin/train.py -t data/train_set/ -dn em_51 -ln mask_51 -o outputs/nmj0729mixloss -lr 0.001 --volume-total 40000 --volume-save 2000 -mi 4,256,256 -g 1 -c 12 -b 4 -lt 4 -ac 2

CUDA_VISIBLE_DEVICES=0 python3 -u bin/train.py -t data/train_set/ -dn em_51 -ln mask_51 -o outputs/nmj0729mixloss -lr 0.001 --volume-total 40000 --volume-save 2000 -mi 4,256,256 -g 1 -c 6 -b 1 -lt 4 -ac 2

#-lt 4 focal and dice loss
```

References:

```
CUDA_VISIBLE_DEVICES=0,1 python3 -u bin/synapse_pytorch/train.py -t data/cremi/ -dn images/im_A_v2_200.h5@images/im_B_v2_200.h5@images/im_C_v2_200.h5 -ln gt-syn/syn_A_v2_200.h5@gt-syn/syn_B_v2_200.h5@gt-syn/syn_C_v2_200.h5 -o outputs/cremi0719mixloss -lr 0.001 --volume-total 400000 --volume-save 20000 -mi 24,256,256 -g 2 -c 6 -b 2 -l mix
#b:6  try to keep gpu and batch size same
```

The hp003 memory is small, also train on hpc

#### Check loss
```
tensorboard --logdir=outputs/nmj0729mixloss
```

Monitor loss and test on new EM image. If is good, train it longer with more GPUs

Train loss( DICE + Focal loss)

![Markdown](http://i2.tiimg.com/640680/68a5d5858d2eca5f.png)

Focal loss

![Markdown](http://i2.tiimg.com/640680/14e81611ee917fa6.png)

Dice loss

![Markdown](http://i2.tiimg.com/640680/20dac5fc8da5ae1f.png)

It seems that the combined loss and both focal and dice loss decrease well.


#### real time monitoring predicted result 
Use TensorboardX to monitor predicted results:

```
if i % 20 == 0:
            #draw image every 20 batches
            writer.add_image('EM image '+str(i),
                             torchvision.utils.make_grid(volume), i)
            writer.add_image('GT image '+str(i), torchvision.utils.make_grid(label), i)
            writer.add_image('predict image '+str(i), torchvision.utils.make_grid(output), i)
```

This will allow me to see the improvement of model’s performance more clearly.


EM in 3680th batches

![Markdown](http://i2.tiimg.com/640680/6ba0407959138c82.png)

Ground truth in 3680th batches

![Markdown](http://i2.tiimg.com/640680/83ebcf388707f0a6.png)

Predicted in 3680th batches

![Markdown](http://i2.tiimg.com/640680/f618886ef775eb3c.png)


Then I will predict new EM image which is preprocessed by the previous steps. Then do proofreading on the predicted membrane. Then do distance transformation to generate seeds.


***************

# Week 5 & 6


# predict on EM

- prepare predict data
- export mask1 em
- Mip level 3, it is really important to keep the resolution same( realize it after several failures)
- set to window
- bad slices record, replace by the previous layer

**Record export coordinates**
    - 0-80: 10809-20685  5448-11102
    - 81-144 9200-19076   4649-10303
    - 145-182 8193-18069  4104-9758
    - 183-219  7337-17213  3792-9446
    - 220-265 6496-16372  3584-9238
    - 266-292   55509-15385    3241-8895
    - 293-300 4590-14466   2914-8568

**Test commands**
```
CUDA_VISIBLE_DEVICES=3,4,5,6 python3 -u bin/test.py -t data/mask1/ -dn mask1_em.h5 -o outputs/mask1output -mi 4,256,256 -g 1 -m outputs/nmj0729mixloss/volume_40000.pth -c 12 -b 4 -ac 2
```

- see results:
http://127.0.0.1:8889/notebooks/projects/membrane/jupyter/visualize_prediction_result.ipynb

Not good, check very bad slices and deflicker
Try to train for a longer time

```
CUDA_VISIBLE_DEVICES=3,4,5 python3 -u bin/train.py -t data/train_set/ -dn em_51 -ln mask_51 -o outputs/nmj0731retrain -lr 0.0005 --volume-total 400000 --volume-save 4000 -mi 4,256,256 -g 3 -c 8 -b 3 -lt 4 -ac 2

CUDA_VISIBLE_DEVICES=0 python3 -u bin/train.py -t data/train_set/ -dn em_51 -ln mask_51 -o outputs/nmj0729mixloss -lr 0.001 --volume-total 40000 --volume-save 2000 -mi 4,256,256 -g 1 -c 6 -b 1 -lt 4 -ac 2

#-lt 4 focal and dice loss
```

It seems the results of membrane prediction isn’t very good. Needs many post process work. For example, one way is to use a deep learning model like U-net to predict affinity and close the membrane.

![Markdown](http://i4.fuimg.com/640680/080f9880226ba6e5.png)

#### preprocess
**Deflickering work**
I use deflickering codes to smooth the contrast.
- [ ] [EM-preprocess/T_deflicker.py at master · donglaiw/EM-preprocess · GitHub](https://github.com/donglaiw/EM-preprocess/blob/master/script/T_deflicker.py)
20 sec to process a volume with data size 100x1024x1024 using online version of deflickering


![Markdown](http://i4.fuimg.com/640680/493a642ca564813f.png)



#### try to predict directly on masks. Not the membrane
It may have some advantages: do not need to be precise, we can perform distance transformation on the predicted masks to get the seed. And it will be better to track and automatically assign labels using masks instead of seeds.


![Markdown](http://i2.tiimg.com/640680/96c7c89bc409d6ba.png)

Comparison of mask and membrane:
![Markdown](http://i4.fuimg.com/640680/743789aaa8f0fe9f.png)



### 7.31 retrain on deflicker data
volume_168000.pth
data/mask1/deflicker_em.h5

```
CUDA_VISIBLE_DEVICES=3,4,5 python3 -u bin/test.py -t data/mask1/ -dn deflicker_em.h5 -o outputs/mask1output8.01deflicker -mi 4,256,256 -g 3 -m outputs/nmj0801retrain/volume_156000.pth -c 3 -b 3 -ac 2
```


```
CUDA_VISIBLE_DEVICES=0 python3 -u bin/train.py -t data/train_set/ -dn em_51 -ln mask_51 -o outputs/nmj0731debug -lr 0.0005 --volume-total 4000 --volume-save 1000 -mi 4,256,256 -g 1 -c 3 -b 1 -lt 4 -ac 2

CUDA_VISIBLE_DEVICES=0 python3 -u bin/test.py -t data/mask1/ -dn deflicker_em.h5 -o outputs/mask1outputdebug -mi 4,256,256 -g 1 -m outputs/nmj0731retrain/volume_4002.pth -c 6 -b 1 -ac 2
```

Model structure has problems
Retrain on previous model

```
CUDA_VISIBLE_DEVICES=3,4,5 python3 -u bin/train.py -t data/train_set/ -dn em_51 -ln mask_51 -o outputs/nmj0801retrain -lr 0.0001 --volume-total 400000 --volume-save 4000 -mi 4,256,256 -g 3 -c 8 -b 3 -lt 4 -ac 2 -ft True -pm outputs/nmj0731retrain/volume_200001.pth
```

Train on segment data

```
CUDA_VISIBLE_DEVICES=2,3,4 python3 -u bin/train.py -t data/train_set/ -dn em_51 -ln mask_51_ -o outputs/nmj0801segment -lr 0.001 --volume-total 400000 --volume-save 4000 -mi 4,256,256 -g 3 -c 8 -b 3 -lt 4 -ac 2
```

It is weird that after some training, the test results have nothing

```
CUDA_VISIBLE_DEVICES=5 python3 -u bin/train.py -t data/train_set/ -dn em_51 -ln mask_51 -o outputs/nmj0801after -lr 0.001 --volume-total 400000 --volume-save 4000 -mi 4,256,256 -g 1 -c 8 -b 1 -lt 4 -ac 2
```


Add image augmentation, adjust intensity augmentation. Decrease contrast and brightness ratio, it will severely influence converge.

#### NMJ manually labeling work

First I start randomly from a terminal or axon. Then Jeff recommended it is better to start from axons. I use the latter method to manually label **two NMJs** for using one week.

At first it seems very hard to track and label NMJs. The boundary is unclear and I have little experience on labeling NMJs, it is a lot harder to label NMJs than labeling on the main bundle.

I will try to label maybe more **5 NMJs** to collect enough data to test the linear hypothesis: **the correlation of axon caliber and terminal area.** If we can prove that, we can save a lot of time: we can just dense segment on axons and calculate the corresponding terminal area. And we only need tracing on the terminals.

I will try to reslice the labeled NMJs to calculate the axon caliber. It seems VTK is a good tool to do reslice on any arbitrary orientation reslice.



#### Add more data for automatic pipeline
- [ ] 代码 [Jupyter Notebook](http://140.247.107.75:8889/notebooks/projects/membrane/jupyter/extract_membrane_from_marco.ipynb)
I processed marco’s data for training. It is really precious, we easily increase our data from 51 images to 1440 images. It is really helpful if we have more.

```
with h5py.File('data/train_set/marco_1435_mask') as f:
    f.create_dataset('main',data= paddedmask,dtype =uint8)
with h5py.File('data/train_set/marco_1435_membrane') as f:
    f.create_dataset('main',data= paddedmaskmem,dtype =uint8)
```

![Markdown](http://i4.fuimg.com/640680/8c9abba357fcb56c.png)

![Markdown](http://i4.fuimg.com/640680/ad6c8f42a22e89f1.png)

![Markdown](http://i4.fuimg.com/640680/db41e29e1b9c045a.png)



### updated pipeline
- segmentation first, doesn’t need to be very precise. 
- Then do distance transform and find the seed. It is easy to find connected component and then do distance transform to get seeds.
- Test distance transform and hungarian matching on marco’s data.

- [ ]  代码[Jupyter Notebook](http://140.247.107.75:8889/notebooks/projects/membrane/jupyter/extract_membrane_from_marco.ipynb)



8.3  training

```
CUDA_VISIBLE_DEVICES=0 python3 -u bin/train.py -t data/train_set/marco/ -dn marco_1435_em -ln marco_1435_mask -o outputs/nmj0804segmentmarcodata -lr 0.001 --volume-total 400000 --volume-save 4000 -mi 4,256,256 -g 1 -c 4 -b 1 -lt 4 -ac 2

CUDA_VISIBLE_DEVICES=0 python3 -u bin/train.py -t data/train_set/marco/ -dn marco_1435_em -ln marco_1435_mask -o outputs/nmj0805segmentmarcodataretrain -lr 0.001 --volume-total 400000 --volume-save 4000 -mi 4,256,256 -g 1 -c 4 -b 1 -lt 4 -ac 2 -ft True -pm outputs/nmj0805segmentmarcodataretrain/volume_4000.pth


CUDA_VISIBLE_DEVICES=0 python3 -u bin/test.py -t data/mask1/ -dn mask1_em.h5 -o outputs/mask1output8.04 -mi 4,256,256 -g 1 -m outputs/nmj0804segmentmarcodata/volume_108000.pth -c 2 -b 1 -ac 2
```

#### resolution matters!
It seems that the resolution influence the prediction. We should keep the training and test data in the same resolution!

Record test data’s export coordinates:
    - 0-80: 10809-20685  5448-11102
    - 81-144 9200-19076   4649-10303
    - 145-182 8193-18069  4104-9758
    - 183-219  7337-17213  3792-9446
    - 220-265 6496-16372  3584-9238
    - 266-292   55509-15385    3241-8895
    - 293-300 4590-14466   2914-8568

Try **mip4** result

```
CUDA_VISIBLE_DEVICES=0 python3 -u bin/test.py -t data/mask1/ -dn mask1_em_mip4.h5 -o outputs/mask1output8.05mip4 -mi 4,256,256 -g 1 -m outputs/nmj0804segmentmarcodata/volume_108000.pth -c 2 -b 1 -ac 2
```

![Markdown](http://i4.fuimg.com/640680/c8462edb973660e0.png)

Result still not good: some axons are not predicted.
Maybe the noise has a big influence. And the proposed region isn’t enough.  Maybe DICE loss function influence the False positive region.

Try only BCE

```
CUDA_VISIBLE_DEVICES=0 python3 -u bin/train.py -t data/train_set/marco/ -dn marco_1435_em -ln marco_1435_mask -o outputs/nmj0805segmentmarcodataBCE -lr 0.001 --volume-total 400000 --volume-save 4000 -mi 4,256,256 -g 1 -c 4 -b 1 -lt 1 -ac 2

CUDA_VISIBLE_DEVICES=0 python3 -u bin/test.py -t data/mask1/ -dn mask1_em_mip4.h5 -o outputs/mask1output8.07mip4 -mi 4,256,256 -g 1 -m outputs/nmj0805segmentmarcodataBCE/volume_160000.pth -c 2 -b 1 -ac 2

#8.7 retrain
CUDA_VISIBLE_DEVICES=0 python3 -u bin/train.py -t data/train_set/marco/ -dn marco_1435_em -ln marco_1435_mask -o outputs/nmj0807segmentmarcodataretrain -lr 0.001 --volume-total 400000 --volume-save 4000 -mi 4,256,256 -g 1 -c 4 -b 1 -lt 4 -ac 2 -ft True -pm outputs/nmj0805segmentmarcodataBCE/volume_160000.pth
```

Results still not good
![Markdown](http://i4.fuimg.com/640680/81ada9efd84b2bb8.png)



#### 8.11 new try
Previous computing resource isn’t enough. Only have one gpu on the machine. I use RC cluster to do the computing. It has many gpus to use. Setting some environment and softwares to computing.

```
srun --pty -p cox -t 7-00:00 --mem 100000 -n 8 --gres=gpu:4 /bin/bash
srun --pty -p cox -t 7-00:00 --mem 200000 -n 2 --gres=gpu:1 /bin/bash

#control D exit
#squeue/sacct check job
```

```
#!/bin/bash
# add all other SBATCH directives here...

#SBATCH -p cox
#SBATCH --gres=gpu:4
#SBATCH --constraint=titanx
#SBATCH -n 8 # Number of cores
#SBATCH -N 1 # Ensure that all cores are on one machine
#SBATCH --mem=100000
#SBATCH -t 5-00:00:00
#SBATCH -o logs/train_%j.log

module load cuda

CUDA_VISIBLE_DEVICES=0,1,2,3 python3 -u bin/train.py -t data/train_set/marco/ -dn marco_1435_em -ln marco_1435_mask -o outputs/nmj08011segmentmarcodataretrain -lr 0.001 --volume-total 400000 --volume-save 4000 -mi 4,256,256 -g 4 -c 8 -b 4 -lt 4 -ac 2 -ft True -pm outputs/nmj0811membranemarcodata/volume_12000.pth
# end of program
exit 0;
```

Working dir on rc
/n/coxfs01/xupeng/projects/membrane
Scp -r hp003 to rc
Install anaconda2 and 3
Install pytorch(0.4.0)  keras and tensorflow
tensorboardX 1.2 torchvision0.2


```
pip install keras
pip install tensorflow-gpu
conda install pytorch torchvision -c pytorch
```


train with 4 gpus
```
CUDA_VISIBLE_DEVICES=0,1,2,3 python3 -u bin/train.py -t data/train_set/marco/ -dn marco_1435_em -ln marco_1435_mask -o outputs/nmj0811membranemarcodata -lr 0.001 --volume-total 400000 --volume-save 4000 -mi 12,256,256 -g 4 -c 8 -b 4 -lt 4 -ac 2

#retrain
CUDA_VISIBLE_DEVICES=0,1,2,3 python3 -u bin/train.py -t data/train_set/marco/ -dn marco_1435_em -ln marco_1435_mask -o outputs/nmj08012segmentmarcodataretrain -lr 0.001 --volume-total 400000 --volume-save 4000 -mi 4,256,256 -g 4 -c 8 -b 4 -lt 4 -ac 2 -ft True -pm outputs/nmj0811membranemarcodata/volume_12000.pth
```

**Thoughts about the not perfect results:**
- Maybe 3D U-net model is too large to train, intensity has influence. 
- The pattern difference is large, we may use the similar one with larger weights. 
- We may need some more design to predict many separate regions and consider the continuity. Consider higher resolution.


#### 2D D-Linknet
I started to build a new deep learning model. I use 2D U-net instead of 3D to train is easier. It is different with U-net, but also effective in predicting segments.

![Markdown](http://i4.fuimg.com/640680/87378f2e7ea1db4c.png)


D-LinkNet uses Linknet with pretrained encoder as its backbone and has additional dilated convolution layers in the center part. Linknet is an efficient semantic segmentation
neural network which takes the advantages of skip connections, residual blocks and encoder-decoder architecture. The original Linknet uses ResNet18 as its encoder, which is a pretty light but outperforming network. Linknet has shown high precision on several benchmarks, and it runs pretty fast.

I also use dilation CNN, Dilated convolution is a useful kernel to adjust receptive
fields of feature points without decreasing the resolution of feature maps. It was widely used recently.

I set the image input shape as 1024*1024, so I reprocess Marco data, export Mip level 0. Change the export ROI for better ROI and more precise resolution. Change the channels for resnet.



I will keep on modifying the model and build up the whole training pipeline including several efficient data augmentation methods. And then do test on the mask data.





****


# Last three weeks
Week 7,8,9 (10)


- mip 0， train on old model
Process the mip 0 data
[Jupyter Notebook](http://140.247.107.75:10000/notebooks/projects/membrane/jupyter/extract_membrane_from_marco_mip0.ipynb)
- mip 0, multi task
- mip 0, 2D D-linknet
This is three and one channel, for 2D Linknet

```
data/train_set/marco/maskfor2Dlinknet.h5
data/train_set/marco/emfor2Dlinknet.h5
```
	
- prepare dataloader 512 512, random slice to get data, augmentation, weight, test dense segment
- change channel to 3 and 1 after dataloader’s original process !  

`np.stack((imgs,)*3, 1)`

Solve dataloader problem
Test to use synapse data loader, it has random slice, but we need  dimension right and batch more than one

```
CUDA_VISIBLE_DEVICES=0 python3 -u bin/train.py -t data/train_set/marco/ -dn marco_1435_em -ln marco_1435_mask -o outputs/testdimension -lr 0.001 --volume-total 400000 --volume-save 4000 -mi 2,512,512 -g 1 -c 1 -b 1 -lt 4 -ac 2
```

- 512*512
- normalization
- augmentation
- test dense

Train use mip0
1434,1112, 1734
This is one channel, for 3D unet, too large to train, use half? Last 800

```
data/train_set/marco/coloredmaskmip0whole.h5
data/train_set/marco/emmip0whole.h5
```


```
CUDA_VISIBLE_DEVICES=0,1,2,3 python3 -u bin/train.py -t data/train_set/marco/ -dn emmip0whole_half.h5 -ln coloredmaskmip0whole_half.h5 -o outputs/nmj0813marcodatamip0 -lr 0.001 --volume-total 400000 --volume-save 4000 -mi 4,256,256 -g 4 -c 4 -b 4 -lt 4 -ac 2
```

On hp003 not work, memory error maybe should cut to quarter

```
CUDA_VISIBLE_DEVICES=0 python3 -u bin/train.py -t data/train_set/marco/ -dn emmip0whole_quarter.h5 -ln coloredmaskmip0whole_quarter.h5 -o outputs/nmj0814marcodatamip0 -lr 0.001 --volume-total 400000 --volume-save 1000 -mi 4,256,256 -g 1 -c 4 -b 1 -lt 4 -ac 2
```
Locally smoothed networks 
Smooth backgroud

talk about NMJ
Daniel and Jeff
Axon caliber:
- calculate volume and distance
- or reslice it and find the minimum diameter!
Terminal:
Reslice it and paint the terminal!

```
#8.14  test 4 gpus result
CUDA_VISIBLE_DEVICES=0,1,2,3 python3 -u bin/test.py -t data/mask1/ -dn mask1_em_mip4.h5 -o outputs/nmj08014segmentmarcodataretrainmip4 -mi 4,256,256 -g 4 -m outputs/nmj08012segmentmarcodataretrain/volume_400000.pth -c 4 -b 4 -ac 2
```
not good enough, almost sure it is about resolution
![Markdown](http://i2.tiimg.com/640680/89d953939c17fce1.png)

**sbatch_mip0_3D.sh**

```
CUDA_VISIBLE_DEVICES=0,1,2,3 python3 -u bin/train.py -t data/train_set/marco/ -dn emmip0whole_half.h5 -ln coloredmaskmip0whole_half.h5 -o outputs/nmj0814marcodatamip0_half -lr 0.001 --volume-total 400000 --volume-save 1000 -mi 4,256,256 -g 4 -c 4 -b 4 -lt 4 -ac 2
```

```
CUDA_VISIBLE_DEVICES=0,1,2,3 python3 -u bin/train.py -t data/train_set/marco/ -dn emmip0whole.h5 -ln coloredmaskmip0whole.h5 -o outputs/nmj0814marcodatamip0 -lr 0.001 --volume-total 400000 --volume-save 1000 -mi 4,256,256 -g 4 -c 4 -b 4 -lt 4 -ac 2
```


- outputs/nmj0814marcodatamip0
- outputs/nmj0814marcodatamip0_half

```
CUDA_VISIBLE_DEVICES=0,1,2,3 python3 -u bin/test.py -t data/mask1/ -dn mask1_em_mip0_0_50.h5 -o outputs/nmj0815marcodatamip0_half -mi 4,256,256 -g 4 -m outputs/nmj0814marcodatamip0_half/volume_86000.pth -c 4 -b 4 -ac 2
```
logs/3D_mip0_hald_test.err

```
CUDA_VISIBLE_DEVICES=0 python3 -u bin/test.py -t data/mask1/ -dn mask1_em_mip0_0_50.h5 -o outputs/nmj0815marcodatamip0 -mi 4,256,256 -g 1 -m outputs/nmj0814marcodatamip0/volume_99000.pth -c 1 -b 1 -ac 2
```
3D_mip0_whole_test.err

Conclusion:

**we should use 2D since the shift is too big to infer 3D information**


Finally the segmentation part of automatic tracing pipeline works:

### Automatic Tracing in Bundle
![Markdown](http://i2.tiimg.com/640680/584c64fdaf11c64e.png)

This work is inspired from yaron and marco’s great work on automatically prediction membrane on bundle. And we are thinking, if we only care about tracing, maybe we can automatically trace the axon with little manual label. Since the bundle data is sparse and the shift of the z section is big, we may use a simpler yet more robust way to automaticaly trace.
So at first we will prepare the data, use some methods to generate more, and we will do segment prediction to get a segment and post process it, then use matching algorithm to trace each axon.

#### Data  preparation
- Extract axon segment (from Marco’s data)
![Markdown](http://i2.tiimg.com/640680/9d013476a19d3dd8.png) 
![Markdown](http://i2.tiimg.com/640680/3c2d8c2fe9cab2e7.png)

- Convert all segments to same color
	- Training:	1200
	- Validation: 200
![Markdown](http://i2.tiimg.com/640680/9e61c84bcda13810.png)

At first we use KK and marco’s data as training and validation sample. We convert the segment to same color as binary mask

#### Data Augmentation
### Training:
- Simple augmentation: 
	- flip of x, y, (z); 
	- 90 degree rotation.
![Markdown](http://i2.tiimg.com/640680/688954a7b2f85b05.png)

- Intensity augmentation.
![Markdown](http://i2.tiimg.com/640680/d7f84ed10dc6977f.png)

- Elastic augmentation
![Markdown](http://i1.fuimg.com/640680/3e78d3e458b063b3.png)

#####  Test:
Simple augmentation(16 combination)

Several augmentation methods are applied here to generate more training data, we have simple augmentation, intensity and elastic augmentation. For test part, we do all kinds of simple augmentation to get the average result
Although the augmentation May not have the strong biological meaning, but it is always useful to optimize the model better.

#### Prediction Model
We have discussed a lot about the prediction model, after a long time’s try, the 2D Dlinknet (adjustmen of U-net) finally works.

3D U-net with res block  (not very good)
2D D-LinkNet: encoder-decoder, res block, dilation.
![Markdown](http://i2.tiimg.com/640680/70f0977b0a1fdfa5.png)


- Loss: 
BCE+DICE loss(It seems remove DICE may have better result)
![Markdown](http://i2.tiimg.com/640680/3b59f2842eaf0b18.png)

![Markdown](http://i2.tiimg.com/640680/713830f2720ff701.png)

Now we use a deep learning model to predict segmentation. I tried 3D U-net and 2D Link net to predict segment. It seems the 2D model is easier to train, for it has less parameters to tune and our data may have a big shift cross z-section. The model is similar to U-net, and the loss function we use is the combination of DICE loss and focal loss, which depict the overlap and difference of ground truth and prediction. The loss function decreases as training goes on.

which adopts encoderdecoder structure, dilated convolution and pretrained encoder, D-LinkNet architecture. Each blue rectangular block represents a multi-channel features map. Part A is the encoder of D-LinkNet. D-LinkNet uses ResNet34 as encoder. Part C is the decoder of D-LinkNet, it is set the same as LinkNet decoder. Original LinkNet only has Part A and Part C. D-LinkNet has an additional Part B which can enlarge the receptive field and as well as preserve the detailed spatial information. Each convolution layer is followed by a ReLU activation except the last convolution layer which use sigmoid activation.

reduces the relative loss for well-classified examples (pt > .5), putting more focus on hard, misclassified examples. (we propose to reshape the loss function to down-weight easy examples and thus focus training on hard negatives. More formally, we propose to add a modulating factor (1 − pt) γ to the cross entropy loss, with tunable focusing parameter γ ≥ 0. We define the focal loss as)

#### Prediction Result
### Post processing:
- Bilateral filter
- Erosion
- Dilation

![Markdown](http://i2.tiimg.com/640680/3ccf827be716fafb.png)

I did some post processing work on prediction, using bilateral filter to remove some noise, Bilateral filter is better than gaussian filter. and use erosion and dilation to remove the potential merge of different connected region, since it is important to get sparse segment for next matching step, the dilation will make the segment smaller than the ground truth.
I evaluate it on validation set and the dice coefficient is acceptable since most of the region overlaps well.
Evaluation on Validation set


![Markdown](http://i2.tiimg.com/640680/e24603eb94d53f89.png)

![Markdown](http://i2.tiimg.com/640680/840d29a47250f731.png)


# NMJ labeling work
Thanks to siyan and adi’s great work to align the image better, we can track and segment axons and terminals more easily. But the image quality isn’t good enough to apply automatic segmentation algorithm since it has many crack, noised and blur region. Now we have two magnitude more NMJs than six years ago,  our first ambition is to segment 13 NMJs to gain some 
So after 1 month’s manual label we finally get the reconstruction result of 13 NMJs with 7 axons innervating them

It took us a month to reconstruct 13 NMJs, and there maybe 250 NMJs in total. So if we manually segment all NMJs, it will be at least two years effort. Which is too long to endure.
![Markdown](http://i2.tiimg.com/640680/1b3e88542e0b6375.png)

![Markdown](http://i2.tiimg.com/640680/659916b155960e05.png)

![Markdown](http://i2.tiimg.com/640680/b064a79497b7cf37.png)

![Markdown](http://i2.tiimg.com/640680/c5b7f35d11a3cc82.png)

![Markdown](http://i2.tiimg.com/640680/749f5a6947ca871b.png)

![Markdown](http://i2.tiimg.com/640680/0cc8c91faa68fc5c.png)

![Markdown](http://i2.tiimg.com/640680/845ff7279a00f5f0.png)

![Markdown](http://i2.tiimg.com/640680/7b9b3d2b77f9f277.png)

We would like to take advantage of what we have done here to do the work more quickily elsewhere. For example, since we really care about how much territory each axon has in each neural muscular junction. Does the incoming axon provides us any hints about that, that is to say, if we look at something like diameter of the incoming axon, can we get the information of  territory each axon has in NMJ. 

For example, if the caliber of the axon and the contact area is propotional, we don’t need to reconstruct all of the junctions. That’s why we want to test if there is a correlation between diameter and contact area. So we need to quantify two things, one is axonal diameter, for each axon innervating each muscle fiber, to be more accurate, I extract 5 points to calculate diamter. and another one is the contact area.


Quantification of **axonal diameter**
- 5 points for each axon coming in each muscle fiber
Quantification of the **contact area**
- Contact area of each axon innervating each muscle fiber


Firstly, for each axon, I calculate all the contact area it has with 13 muscle fibers and you can see different axons have different occupancy. The two largest have approximately 17 percent and the smallest one has less than nine percent

![Markdown](http://i2.tiimg.com/640680/f06f7b963b5b305c.png)


Since  I have collected data for each axon coming into each muscle fiber, we can also have a look at them individually

![Markdown](http://i2.tiimg.com/640680/59ecac8427b3a117.png)


This heatmap illustrate the diameter of each axon coming into each muscle fiber. And the white block means this axon has no contact with this muscle fiber, so I didn’t calculate it’s diameter

![Markdown](http://i2.tiimg.com/640680/43d03374f4d2abd3.png)


This heatmap illustrate the contact area of each axon coming into each muscle fiber. And the white block means this axon has no contact with this muscle fiber, so I didn’t calculate it’s contact area

We can already have a sense that these two statistics may have some correlations by comparing these two heatmaps, by looking at these two plots together, I will gave you a scatter plot to see these correlation, although it is not perfect, but you will see a definite correlation between axonal diameter and contact area.

### Correlation Test Result
![Markdown](http://i2.tiimg.com/640680/3e61fe8864bdff61.png)

Pearson correlation coefficient:
$$\rho_{X,Y} = \frac{cov(X,Y)}{\sigma_X \sigma_Y}$$ 
0.731 (p = 6.44×10^−12 )

Spearman correlation coefficient:  
$$r_s = \rho_{rg_{X},rg_{Y}} = \frac{cov(g_{X},rg_{Y})}{\sigma_{rg_{X}} \sigma_{rg_{Y}} }$$
0.762 (p = 4.36*× 10^−12 )

Now we plot a scatter plot of all data points we collect, which are 7 axons coming into 13 muscle fibers, with some of them don’t have contact, there are more than seventy points. The x axis is axonal diameter and the y axis is contact area.  The units are microns and square microns. We have a regression line which fits the data well. Although it is not perfect. The shadow area is the confidence region of the regression.

By looking at this plot we have a sense that the axonal diameter and contact area should have a relatively linear correlation. We also use two metrics to quantify the correlation.
So one is pearson correlation coefficient, it is the covariance of two dataset divided by the individual standard deviation of two datasets. The range of this value is -1 to 1, the positive value means there is a positive correlation and the higher value means stronger correlation.
Now the pcc is 0.709 which indicates the correlation is good. 
We also use another improved version of PCC to quantify the relative ranking correlation of the data. Which means we only focus on the relative value instead of the absolute value. It is Spearman correlation coefficient, and the result is a little higher. The good correlation means  if you get a bigger axonal diameter, it may have a relatively bigger contact area.

Apart from testing on all data together, we also test on each axon and each muscle fiber

#### For each muscle
![Markdown](http://i2.tiimg.com/640680/c8017110826d1fd5.png)

![Markdown](http://i2.tiimg.com/640680/1ecfd3d4046d2dda.png)

![Markdown](http://i2.tiimg.com/640680/a059b010a2dd1e39.png)

#### For each axon


![Markdown](http://i2.tiimg.com/640680/ee09bea1b5c618d4.png)

![Markdown](http://i2.tiimg.com/640680/5b0f66cfd920ac58.png)


