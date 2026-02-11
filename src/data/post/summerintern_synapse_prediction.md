---
title: Synapse Prediction Project
publishDate: 2018-07-14T22:50:06Z
excerpt: "- SummerIntern/synapticpartner at master · james20141606/SummerIntern · GitHub - Synapse polarity"
author: "James Chen"
tags: ["project", "neural science", "summer intern", "connectomics", "computational neural science", "deep learning", "computer vision", "Jeff Lichtman"]
category: "projects"
draft: false
---

OUR PAPER WAS PUBLISHED on [ECCV 2020](https://vcg.seas.harvard.edu/publications/two-stream-active-query-suggestion-for-active-learning-in-connectomics/paper)

It is part of my computational task during my summer intern in [Lichtman Lab](https://lichtmanlab.fas.harvard.edu/) and [Hanspiter Lab](https://vcg.seas.harvard.edu/people).

It is part of the big synapse project. Also the challenge 2 of [CREMI](https://cremi.org)

We now rank **No.1** in the [CREMI contest](https://cremi.org). And we will submit a paper to CVPR this November.

For **whole work summary** please [see here](https://www.cmwonderland.com/2018/09/12/100_summer_intern/)

<iframe src="https://drive.google.com/file/d/1XyEPj9r7p8VNk5nLlLIPNhZjuDHu2KTY/preview" width="100%" height="600px"></iframe>

Also I finished another NMJ project during summer intern in [Lichtman Lab](https://lichtmanlab.fas.harvard.edu/) 

# Codes 

- [Summer_Intern/synaptic_partner at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/tree/master/synapse_prediction)
- [Synapse polarity](https://github.com/james20141606/EM-network)


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

## summarize and rewrite some data augmentation repo
The three main repos are gunpowder from funke lab, EM-data, EM-seglib from Sebastian lab.

Gunpowder is quite complicated since it includes a whole pipeline of data preprocessing. It defines some batch provider and batch filter at first, making it harder to understand the data augmentation steps in the middle. Since it is written in python2 and designed for caffe, I rewrite and summarize, compare the gunpowder’s four augmentation methods with Sebastian’s codes.

Funke said in his paper about CREMI challenge 2 that data augmentation is the most important steps in the whole pipeline. I rewrite the four kinds of data augmentation methods combining Funkey and Sebastian’s codes.
[gunpowder](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/jupyter/gunpowder.ipynb)
[gunpowder on cremi](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/jupyter/gunpowder_cremi.ipynb)

- simple augmentation
- intensity augment
- ElasticAugment
- DefectAugment


## simple augmentation
class gunpowder.SimpleAugment(mirror_only=None, transpose_only=None)
Randomly mirror and transpose all Arrays and Points in a batch.

simple augment can be achieved by EM-segLib/em_segLib/transform.py!
in this repo, only transpose_only_xy=True is used!

## intensity augment
class gunpowder.IntensityAugment(array, scale_min, scale_max, shift_min, shift_max, z_section_wise=False)
Randomly scale and shift the values of an intensity array.
- array (ArrayKey) – The intensity array to modify.
- scale_min (float) –
- scale_max (float) –
- shift_min (float) –
- shift_max (float) –
The min and max of the uniformly randomly drawn scaling and shifting values for the intensity augmentation. Intensities are changed as:


```
a = a.mean() + (a-a.mean())*scale + shift
```
- z_section_wise (bool) – Perform the augmentation z-section wise. Requires 3D arrays and assumes that z is the first dimension.

### Randomly scale and shift the values of an intensity array，
- can do z axis sections augmentation，first dim should be z
- normalized array desired
- set scale and shift’s biggest and smallest value


```
np.random.uniform(low=self.shift_min, high=self.shift_max))
```
Return scale and shift value
- for each array: a.mean() + (a-a.mean())*scale + shift
- np.clip(0,1)

### similar implementation!
- scale is similar to DataProvider/python/data_augmentation.py class GreyAugment(DataAugment)!
- DataProvider/python/data_augmentation.py class GreyAugment(DataAugment)**may be better**：


```
img *= 1 + (np.random.rand() - 0.5)*self.CONTRAST_FACTOR
img += (np.random.rand() - 0.5)*self.BRIGHTNESS_FACTOR
img = np.clip(img, 0, 1)
img **= 2.0**(np.random.rand()*2 - 1)
```
- it borrows from (http://elektronn.org/).ELEKTRONN is used for 2D/3D large scale image. Also used for segmentation


##  ElasticAugment

The author used ElasticAugment([4,40,40], [0,2,2], [0,math.pi/2.0], prob_slip=0.05,prob_shift=0.05,max_misalign=25)


```
class gunpowder.ElasticAugment(control_point_spacing, jitter_sigma, rotation_interval, prob_slip=0, prob_shift=0, max_misalign=0, subsample=1)
```
- reshape array data into (channels,) + spatial dims
- first  **create_identity_transformation**
    - create_identity_transformation from funkey another repo augment，create_identity_transformation, channel change to three , use np.meshgrid increase two channels
- if sum(jitter_sigma) > 0: **create_elastic_transformation**
- 
```
augment.create_elastic_transformation(
                    target_shape,
                    self.control_point_spacing,
                    self.jitter_sigma,
                    subsample=self.subsample)
```
- first get control_point_offsets，the interpolation to upscale，generate 3 channel images
- then by rotation_interval [0,math.pi/2.0], rotation_start = rotation_interval[0], rotation_max_amount = rotation_interval[1] - rotation_interval[0]

    rotation = random.random()*self.rotation_max_amount + self.rotation_start(less than 90)
    
If rotation>0,do **create_rotation_transformation**
    


- then if prob_slip + prob_shift > 0，做**__misalign(transformation)**
    
According to thres to do randomly shift by section

- at last if subsample >1 before elastic augmentation do subsampling to speed up elasticaugment after augmentation then do upscale

    Instead of creating an elastic transformation on the full
    resolution, create one subsampled by the given factor, and linearly
    interpolate to obtain the full resolution transformation. This can
    significantly speed up this node, at the expense of having visible
    piecewise linear deformations for large factors. Usually, a factor
    of 4 can savely by used without noticable changes. However, the
    default is 1 (i.e., no subsampling).

##  DefectAugment
class gunpowder.DefectAugment(intensities, prob_missing=0.05, prob_low_contrast=0.05, prob_artifact=0.0, prob_deform=0.0, contrast_scale=0.1, artifact_source=None, artifacts=None, artifacts_mask=None, deformation_strength=20, axis=0)[source]

Augment intensity arrays section-wise with artifacts like missing sections, low-contrast sections, by blending in artifacts drawn from a separate source, or by deforming a section.

- intensities (ArrayKey) – The key of the array of intensities to modify.
- prob_missing (float) –
- prob_low_contrast (float) –
- prob_artifact (float) –
- prob_deform (float) – Probabilities of having a missing section, low-contrast section, an artifact (see param artifact_source) or a deformed slice. The sum should not exceed 1. Values in missing sections will be set to 0.
contrast_scale (float, optional) – By how much to scale the intensities for a low-contrast section, used if prob_low_contrast > 0.
- (class (artifact_source) – BatchProvider, optional):A gunpowder batch provider that delivers intensities (via ArrayKey artifacts) and an alpha mask (via ArrayKey artifacts_mask), used if prob_artifact > 0.

- artifacts (ArrayKey, optional) – The key to query artifact_source for to get the intensities of the artifacts.
- artifacts_mask (ArrayKey, optional) – The key to query artifact_source for to get the alpha mask of the artifacts to blend them with intensities.
- deformation_strength (int, optional) – Strength of the slice deformation in voxels, used if prob_deform > 0. The deformation models a fold by shifting the section contents towards a randomly oriented line in the section. The line itself will be drawn with a value of 0.
- axis (int, optional) – Along which axis sections are cut.


From a special artifect source read data and defectaugment

```
artifact_source = (
        Hdf5Source(
            'sample_ABC_padded_20160501.defects.hdf',
            datasets = {
                ArrayKeys.RAW: 'defect_sections/raw',
                ArrayKeys.ALPHA_MASK: 'defect_sections/mask',
            }
        ) +
        RandomLocation(min_masked=0.05, mask_array_key=ArrayKeys.ALPHA_MASK) +
        Normalize() +
        IntensityAugment(0.9, 1.1, -0.1, 0.1, z_section_wise=True) +
        ElasticAugment([4,40,40], [0,2,2], [0,math.pi/2.0]) +
        SimpleAugment(transpose_only_xy=True)
    )
```
- threshold：
```
DefectAugment(
            prob_missing=0.03,
            prob_low_contrast=0.01,
            prob_artifact=0.03,
            artifact_source=artifact_source,
            contrast_scale=0.1)
```
- get missing，low_contrast, artifact, deform value    prob_missing_threshold = self.prob_missing   (0.03=0.03)
    prob_low_contrast_threshold = prob_missing_threshold + self.prob_low_contrast  (0.04=0.03+0.01)
    prob_artifact_threshold = prob_low_contrast_threshold + self.prob_artifact    (0.07=0.03+0.04)
    prob_deform_slice = prob_artifact_threshold + self.prob_deform   (0.07=0.07+0)
- for each slice，generate 0-1 random value r，if：
    - r < prob_missing_threshold:  'zero_out'
        - do nothing
    - elif r < prob_low_contrast_threshold:  'lower_contrast'
        - mean = section.mean(), section -= mean, section *= self.contrast_scale, section += mean
    - elif r < prob_artifact_threshold:'artifact'
        - raw.data[section_selector] = section*(1.0 - artifact_alpha) + artifact_raw*artifact_alpha
        - artifact_alpha, artifact_raw from artifact_source’s mask and raw， equals to a **Alpha Blending**
    - elif r < prob_deform_slice: 'deformed_slice' if deformed slice, needs bigger upstream roi for deformed slice

```
        section = raw.data[section_selector].squeeze()
        interpolation = 3 if self.spec[self.intensities].interpolatable else 0
        flow_x, flow_y, line_mask = self.deform_slice_transformations[c]
        shape = section.shape
        #做双线性插值
        section = map_coordinates(
            section, (flow_y, flow_x), mode='constant', order=interpolation
        ).reshape(shape)
        section = np.clip(section, 0., 1.)
        section[line_mask] = 0
        raw.data[section_selector] = section
```


**cremi exapmle**
[gunpowder/examples/cremi at master · funkey/gunpowder · GitHub](https://github.com/funkey/gunpowder/tree/master/examples/cremi)


docker has problems (MALIS, pycaffe)
Install docker on server [Get Docker CE for Ubuntu | Docker Documentation](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-from-a-package)

```
docker pull funkey/gunpowder

sudo docker images
sudo docker run -i -t --name=chen ubuntu:latest
exit  
docker start id / name
docker attach id /name
```
Encounter problems with installing nvidia docker and docker run.

Seems we should try to rewrite some codes to incorporate directly without the bothering of docker, python2, caffe, malis and other settings.


### resources
[GitHub - donglaiw/EM-data: dataset loader](https://github.com/donglaiw/em-data)
[DataProvider/python/dataprovider at refactoring · torms3/DataProvider · GitHub](https://github.com/torms3/DataProvider/tree/refactoring/python/dataprovider)
[1706.00120 Superhuman Accuracy on the SNEMI3D Connectomics Challenge](https://arxiv.org/abs/1706.00120) Sebastian group


Then I incorporate the data augmentation methods into synapse prediction model for further use.
[augmentation on cremi](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/jupyter/augment_cremi.ipynb)

### Model test and redesign
I tried zudi’s synapse prediction model using 3D U-net, since it is based on pytorch, I spent some time to read the pytorch documentation. We have discussed about the model improvement issue and I have tried to use other architecture for better prediction results.
[synapse prediction model](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/jupyter/pytorch_synapse.ipynb)
[improvement on U net](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/jupyter/syn_pytorch_add_dink.ipynb)

I can try a lot fine tune and redesign about U-net and 3D U-net, maybe from kaggle top solutions and github. 




*******
# Week 3
In week 3, apart from NMJ project, I concentrate mainly on synapse prediction project and make many progress. Since zudi has come back, it is more efficient to discuss and collaborate, we have done a lot this week.

## short term plan
Our short term plan is adding all the new tricks (dilation CNN block from Deepglobe’s Dlink-net, DICE_BCE combined loss, all the data augmentation methods) to the model. We train the whole model for three days on all A, B, C samples. And fine tune it later for one day. Then we submit the result to see if it is better.

In my consideration, the previous model **has a not very little gap with the state-of-art one**. About one fold error score. So it is a lot for us to do. **I have used dilation CNN, combined Loss, and some very useful data augmentation methods** which take me many days to accomplish(All admit that proper augmentation is one of the most import procedure to achieve better results.) So this week I have read many other people’s good paper, project summary and codes in similar tasks( **the dilation CNN, DICE_BCE loss and data augmentation all originate from this.**) I believe there are more to implement. The state-of-art model and pipeline looks really good, so I think I should use more strategy to improve our results.

## Model improvement and training
### settings and training
 Since I have done several deep learning and machine learning projects(Emaize, CardiacAI, 3D CT images, Deepshape), I am quite familiar with linux, python deep learning environment and all extra settings( jupyter, TensorboardX etc). I can be quite efficient in running the previous model designed by zudi.

#### training settings
##### create envs
```
conda env create -f bin/synapse_pytorch/envs/py3_pytorch.yml
source activate py3_pytorch
source deactivate
alias act='source activate py3_pytorch'
alias deact='source deactivate'
virtualenv venv
```

##### training parameter setting

```
CUDA_VISIBLE_DEVICES=0,1 python3 -u bin/synapse_pytorch/train.py -t data/cremi/ -dn images/im_A_v2_200.h5@images/im_B_v2_200.h5@images/im_C_v2_200.h5 -ln gt-syn/syn_A_v2_200.h5@gt-syn/syn_B_v2_200.h5@gt-syn/syn_C_v2_200.h5 -o outputs/cremi0719mixloss -lr 0.001 --volume-total 400000 --volume-save 20000 -mi 24,256,256 -g 2 -c 6 -b 2 -l mix
#b:6  try to keep gpu and batch size same
```

##### Tensorboard monitor setting

it is a real time monitoring

```
#http://140.247.107.75:6006
#set locale to solve locale unsupported locale #setting problems
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
#tensorboard monitor dir at: synapse/runs/outputs
tensorboard --logdir cremi0719
```

```
#kill jupyter and release port
ps aux | grep -i notebook
```


### network visualization

I visualize our current model, it is a very big one.

```
import torch
from torch.autograd import Variable
from torchviz import make_dot
model = res_unet()
model = model.to(device)
x = Variable(torch.randn(1,1,24, 256,256))#change 12 to the channel number of network input
y = model(x)
g = make_dot(y)
g.view()
```

**Current model:**

![Markdown](http://i2.tiimg.com/640680/aac9181df1496b48.png)

Scripts: [Summer_Intern/pytorch_synapse.ipynb at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/jupyter/pytorch_synapse.ipynb)

### model structure and loss function improvement

I read D-LinkNet: LinkNet with Pretrained Encoder and Dilated Convolution for High Resolution Satellite Imagery Road Extraction and other winners in some challenges and implement more model structure and loss function design.


##### dilated CNN block
It can further enlarge the visual area of the model, which is helpful to learn more information efficiently. The dilation is adaptive according the the layer depth. The maximum is 8, we may change it smaller later.

##### loss function
I read Deepglobe challenge’s solution and change the loss function to **DICE + BCE** like this:
P: predict result, GT: ground truth, N: batch size

$$L = 1 - \frac{2 \times \sum_{i=1}^N  |P_i \cap GT_i  | }{\sum_{i=1}^N  (P_i + GT_i)} + \sum_{i=1}^N BCELoss(P_i,  GT_i)$$

It added a DICE part to previous BCE loss function, which is better since it is common to use DICE as loss function for U-net, the combined loss function is also used in some challenges winner.

loss function implementation: 
[Summer_Intern/loss.py at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/bin/loss.py)
[Summer_Intern/loss_dlink_net.ipynb at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/jupyter/loss_dlink_net.ipynb)

```
class dice_bce_loss(nn.Module):
    def __init__(self, batch=True):
        super(dice_bce_loss, self).__init__()
        self.batch = batch
        self.bce_loss = WeightedBCELoss()

    def soft_dice_coeff(self, input, target):
        smooth = 0.0  # may change
        if self.batch:
            i = torch.sum(target)
            j = torch.sum(input)
            intersection = torch.sum(target * input)
        else:
            i = target.sum(1).sum(1).sum(1)
            j = input.sum(1).sum(1).sum(1)
            intersection = (target * input).sum(1).sum(1).sum(1)
        score = (2. * intersection + smooth) / (i + j + smooth)
        #score = (intersection + smooth) / (i + j - intersection + smooth)#iou
        return score.mean()

    def soft_dice_loss(self, input, target):
        loss = 1 - self.soft_dice_coeff(input, target)
        return loss

    def __call__(self, input, target, weight):
        a = self.bce_loss(input, target, weight)
        b = self.soft_dice_loss(input, target)
        return a + b
```




I use TensorboardX to monitor the training procedure. I monitor the combined loss, DICE loss and BCE loss simultaneously. To my relief, the loss function decrease not only because BCE decrease, the DICE loss also decrease. Since 1- DICE reflect the overlap ratio of predicted and ground truth area, it means our model learns well.

**Train loss:**
![Markdown](http://i4.fuimg.com/640680/03763aade56aca61.png)
**BCE loss:**
![Markdown](http://i4.fuimg.com/640680/a3694f6e59e4a242.png)
**DICE loss:**
![Markdown](http://i4.fuimg.com/640680/163718480760fffd.png)


We should do further improvement on loss function, BCE is divided by batch size, so we may do the same with DICE.

We think BCE punishes FN since we set a weight to punish it. And we think DICE is punishing FP since the remained are mainly FP, and we think it is good: our strategy is remove FN at first, then we can prune FP using some methods. So DICE loss may become one of our methods.

**We can also balance the FP, FN by adjusting DICE and BCE’s weight. It is essential for us to decrease FP since it is the main gap between the state of art model. We retain so many FP in predicting.**



## Data augmentation
**I spent many time on this part because I believe it is the most important part besides the model, also this part may determine which pipeline is better between many good models.**

Last week we have discussed a lot about augmentation’s details. This week I rewrite several of them, and learned many different augmentation methods from many sources( mature pipeline, API, challenge winner and papers) I compare their results by rewrite their codes and visualize the results. Some of the codes  I read are hard to understand(like gunpowder) since it contain a whole pipeline’s complex manipulation. 

**I have applied several of them and implement them in training and testing pipeline.**

The codes for final use is: [Summer_Intern/augmentation.py at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/bin/augmentation.py)
And the implementation and visualization codes:
[Summer_Intern/cremi_augmentation_implementation.ipynb at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/jupyter/cremi_augmentation_implementation.ipynb)
[Summer_Intern/augment_cremi.ipynb at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/jupyter/augment_cremi.ipynb)


### training
I do transformation on image and mask at the same time. For simple augmentation it is simple, for elastic transformation, I use random seed to reproduce, and binarize mask data to 0, 1 again. For intensity augmentation  I don’t do any transformation on mask. For defect transformation, there are many to notice, including random seed to reproduce and binarize. 

I do many visualization to benchmark every augmentation


##### train

#### simple augmentation
Do X, Y, Z mirror and transpose, so in total there are 16 methods. Produce a list to generate four 0, 1 random int to decide do or not do these four methods. Do same transformation on image and mask.

Usage:  simpleaug_train_produce()
![Markdown](http://i1.fuimg.com/640680/b230e7beb1ffb4fd.png)


```
# produce 16 binary arr
binaryarr = np.zeros([16, 4]).astype('int')
for t in range(16):
    binaryarr[t] = np.concatenate((np.repeat(0, 4-len(bin(t)[2:])), np.array(
        [bin(t)[2:][i] for i in range(len(bin(t)[2:]))]).astype('int')))
def augmentsimple(data, rule):
    assert np.size(rule) == 4 and data.ndim == 3
    # z reflection.
    if rule[0]:
        data = data[::-1, :, :]
    # x reflection.
    if rule[1]:
        data = data[:, :, ::-1]
    # y reflection.
    if rule[2]:
        data = data[:, ::-1, :]
    # Transpose in xy.
    if rule[3]:
        data = data.transpose(0, 2, 1)
    return data
def produce_simple_16_sample(imgs, imgshape):
    '''
    imgs: 24*256*256 -> 16*24*256*256
    '''
    assert imgs.ndim == 3
    augmentsimplearr = np.ndarray(
        [16, imgshape[0], imgshape[1], imgshape[2]])
    for i in range(16):
        augmentsimplearr[i] = augmentsimple(imgs, binaryarr[i])
    return augmentsimplearr
def produce_simple_train_sample(imgs, rule):
    '''
    imgs: 24*256*256 -> 16*24*256*256
    '''
    assert imgs.ndim == 3
    return augmentsimple(imgs, rule)
```


#### intensity augmentation
Usage: IntensityAugment()

Use **mix** mode for random choose 2D or 3D intensity augmentation. I do not transform mask because there is only pixel shift. 

![Markdown](http://i1.fuimg.com/640680/8f09339677f17d82.png)

```
class IntensityAugment():
    def __init__(self,  mode='mix', skip_ratio=0.3, CONTRAST_FACTOR=0.3, BRIGHTNESS_FACTOR=0.3):
        """
        Initialize parameters.
        Args:
            mode: 2D, 3D, or mix
        """
        assert mode == '3D' or mode == '2D' or mode == 'mix'
        self.mode = mode
        self.ratio = skip_ratio
        self.CONTRAST_FACTOR = CONTRAST_FACTOR
        self.BRIGHTNESS_FACTOR = BRIGHTNESS_FACTOR
    def augment(self, imgs):
        skiprand = np.random.rand()
        if skiprand > self.ratio:
            if self.mode == 'mix':
                threshold = 1-(1-self.ratio)/2
                mode_ = '3D' if skiprand > threshold else '2D' 
            else:
                mode_ = self.mode
            if mode_ == '2D':
                imgs = self.augment2D(imgs)
            elif mode_ == '3D':
                imgs = self.augment3D(imgs)
            return imgs
        else:
            return imgs
    def augment2D(self, imgs):
        for z in range(imgs.shape[-3]):
            img = imgs[z, :, :]
            img *= 1 + (np.random.rand() - 0.5)*self.CONTRAST_FACTOR
            img += (np.random.rand() - 0.5)*self.BRIGHTNESS_FACTOR
            img = np.clip(img, 0, 1)
            img **= 2.0**(np.random.rand()*2 - 1)
            imgs[z, :, :] = img
        return imgs
    def augment3D(self, imgs):
        imgs *= 1 + (np.random.rand() - 0.5)*self.CONTRAST_FACTOR
        imgs += (np.random.rand() - 0.5)*self.BRIGHTNESS_FACTOR
        imgs = np.clip(imgs, 0, 1)
        imgs **= 2.0**(np.random.rand()*2 - 1)
        return imgs
```

#### elastic augmentation
Usage: apply_elastic_transform(img, mask)
I compare gunpowder and this [Elastic Transform for Data Augmentation | Kaggle](https://www.kaggle.com/bguberfain/elastic-transform-for-data-augmentation) one, after comparison, it seems gunpowder version elastic has more functions, if we do not use rotate, it is fine.
The output range of create_transformation is 0-width, we can normalize the results. And I use random seed to reproduce on images and masks

![Markdown](http://i1.fuimg.com/640680/b57e8e884c754591.png)

```
def create_identity_transformation(shape, subsample=1):
    dims = len(shape)
    subsample_shape = tuple(max(1, int(s/subsample)) for s in shape)
    step_width = tuple(float(shape[d]-1)/(subsample_shape[d]-1)
                       if subsample_shape[d] > 1 else 1 for d in range(dims))
    axis_ranges = (
        np.arange(subsample_shape[d], dtype=np.float32)*step_width[d]
        for d in range(dims)
    )
    return np.array(np.meshgrid(*axis_ranges, indexing='ij'), dtype=np.float32)

def upscale_transformation(transformation, output_shape, interpolate_order=1):
    input_shape = transformation.shape[1:]
    dims = len(output_shape)
    scale = tuple(float(s)/c for s, c in zip(output_shape, input_shape))
    scaled = np.zeros((dims,)+output_shape, dtype=np.float32)
    for d in range(dims):
        zoom(transformation[d], zoom=scale,
             output=scaled[d], order=interpolate_order)
    return scaled

def create_elastic_transformation(shape, control_point_spacing=100, jitter_sigma=10.0, subsample=1):
    dims = len(shape)
    subsample_shape = tuple(max(1, int(s/subsample)) for s in shape)
    try:
        spacing = tuple((d for d in control_point_spacing))
    except:
        spacing = (control_point_spacing,)*dims
    try:
        sigmas = [s for s in jitter_sigma]
    except:
        sigmas = [jitter_sigma]*dims
    control_points = tuple(
        max(1, int(round(float(shape[d])/spacing[d])))
        for d in range(len(shape))
    )
    control_point_offsets = np.zeros(
        (dims,) + control_points, dtype=np.float32)
    for d in range(dims):
        if sigmas[d] > 0:
            control_point_offsets[d] = np.random.normal(
                scale=sigmas[d], size=control_points)
    return upscale_transformation(control_point_offsets, subsample_shape, interpolate_order=3)


def rotate(point, angle):
    res = np.array(point)
    res[0] = math.sin(angle)*point[1] + math.cos(angle)*point[0]
    res[1] = -math.sin(angle)*point[0] + math.cos(angle)*point[1]
    return res

def create_rotation_transformation(shape, angle, subsample=1):
    dims = len(shape)
    subsample_shape = tuple(max(1, int(s/subsample)) for s in shape)
    control_points = (2,)*dims
    control_point_scaling_factor = tuple(float(s-1) for s in shape)
    center = np.array([0.5*(d-1) for d in shape])
    control_point_offsets = np.zeros(
        (dims,) + control_points, dtype=np.float32)
    for control_point in np.ndindex(control_points):

        point = np.array(control_point)*control_point_scaling_factor
        center_offset = np.array(
            [p-c for c, p in zip(center, point)], dtype=np.float32)
        rotated_offset = np.array(center_offset)
        rotated_offset[-2:] = rotate(center_offset[-2:], angle)
        displacement = rotated_offset - center_offset
        control_point_offsets[(slice(None),) + control_point] += displacement

    return upscale_transformation(control_point_offsets, subsample_shape)

def random_offset(max_misalign):
    return Coordinate((0,) + tuple(max_misalign - random.randint(0, 2*int(max_misalign)) for d in range(2)))

def misalign(transformation, prob_slip, prob_shift, max_misalign):
    num_sections = transformation[0].shape[0]
    print (num_sections)
    shifts = [Coordinate((0, 0, 0))]*num_sections
    for z in range(num_sections):
        r = random.random()
        if r <= prob_slip:
            shifts[z] = random_offset(max_misalign)
        elif r <= prob_slip + prob_shift:
            offset = random_offset(max_misalign)
            for zp in range(z, num_sections):
                shifts[zp] += offset
                #print ('shiftzp '+str(shifts[zp]))
    for z in range(num_sections):
        transformation[1][z, :, :] += shifts[z][1]
        transformation[2][z, :, :] += shifts[z][2]
    return transformation
class ElasticAugment():
    def __init__(
            self,
            control_point_spacing,
            jitter_sigma,
            rotation_interval,
            prob_slip=0,
            prob_shift=0,
            max_misalign=0,
            subsample=1):
        self.control_point_spacing = control_point_spacing
        self.jitter_sigma = jitter_sigma
        self.rotation_start = rotation_interval[0]
        self.rotation_max_amount = rotation_interval[1] - rotation_interval[0]
        self.prob_slip = prob_slip
        self.prob_shift = prob_shift
        self.max_misalign = max_misalign
        self.subsample = subsample
    def create_transformation(self, target_shape):
        transformation = create_identity_transformation(
            target_shape,
            subsample=self.subsample)
        if sum(self.jitter_sigma) > 0:
            transformation += create_elastic_transformation(
                target_shape,
                self.control_point_spacing,
                self.jitter_sigma,
                subsample=self.subsample)
        rotation = random.random()*self.rotation_max_amount + self.rotation_start
        if rotation != 0:
            transformation += create_rotation_transformation(
                target_shape,
                rotation,
                subsample=self.subsample)

        if self.subsample > 1:
            transformation = upscale_transformation(
                transformation,
                target_shape)

        if self.prob_slip + self.prob_shift > 0:
            misalign(transformation, self.prob_slip,
                     self.prob_shift, self.max_misalign)
        return transformation
def apply_transformation(image, transformation, interpolate=True, outside_value=0, output=None):

    # print("Applying transformation...")
    order = 1 if interpolate == True else 0
    output = image.dtype if output is None else output
    return map_coordinates(image, transformation, output=output, order=order, mode='constant', cval=outside_value)

def apply_elastic_transform(img, mask):
    assert img.shape[1] == img.shape[2]
    img *= img.shape[1]
    transform = ElasticAugment([4, 40, 40], [0, 2, 2], [0, 0], prob_slip=0.05,
                               prob_shift=0.05, max_misalign=25).create_transformation([img.shape[0], img.shape[1], img.shape[2]])
    img_transform = apply_transformation(img,
                                         transform,
                                         interpolate=False,
                                         outside_value=img.dtype.type(-1),
                                         output=np.zeros(img.shape, dtype=np.float32))
    seg_transform = apply_transformation(mask,
                                         transform,
                                         interpolate=False,
                                         outside_value=mask.dtype.type(-1),
                                         output=np.zeros(mask.shape, dtype=np.float32))(np.unique(seg_transform.ravel()),np.unique(transform.ravel()))
    seg_transform[seg_transform > 0] = 1
    seg_transform[seg_transform != 1] = 0
    return img_transform/img_transform.shape[1], seg_transform
```

#### defect augmentation
Usage: transformedimgs, transformedmasks = apply_deform(testdatraw/256.,testdatseg,0,20,0.08)

![Markdown](http://i1.fuimg.com/640680/3dfea030bf017168.png)

I use gunpowder’s defect, the block region used to be zero, but I change it to zero for better batch normalization results. I use random seed to reproduce images and masks. The block size and missing section’s ratio can change. 

```
def prepare_deform_slice(slice_shape, deformation_strength, iterations, randomseed):
    np.random.seed(randomseed)
    grow_by = 2 * deformation_strength
    shape = (slice_shape[0] + grow_by, slice_shape[1] + grow_by)
    fixed_x = np.random.random() < .5
    if fixed_x:
        x0, y0 = 0, np.random.randint(1, shape[1] - 2)
        x1, y1 = shape[0] - 1, np.random.randint(1, shape[1] - 2)
    else:
        x0, y0 = np.random.randint(1, shape[0] - 2), 0
        x1, y1 = np.random.randint(1, shape[0] - 2), shape[1] - 1
    line_mask = np.zeros(shape, dtype='bool')
    rr, cc = line(x0, y0, x1, y1)
    line_mask[rr, cc] = 1
    line_vector = np.array([x1 - x0, y1 - y0], dtype='float32')
    line_vector /= np.linalg.norm(line_vector)
    normal_vector = np.zeros_like(line_vector)
    normal_vector[0] = - line_vector[1]
    normal_vector[1] = line_vector[0]
    x, y = np.meshgrid(np.arange(shape[1]), np.arange(shape[0]))
    flow_x, flow_y = np.zeros(shape), np.zeros(shape)
    components, n_components = label(np.logical_not(line_mask).view('uint8'))
    assert n_components == 2, "%i" % n_components
    neg_val = components[0, 0] if fixed_x else components[-1, -1]
    pos_val = components[-1, -1] if fixed_x else components[0, 0]
    flow_x[components == pos_val] = deformation_strength * normal_vector[1]
    flow_y[components == pos_val] = deformation_strength * normal_vector[0]
    flow_x[components == neg_val] = - deformation_strength * normal_vector[1]
    flow_y[components == neg_val] = - deformation_strength * normal_vector[0]
    flow_x, flow_y = (x + flow_x).reshape(-1, 1), (y + flow_y).reshape(-1, 1)
    line_mask = binary_dilation(line_mask, iterations=iterations)  # default=10
    return flow_x, flow_y, line_mask

def deform_2d(image2d, deformation_strength, iterations, randomseed):
    flow_x, flow_y, line_mask = prepare_deform_slice(
        image2d.shape, deformation_strength, iterations, randomseed)
    section = image2d.squeeze()
    mean = section.mean()
    shape = section.shape
    #interpolation=3
    section = map_coordinates(section, (flow_y, flow_x), mode='constant', order=3).reshape(int(flow_x.shape[0]**0.5), int(flow_x.shape[0]**0.5))
    section = np.clip(section, 0., 1.)
    section[line_mask] = mean
    return section

def apply_deform(imgs, masks, deformation_strength=0, iterations=20, deform_ratio=0.08):
    transformedimgs, transformedmasks = {}, {}
    sectionsnum = imgs.shape[0]
    for i in range(sectionsnum):
        if random.random() <= deform_ratio:
            randomseed = np.random.randint(1000000)
            transformedimgs[i] = deform_2d(
                imgs[i], deformation_strength, iterations, randomseed)
            transformedmasks[i] = deform_2d(
                masks[i], deformation_strength, iterations, randomseed)
        else:
            transformedimgs[i] = imgs[i]
            transformedmasks[i] = masks[i]
    return transformedimgs, transformedmasks
```


### test
For each sample in test, I will produce 16 transformed images and reverse the predicted masks later.

Usage: simpleaug_test_produce()

Usage: simpleaug_test_reverse()

In test, it is common to only use 16 kinds **simple augmentation**

For X Y Z axis mirro and xy transpose, in all $2^4 = 16$ images produced.

```
class simpleaug_test_produce():
    def __init__(self, model_io_size=[24, 256, 256]):
        self.model_io_size = model_io_size

    def __call__(self, imgs):
        return produce_simple_16_sample(imgs, self.model_io_size)
class simpleaug_train_produce():
    def __init__(self, model_io_size=[24, 256, 256]):
        self.rule = np.random.randint(2, size=4)

    def __call__(self, imgs, mask):
        #print (self.rule)
        imgs_aug = produce_simple_train_sample(imgs, self.rule)
        mask_aug = produce_simple_train_sample(mask, self.rule)
        return imgs_aug, mask_aug
class simpleaug_test_reverse():
    def __init__(self, model_io_size=[24, 256, 256]):
        self.model_io_size = model_io_size

    def augmentsimplereverse(self,data, rule):
        assert np.size(rule) == 4 and data.ndim == 3
        # z reflection.
        if rule[3]:
            data = data.transpose(0, 2, 1)
        if rule[2]:
            data = data[:, ::-1, :]
        if rule[1]:
            data = data[:, :, ::-1]
        if rule[0]:
            data = data[::-1, :, :]
        return data

    def reverse_and_mean(self,imgs, imgshape):
        '''
        imgs: 16*24*256*256 ->24*256*256
        '''
        assert imgs.ndim == 4
        reversedsimplearr = np.ndarray(
            [16, imgshape[0], imgshape[1], imgshape[2]])
        for i in range(16):
            reversedsimplearr[i] = self.augmentsimplereverse(imgs[i], binaryarr[i])
        return np.mean(reversedsimplearr, axis=0)
    def __call__(self, imgs):
        return self.reverse_and_mean(imgs, self.model_io_size)
```


### further useful augmentation
I have found many other augmentations in many sources. Since our main aim now is to get a better result in a short time. I will see if the augmentation strategy is enough. If not, I will implement them later. If the augmentation is good enough, we can do more on task 3 later. Since the model is really hard to train and see the results(may take a week for the feedback), time is really precious, and we can’t test one method at one time.

I have tried some here [Summer_Intern/further_aug_imgaug.ipynb at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/jupyter/further_aug_imgaug.ipynb), but I will decide what to do first next week.

- 2018 annual datascience bowl top1: segment cells
https://www.leiphone.com/news/201804/qfus8zALhZLoA8Ai.html
There are many data augmentation methods:
https://github.com/selimsef/dsb2018_topcoders/blob/7a87c07e1fb8e090186a3914a1443469f5107962/albu/src/augmentations/transforms.py
It seems clear and they used an augmentation API imgaug
[imgaug](http://imgaug.readthedocs.io/en/latest/)
Apart from gunpowder’s method, there are a lot to use!
- random zoom, rotate, flip
- contrast and brightness
- heavy geometric transform:  Elastic Transform, Perspective Transform, Piecewise Affine transforms, Pincushion Distortion
- contrast limited adaptive histogram equalization (CLAHE) ，Sharpen，Emboss
- Gaussian noise
- Blur、Median Blur、Motion Blur
- HSV
- rearrange channel
- repeat of cell nuclear





## future work
### compare with other work and thoughs
- For randomly chosen sample, we use pixel ratio to determine if one sample is used to train, Funke use probability,  we can think which is better.
- Funke use regression whereas  we use binary classification, it is simple to change to regression, but we should compare our loss function and strategy at first. For example, Funke’s STED loss may not be good.
- Funke use auxiliary loss for better prune, but we have visualize the result and find the proposed synapse matchh the membrane well, so it may not be necessary. 


### future plan
As mentioned above, I believe there are more to implement. The state-of-art model and pipeline looks really good, so I think I should use more strategy to improve our results.

- read and consider V-net’s structure. V-Net: Fully Convolutional Neural Networks for Volumetric Medical Image Segmentation
[vnet.pytorch](http://mattmacy.io/vnet.pytorch/)
[GitHub - mattmacy/vnet.pytorch: A PyTorch implementation for V-Net: Fully Convolutional Neural Networks for Volumetric Medical Image Segmentation](https://github.com/mattmacy/vnet.pytorch)
[GitHub - mattmacy/torchbiomed: Datasets, Transforms and Utilities specific to Biomedical Imaging](https://github.com/mattmacy/torchbiomed)
- if submitted result has a big difference with Funke’s, I may try to reproduce their work.
- read task 3 complete codes apart from  [GitHub - paragt/EMSynConn: One algorithm to detect synaptic location AND connectivity, both dyadic and polyadic, in Electron Microscopy volume.](https://github.com/paragt/EMSynConn)
- how to fine tune, apart from learning rate adjustment, we should consider some prune work. For example, the paper **Stacked U-Nets with Multi-Output for Road Extraction**:
> postprocessing: Various post-processing techniques for road extraction have been proposed in the literature, e.g., centerline extraction using structured SVM or Markov random ﬁeld, handling noisy data using a special CNN, recovering lines by sampling junction-points, and bridging road gaps by heuristic search. Here we develope a novel post processing technique by linking broken roads through shortest path search with decreasing conﬁdence thresholds. More speciﬁcally, we ﬁrst convert the raster road prediction image to vector format so we can bridge gaps and trim spurious roads, then we render a raster image from road vectors and merge it with the original prediction because the challenge needs raster images for IoU calculation.
- examine results carefully to understand the difference between FP and TP, gain biological intuition from it for better model design. For example the  density of membrane and vesicle


*****

# Week 4
This week I mainly focus on synaptic partner prediction and NMJ pipeline, and wait for our current models’ result on CREMI synapse prediction challenge.

## Loss adjustment
Last week we add DICE loss and this week we change BCE loss to Focal loss. It is adaptive to better consider weights.

P: predict result, GT: ground truth, N: batch size

$$L = 1 - \frac{2 \times \sum_{i=1}^N  |P_i \cap GT_i  | }{\sum_{i=1}^N  (P_i + GT_i)} + \sum_{i=1}^N FocalLoss(P_i,  GT_i)$$


![Markdown](http://i4.fuimg.com/640680/52858efa5d322afa.png)

$$FocalLoss(pt) = -{(1 - p_t)}^\gamma log(p_t)$$

![Markdown](http://i4.fuimg.com/640680/58f54732f92776ef.png)


## Augmentation improvement
This week I add and improve two augmentation methods: deform and elastic augmetation.
[Summer_Intern/cremi_augmentation_implementation.ipynb at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/jupyter/cremi_augmentation_implementation.ipynb)

### deformation augmentation


Remove random seeds, do not add deformation on masks.
Write the function to avoid deformation on adjacent sections. We wish this can force the network pay attention to 3D characteristics of the image.

```
def prepare_deform_slice(slice_shape,deformation_strength,iterations):
    # grow slice shape by 2 x deformation strength
    grow_by = 2 * deformation_strength
    #print ('sliceshape: '+str(slice_shape[0])+' growby: '+str(grow_by)+ ' strength: '+str(deformation_strength))
    shape = (slice_shape[0] + grow_by, slice_shape[1] + grow_by)
    # randomly choose fixed x or fixed y with p = 1/2
    fixed_x = np.random.random() < .5
    if fixed_x:
        x0, y0 = 0, np.random.randint(1, shape[1] - 2)
        x1, y1 = shape[0] - 1, np.random.randint(1, shape[1] - 2)
    else:
        x0, y0 = np.random.randint(1, shape[0] - 2), 0
        x1, y1 = np.random.randint(1, shape[0] - 2), shape[1] - 1

    ## generate the mask of the line that should be blacked out
    #print (shape)
    line_mask = np.zeros(shape, dtype='bool')
    rr, cc = line(x0, y0, x1, y1)
    line_mask[rr, cc] = 1

    # generate vectorfield pointing towards the line to compress the image
    # first we get the unit vector representing the line
    line_vector = np.array([x1 - x0, y1 - y0], dtype='float32')
    line_vector /= np.linalg.norm(line_vector)
    # next, we generate the normal to the line
    normal_vector = np.zeros_like(line_vector)
    normal_vector[0] = - line_vector[1]
    normal_vector[1] = line_vector[0]

    # make meshgrid
    x, y = np.meshgrid(np.arange(shape[1]), np.arange(shape[0]))
    # generate the vector field
    flow_x, flow_y = np.zeros(shape), np.zeros(shape)

    # find the 2 components where coordinates are bigger / smaller than the line
    # to apply normal vector in the correct direction
    components, n_components = label(np.logical_not(line_mask).view('uint8'))
    assert n_components == 2, "%i" % n_components
    neg_val = components[0, 0] if fixed_x else components[-1, -1]
    pos_val = components[-1, -1] if fixed_x else components[0, 0]

    flow_x[components == pos_val] = deformation_strength * normal_vector[1]
    flow_y[components == pos_val] = deformation_strength * normal_vector[0]
    flow_x[components == neg_val] = - deformation_strength * normal_vector[1]
    flow_y[components == neg_val] = - deformation_strength * normal_vector[0]

    # generate the flow fields
    flow_x, flow_y = (x + flow_x).reshape(-1, 1), (y + flow_y).reshape(-1, 1)

    # dilate the line mask
    line_mask = binary_dilation(line_mask, iterations=iterations)#default=10
    
    return flow_x, flow_y, line_mask
def deform_2d(image2d,deformation_strength,iterations):
    flow_x, flow_y, line_mask = prepare_deform_slice(image2d.shape,deformation_strength,iterations)
    section = image2d.squeeze()
    mean = section.mean()
    shape = section.shape
    #interpolation=3
    section = map_coordinates( section, (flow_y, flow_x), mode='constant', 
                                  order=3).reshape(int(flow_x.shape[0]**0.5),int(flow_x.shape[0]**0.5))
    section = np.clip(section, 0., 1.)
    section[line_mask] = mean
    return section 
def apply_deform(imgs,deformation_strength=0,iterations=50,deform_ratio=0.25):
    '''
    imgs :3D
    '''
    transformedimgs= np.copy(imgs)
    sectionsnum = imgs.shape[0]
    i =0
    while i <sectionsnum:
        if random.random() <= deform_ratio:
            transformedimgs[i] = deform_2d(imgs[i],deformation_strength,iterations)
            i +=2
        i +=1
    return transformedimgs
```

![Markdown](http://i4.fuimg.com/640680/2be847081da6e223.png)

### elastic augmentation

```
from scipy.ndimage.interpolation import map_coordinates
from scipy.ndimage.filters import gaussian_filter

def elastic_transform(image, alpha, sigma, random_state=None):

    if random_state is None:
        random_state = np.random.RandomState(None)
    else:
        random_state = np.random.RandomState(random_state)

    shape = image.shape
    dx = gaussian_filter((random_state.rand(*shape) * 2 - 1), sigma) * alpha
    dy = gaussian_filter((random_state.rand(*shape) * 2 - 1), sigma) * alpha
    dz = np.zeros_like(dx)

    x, y, z = np.meshgrid(np.arange(shape[1]), np.arange(shape[0]), np.arange(shape[2]))
    indices = np.reshape(y+dy, (-1, 1)), np.reshape(x+dx, (-1, 1)), np.reshape(z, (-1, 1))

    return map_coordinates(image, indices, order=1, mode='reflect').reshape(shape)
def apply_elastic(img,mask):
    random_seed = np.random.randint(1000000)
    elasticedraw = elastic_transform(img, img.shape[1] * 2, img.shape[1] * 0.07, random_seed)
    elasticedseg = elastic_transform(mask, img.shape[1] * 2, img.shape[1] * 0.07, random_seed)
    return elasticedraw, elasticedseg
```

elastic augmentation is important and should be treated very carefully. I use the idea in Best Practices for Convolutional Neural Networks applied to Visual Document Analysis.

The main methods are Gaussian filter and interpolation. There is a version of elastic augmentation using affine transformation, I test it but the effect is hard to control.

So I use Gaussian filter and interpolation for gentle elastic transformation. Then normalize to 0-1, binarize label and make sure the transformation is same in images and masks.

```
apply_elastic(img,mask)
```

![Markdown](http://i4.fuimg.com/640680/64061355143fac3a.png)


## task2 reverse predicting 

I have use alignment and padding and shift scripts to process the raw data and it should be reversed after prediction. I test the codes to make sure it works.

Codes: [Summer_Intern/T_align.m at master · james20141606/Summer_Intern · GitHub](https://github.com/james20141606/Summer_Intern/blob/master/synapse_prediction/bin/T_align.m)


********

# Week 5 & 6
## align location volume
I align the annotation about pre and post synaptic partners location for later training and analyze three volumes pre and post’s section distance

It seems that the volume C annotation has some apparent outliers, it is impossible that the two partners have such a big distance, so I removed the outlier with distance more than 300.


![Markdown](http://i4.fuimg.com/640680/5271eb263cb9e565.png)

![Markdown](http://i4.fuimg.com/640680/a41fb440d8d1c617.png)

![Markdown](http://i4.fuimg.com/640680/132ddef47af261fc.png)

The final process include two more changes: do not use good slice replace bad slice
And remove partners with distance more than 300. Now the three volumes have 217,634,722 synaptic partners.

### data augmentation
For elastic transformation, it is weird to use gaussian filter and then warp, but it is good to use warp first and then do gaussian filter.

1. elastic: smoothed random motion field=random vector+gaussian filter
2. warping: random global affine matrix

![Markdown](http://i4.fuimg.com/640680/208732c8803ea2b3.png)

![Markdown](http://i4.fuimg.com/640680/206cd5295b80d561.png)



## loss function and new design

- Intensity  influence the result severely, besides decreasing contrast and brightness, 
http://cs231n.stanford.edu/reports/2017/pdfs/300.pdf
- we can also try group normalization and multi GPU batch normalization.
32 channel, 8 groups, each 4 channels
- distance transform to assign weight for negative class, similar with tanh(D/S)
- multi resolution and multi task learning
**Multi task!** is using multiple loss on different resolution level and add these lossed together. It is a kind of like attention. But the combined losses are not very precise to control different levels.
We may also consider MULTI -SCALE DENSE NETWORKS FOR RESOURCE E FFICIENT IMAGE CLASSIFICATION, it can output results on different resolution levels and are better than resnet based models.

### Loss
DICE loss are hard to convergence.
I formulate some equations to change the DICE loss, and also implement some other DICE loss adjustment.

![Markdown](http://i4.fuimg.com/640680/ceea6995778ee50a.png)

![Markdown](http://i4.fuimg.com/640680/b793b22de5ed6051.png)



##### generalized DICE loss
Change DICE denominator to square. So that the points having different distance from GT have different  derivative.

![Markdown](http://i4.fuimg.com/640680/d196b3bb76ababaa.png)


change denomi![Markdown](http://i4.fuimg.com/640680/cbdbb1c2f4192ada.png)


**Using this formulation we do not need to assign weights to samples of different classes to establish the right balance between foreground and background voxels,** and we obtain results that we experimentally observed are much better than the ones computed through the same network trained optimising a multinomial logistic loss with sample re-weighting

**DICE Loss**
consider negative？
![Markdown](http://i4.fuimg.com/640680/14a4604e6910d2ef.png)

**sensitivity-specificity**
![Markdown](http://i4.fuimg.com/640680/45a62036466fb811.png)

**weighted dice**
![Markdown](http://i4.fuimg.com/640680/7597c15cb6c70bd5.png)

![Markdown](http://i4.fuimg.com/640680/0fefcfc0276481ba.png)

still based only on pairwise comparisons of probabilities associated with the same label and don’t take into account **inter-class relationships.**


## reverse prediction and deal with cracks
For CREMI contest, we do several preprocessing, like align the dataset, and deal with two specific sections with cracks( it is very important, because the crack will severely influence the result.)

I will realign the predicted result to the original one and submit the prediction. And I will deal with two sections with cracks separately.

#### 对那两层做crack align 
- [ ] 脚本 align_new

- detect crack region and split the picture into two regions

![Markdown](http://i4.fuimg.com/640680/b88ca29cc508e738.png)

- align the two parts with neighbor sections. Use warp to align. The crack will look bigger.

![Markdown](http://i4.fuimg.com/640680/d898e30f03ec6e90.png)

- do interpolation, using optical flow

![Markdown](http://i4.fuimg.com/640680/a077144bab1af22e.png)

Reverse the predicted crack section back:

- delete interpolation region
- find connected region and extract them
- reverse warp the two parts
- 
```
imwarp(im, affine2d(tmp(:,:,2)),'FillValues',0,'OutputView',imref2d(sz));
tform = affine2d([2 0.33 0; 0 1 0; 0 0 1])
```

For reverse warp, we can use invert function
[Invert geometric transformation - MATLAB invert](https://www.mathworks.com/help/images/ref/affine2d.invert.html)
- add the two parts
- get the reversed images and test if it is right.


![Markdown](http://i4.fuimg.com/640680/1f07ed5887f5112b.png)

it’s good enough to transform synapse prediction result, no synapse will be on the border
So we do not need the padding work

#### for predicted data:
- [ ] Use [Jupyter Notebook](http://140.247.107.75:8889/notebooks/projects/synapse/jupyter/realign_crack.ipynb) to get connected components from em
And apply invert on them to get reversed version


### 8.6 reverse all predictions
A+ B+ C+ reverse prediction
Test if the algorithm is right!
#### use gt-syn transformed，and reverse，check if it is the same with the original one
- input: gt-syn/syn
- output: reverse/syn
Check if output=images/volumes/labels/clefts

**Rewrite the reverse alignment code**
after a long time, it finally works, with the help of donglai. It seems it is really hard to reverse back to the original align.

- The forward strategy looks like:
Read alignment shift distance, cumsum to get continuous shift, get each section’s shift. Have a very big tmp arr, put the small original arr in it. Get a bigger ROI to have the  medium one

```
syn_o=zeros([1250+sum(ww([1,3])),1250+sum(ww([2,4])),153],'uint16');
for i=1:125
	pd = round(pp(i+14,:)); 
	tmp = zeros(3075+ph,3075);
	
	tmp(912:911+1250,912:911+1250) = syn(:,:,i);
	syn_o(:,:,i+14) = tmp((912+pd(1)-ww(1)):(911+pd(1)+1250+ww(3)),...
	            (912+pd(2)-ww(2)):(911+pd(2)+1250+ww(4))); 
end
```
- The reverse strategy looks like:
Read alignment shift distance, cumsum to get continuous shift, get each section’s shift. Have a very big tmp arr, put the predicted region(medium size) in it. Get a small, original ROI to have the  original one
**through test there is no problem!**

#### A+: in 15 and 48 layer(from one, not zero), do reverse crack!
It is 14 and 47 section of predicted A+ syn
data/prediction/im015_reverse0.png, data/prediction/im048_reverse0.png

![Markdown](http://i4.fuimg.com/640680/24b6323ecbacadcb.png)

****

# Last three weeks
Week 7,8,9 (10)


## 8.13
We add squeeze and excitation block to our model. It further improves our performance on CREMI contest. We achieve 2nd place by the end of August. This architecture also works for synapse polarity prediction task.
![Markdown](http://i1.fuimg.com/640680/1b36249fa6f56a59.png)

![Markdown](http://i1.fuimg.com/640680/3d5fe582cfbd9d77.png)



#### 8.29
Reverse back a new version
- Get ROI, delete interpolation region
- inverse warp
- get reverse0
-merge
- Put back to predicted A+ and reverse A+
- 
`/n/coxfs01/xupeng/projects/synapse/data/reverse`


