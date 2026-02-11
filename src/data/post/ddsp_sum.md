---
title: DDSP paper and codes summary
publishDate: 2020-03-01T22:30:44Z
excerpt: "Here I summarized a very exciting differentiable digital signal processing tool proposed by Google's team in Jan 2020. The tool is especially useful in audio waveform reconstruction and some other related task."
author: "James Chen"
tags: ["audio", "deep learning", "graduate", "phd", "research", "lab"]
category: "project"
math: true
draft: false
---

Here I summarized a very exciting differentiable digital signal processing tool proposed by Google's team in Jan 2020. The tool is especially useful in audio waveform reconstruction and some other related task.




## paper summary

### abstract 

The paper and the codes are the most exciting ones I’ve seen in a long time!
The DDSP paper successfully combine DSP and neural network together at a totally new level. By making some of the audio related signal processing differentiable. They achieve amazing audio reconstruction and style transfer results. 
To me, it is really exciting and inspiring. I have tried to do (audio) spectrogram reconstruction for several months. The wavenet based, tacotron based methods, together with GAN, all fail to generate good reconstruction. For a long time I thought it is VAE’s fault that the reconstruction would be blurry and introducing GAN/BiGAN models could not save the results (it seems there is a trade off between VAE and GAN). I also counted on tacotron based model (like parrotron). But it turns out the model is really hard to train, and not working on a relatively small dataset.

The paper first criticize two kinds of previous audio generation models, which seems reasonable:
- models generating samples in one of two domains: time or frequency do not utilize existing knowledge of how sound is generated and perceived.
- vocoders/synthesizers successfully incorporates strong domain knowledge of signal processing and perception, but has been less actively researched due to limited expressivity and difﬁculty integrating with modern auto-differentiation-based machine learning methods.

The DDSP frameworks, however, can utilize strong domain knowledge as well as integrating these elements with deep learning. The framework could have good performance even without large autoregressive models (wavenet based) or adversarial losses(GAN based). The authors called it **utilizing strong inductive biases without losing the expressive power of neural networks.**
The authors show that combining interpretable modules permits manipulation of each separate model component. Because we can manipulate F0 (foundamental frequency) and loudness, residual (timbre) features.  The applications include independent control of pitch and loudness, realistic extrapolation to pitches not seen during training, blind dereverberation of room acoustics, transfer of extracted room acoustics to new environments, and transformation of timbre between disparate sources. 
**In short, DDSP enables an interpretable and modular approach to generative modeling, without sacriﬁcing the beneﬁts of deep learning.**

By the way, the DDSP tools are also easy to use. And their model is really small compared with large wavenet or GAN based model. Which makes it possible to train the model on a small dataset. The DDSP did not propose a specific network, but provided a useful differentiable signal processing tools. The tools enable us to assemble our own powerful model. And the most exciting thing is, I could use a auto-encoder (with out KL regularization, nor adversarial loss) to achieve a nearly perfect reconstruction results.

### introduction
First talks about neural network, 
> Here, we increase the size of that toolbox by introducing the Differentiable Digital Signal Processing (DDSP) library, which integrates interpretable signal processing elements into modern automatic differentiation software (TensorFlow).
Then talks about the periodic property
> Objects have a natural tendency to periodically vibrate. However, neural synthesis models often do not exploit this periodic structure for generation and perception.

Then the author points out the drawbacks of three different audio synthesis models.
- for strided convolution, the problem is phase alignment. 
> Since audio oscillates at many frequencies, all with different periods from the ﬁxed frame hop size, the model must precisely align waveforms between different frames and learn ﬁlters to cover all possible phase variations.
- Fourier-based models–such as Tacotron and GANSynth (proposed by the same team) face spectral leakage problem and phase-alignment problem
> sinusoids at multiple neighboring frequencies and phases must be combined to represent a single sinusoid when Fourier basis frequencies do not perfectly match the audio
- Autoregressive waveform models–such as WaveNet, SampleRNN, and WaveRNN (SOTA) face the problem of data limitation and perception problem.
> The can avoid these issues by generating the waveform a single sample at a time. They are not constrained by the bias over generating wave packets and can express arbitrary waveforms.

> they require larger and more data-hungry networks, as they do not take advantage of a bias over oscillation. And a waveform’s shape does not perfectly correspond to perception.

![Markdown](http://i2.tiimg.com/640680/9d33009a3459dd58.png)


#### OSCILLATOR MODELS
Rather than predicting waveforms or Fourier coefﬁcients, a third model class (vocoders or synthesizers) directly generates audio with oscillators.
> These “analysis/synthesis” models use expert knowledge and hand-tuned heuristics to extract synthesis parameters (analysis) that are interpretable (**loudness and frequencies**) and can be used by the generative algorithm (synthesis).
Neural networks have play some roles in oscillator models, in modeling pre-extracted synthesis parameters. As the authors says:
> The analysis parameters must still be tuned by hand and gradients cannot ﬂow through the synthesis procedure. As a result, small errors in parameters can lead to large errors in the audio that cannot propagate back to the network. Crucially, the realism of vocoders is limited by the expressivity of a given analysis/synthesis pair. 

#### contributions
> DDSP models combine the strengths of the above approaches, beneﬁting from the inductive bias of using oscillators, while retaining the expressive power of neural networks and end-to-end training.
DDSP components are capable of generating high-ﬁdelity audio without autoregressive or adversarial losses. And DSSP could also perform different tasks:
- Independent control over pitch and loudness during synthesis.
• Realistic extrapolation to pitches not seen during training.
• Blind dereverberation of audio through seperate modelling of room acoustics.
• Transfer of extracted room acoustics to new environments.
• Timbre transfer between disparate sources, converting a singing voice into a violin.
• Smaller network sizes than comparable neural synthesizers.

### related works
To understand why Google’s team could build such a good tool, it is important to learn the papers which inspire them.

- Vocoders
> Source-ﬁlter/subtractive models are inspired by the human vocal tract and dynamically ﬁlter a harmonically rich source signal, while sinusoidal/additive models generate sound as the combination of a set of time-varying sine waves. **Additive models** are strictly more expressive than subtractive models but have more parameters as each sinusoid has its own **time-varying loudness and frequency.**
> (Serra & Smith, 1990; Beauchamp, 2007) builds an additive synthesizer combines sinusoids in harmonic (integer) ratios of a fundamental frequency alongside a time-varying ﬁltered noise signal.
- Neural Source Filter (NSF)
A recent (complicated) work, a differentiable waveshaping synthesizer.
> The NSF can be seen as a speciﬁc DDSP model, that uses convolutional waveshaping of a sinusoidal oscillator to create **harmonic content**, rather than additive synthesis explored in this work. Both works also generate audio in the time domain and impose multi-scale spectrograms losses in the frequency domain.

### DDSP components
Now it is the most exciting part, introducing how they make DSP operations differentiable. The ideas is straightforward: to write the operations as functions in modern automatic differentiation software. They express core components as feedforward functions, allowing efﬁcient implementation on parallel hardware such as GPUs and TPUs, and generation of samples during training. These components include oscillators, envelopes, and ﬁlters (linear-time-varying ﬁnite-impulse-response, LTV-FIR).

#### SPECTRAL MODELING SYNTHESIS
implement a differentiable version of Spectral Modeling Synthesis (SMS) Serra & Smith (1990).
> This model generates sound by combining an additive synthesizer (adding together many sinusoids) with a subtractive synthesizer (ﬁltering white noise).
It is parametric, and it is a highly expressive model
It is important that the model has more parametetrs than other parametric models:
> For example, in the 4 seconds of 16kHz audio in the datasets considered here, the synthesizer coefﬁcients actually have ∼2.5 times more dimensions than the audio waveform itself ((1 amplitude + 100 harmonics + 65 noise band magnitudes) * 1000 timesteps = 165,000 dimensions, vs. 64,000 audio samples).
It is hard to hand design so many features, but it is amenable to control by a neural network

> As we only consider monophonic sources in these experiments, we use the Harmonic plus Noise model, that further constrains sinusoids to be integer multiples of a fundamental frequency


#### HARMONIC OSCILLATOR / ADDITIVE SYNTHESIZER
the heart of the synthesis techniques: **sinusoidal oscillator.**

![Markdown](http://i2.tiimg.com/640680/6715b0ef602a4ef4.png)

This part has clearly illustrate how to generate a monophonic waveform from time varying fundamental frequency(f0) and loudness. The f0 can generate harmonic multiples and loudness can generate harmonic amplitudes using scale factor.


#### ENVELOPES
the neural networks operate at a slower frame rate but the oscillator formulation above requires time-varying amplitudes and frequencies at the audio sample rate (1000 vs 64,000)
For instantaneous frequency upsampling, they use bilinear interpolation, required smoothing to prevent artifacts. (by adding overlapping Hamming windows)

#### FILTER DESIGN : FREQUENCY SAMPLING METHOD
> Standard convolutional layers are equivalent to linear time invariant ﬁnite impulse response (LTI-FIR) ﬁlters. However, to ensure interpretability and prevent phase distortion, we employ the frequency sampling method to convert network outputs into impulse responses of linear-phase ﬁlters.
LTV-FIR


#### FILTERED NOISE / SUBTRACTIVE SYNTHESIZER

> Natural sounds contain both harmonic and stochastic components. The Harmonic plus Noise model captures this by combining the output of an additive synthesizer with a stream of ﬁltered noise (Serra & Smith, 1990; Beauchamp, 2007). We are able to realize a differentiable ﬁltered noise synthesizer by simply applying the LTV-FIR ﬁlter from above to a stream of uniform noise Y l = H l N l where N l is the IDFT of uniform noise in domain [-1, 1].

The detailed usage found in solo example part




### Experiments and Model details


![Markdown](http://i2.tiimg.com/640680/7148b45faa25c7cb.png)

A demo auto-encoder model, F0 could be extracted from pretrained CREPE model or learned using a resnet encoder
Note that the author says with pride that:
> we ﬁnd DDSP components are able to dramatically improve autoencoder performance in the audio domain. Introducing stochastic latents (such as in GAN, VAE, and Flow models) will likely further improve performance, but we leave that to future work as it is orthogonal to the core question of DDSP component performance that we investigate in this paper.
I can verify their words as the model is really doing a great job and there are definitely improvements we could do.

**Encoder:** 
	- the loudness l(t) is extracted directly from the audio, using a neural network! Note the details in http://archives.ismir.net/ismir2019/paper/000063.pdf, they can extract F0 and loudness features and use WaveRNN conditioning on it. 
	- a pretrained **CREPE model** with ﬁxed weights (Kim et al., 2018) is used as an f(t) encoder to extact the **fundamental frequency**, and optional encoder extracts a time-varying latent encoding z(t) of the residual information.  (For the unsupervised autoencoder, the pretrained CREPE model is replaced with a Resnet architecture (He et al., 2016) that extracts f(t) from a mel-scaled log spectrogram of the audio, and is jointly trained with the rest of the network.) details in appendic B.1
	- For the z(t) encoder, MFCC coefﬁcients (30 per a frame) are ﬁrst extracted from the audio, which correspond to the smoothed spectral envelope of harmonics (Beauchamp, 2007), and transformed by a single GRU layer into 16 latent variables per a frame.
> z-encoder: As shown in Figure 8, the encoder ﬁrst calculates MFCC’s (Mel Frequency Cepstrum Coefﬁcients) from the audio. MFCC is computed from the log-mel-spectrogram of the audio with a FFT size of 1024, 128 bins of frequency range between 20Hz to 8000Hz, overlap of 75%. We use only the ﬁrst 30 MFCCs that correspond to a smoothed spectral envelope. The MFCCs are then passed through a normalization layer (which has learnable shift and scale parameters) and a 512-unit GRU. The GRU outputs (over time) fed to a 512-unit linear layer to obtain z(t). The z embedding reported in this model has 16 dimensions across 250 time-steps.

![Markdown](http://i2.tiimg.com/640680/49696ba3c2fdb7c7.png)
 
**Decoder:**
The decoder network maps the tuple (f(t), l(t), z(t)) to control parameters for the additive and ﬁltered noise synthesizers. The synthesizers generate audio based on these parameters, and a reconstruction loss between the synthesized and original audio is minimized.

> The decoder’s input is the latent tuple (f(t), l(t), z(t)) (250 timesteps). Its outputs are the parameters required by the synthesizers. For example, in the case of the **harmonic synthesizer and ﬁltered noise synthesizer** setup, the decoder outputs a(t) **(amplitudes of the harmonics) for the harmonic synthesizer** (note that f(t) is fed directly from the latent), and **H (transfer function of the FIR ﬁlter) for the ﬁltered noise synthesizer.**

![Markdown](http://i2.tiimg.com/640680/aa722961d552f14c.png)

Separate MLPs for different features


> Note that the latent f(t) is also **fed directly** to the additive synthesizer as it has **structural meaning** for the synthesizer outside the context of any given dataset. This disentangled representation enables the model to both interpolate within and extrapolate outside the data distribution. Indeed, recent work support incorporation of strong inductive biases as a prerequisite for learning disentangled representations
This means that with loudness and pitch explicitly controlled by (f(t), l(t)), the model should use the residual z(t) to encode timbre. Although architecture and training do not strictly enforce this encoding, they qualitatively demonstrate how varying z leads to a smooth change in timbre. Fig 3 shows that the features (f0 and loudness) of the resynthsized audio (dashed lines) closely follow the conditioning. But the latent vectors, z(t), are interpolated, and the spectral centroid of resulting audio (thin solid lines) smoothly varies between the original samples (dark solid lines). This could achieve timbre transfer

![Markdown](http://i2.tiimg.com/640680/5745e749dd9e9403.png)

- timbre transfer task
Step by step transfer by explicitly controlling f0 and loudness
> converting the singing voice of an author into a violin. F0 and loudness features are extracted from the singing voice and the DDSP autoencoder trained on solo violin used for resynthesis. To better match the conditioning features, we ﬁrst shift the fundamental frequency of the singing up by two octaves to ﬁt a violin’s typical register. Next, we transfer the room acoustics of the violin recording (as described in Section 5.3) to the voice before extracting loudness, to better match the loudness contours of the violin recordings. The resulting audio captures many subtleties of the singing with the timbre and room acoustics of the violin dataset.

 - Model size
The DDSP models have the fewest parameters (up to 10 times less), despite no effort to minimize the model size in these experiments. Compared with WaveNet AE, GANSynth, and WaveRNN.



### key questions to be anwsered

- Is it causal?
It uses GRU and it is causal
- At each time step, only needs to generate two features?
if not use z, then we only need loudness and f0 (which is used in our experiments), if use z, z could have more than 1 dimension
- how to generate harmonic features from F0 using decoder?
Use RNN and dense layers to output harmonic and magnitude features, dimensions are 60 and 65
- Is it enough to use fundamental frequency and loudness?
> The brain stem faithfully represents the three main features of speech and music: timing (onsets/offsets and envelope of the response), pitch (encoding of the fundamental frequency), and timbre (harmonics)
> http://europepmc.org/backend/ptpmcrender.fcgi?accid=PMC3989107&blobtype=pdf



## code details

### AE model
[ddsp/ae.gin at master · magenta/ddsp · GitHub](https://github.com/magenta/ddsp/blob/master/ddsp/training/gin/models/ae.gin)
Autoencoder that decodes from (loudness, f0, z).

#### Encoder
z = encoder(audio)
How to generate z?
- generate z use `class MfccTimeDistributedRnnEncoder(Encoder)`
  “””Use MFCCs as latent variables, distribute across timesteps.”””
Use `spectral_ops.compute_mfcc` to  compute MFCC, then use RNN on MFCC, z_dims=16, z_time_steps=125
For encoder, can optionally updates f0 or use CREPE pretrained model.
- generate F0
	- use CREPE
	- or use ResnetF0Encoder to train the encoder

#### Decoder
ZRnnFcDecoder()
channels 512
`append_f0_loudness = True`  this means concat conditioning[‘f0_scaled’], conditioning[‘ld_scaled’], and conditioning[‘z’] together (f0 and loudness are 1 dim)
Use RNN and dense layers to generate outputs:
output_splits = ((‘amps’, 1),  (‘harmonic_distribution’, 60),(‘noise_magnitudes’, 65))

#### processorgroup
```
ProcessorGroup.dag = [
  (@synths.Additive(),
    [‘amps’, ‘harmonic_distribution’, ‘f0_hz’]),
  (@synths.FilteredNoise(),
    [‘noise_magnitudes’]),
  (@processors.Add(),
    [‘filtered_noise/signal’, ‘additive/signal’]),
]
```

- `synths.Additive()`
Synthesize audio with a bank of harmonic sinusoidal oscillators.
	`get_controls`Use three input
	- amplitudes: 3-D Tensor of synthesizer controls, of shape [batch, time, 1].
	- harmonic_distribution: 3-D Tensor of synthesizer controls, of shape [batch, time, n_harmonics].
	- f0_hz: Fundamental frequencies in hertz. Shape [batch, time, 1].
	`get_signal` use input which temporal dim is n_frames
**Returns**  signal: A tensor of harmonic waves of shape [batch, n_samples].

- `synths.FilteredNoise()`
 Use `frequency_filter`  to filter audio with a finite impulse response filter.
 Returns: Filtered audio. Tensor of shape  [batch, audio_timesteps + window_size - 1] (‘valid’ padding) or shape [batch, audio_timesteps] (‘same’ padding).

- `processors.Add()`
Add ‘filtered_noise/signal’, ‘additive/signal’ together.


#### what is the loss:
- spectral loss, since the perception and waveform may be incompatible
Given the original and synthesized audio, we compute their (magnitude) spectrogram $S_i$ and $\hat{S_i}$ , respectively, with a given FFT size i, and deﬁne the loss as the sum of the L1 difference between S_i and $\hat{S_i}$  as well as the L1 difference between log S_i and log $\hat{S_i}$.

$$
L_{i}=\left\|S_{i}-\hat{S}_{i}\right\|_{1}+\alpha\left\|\log S_{i}-\log \hat{S}_{i}\right\|_{1}
$$

> where $\alpha$ is a weighting term set to 1.0 in our P experiments. The total reconstruction loss is then the sum of all the spectral losses, L reconstruction = $L_{\text {reconstruction }}=\sum_{i} L_{i}$. In our experiments, we used FFT sizes (2048, 1024, 512, 256, 128, 64), and the neighboring frames in the Short-Time Fourier Transform (STFT) overlap by 75%. Therefore, the L i ’s cover differences between the original and synthesized audios at different spatial-temporal resolutions.

- embedding loss, mean difference of embedding from model’s encoder
	- for example, a pretrained CREPE model as encoder to generate embeddings(pitch) from gt audio and synthesized audio.
For AE model, only use spectral loss


#### solo instrument as example
Encoder is None, use CREME pretrained model to extract f0 and loudness, no z here
Each sample in the batch  includes: 
`batch[‘audio’].shape,batch[‘f0_confidence’].shape, batch[‘f0_hz’].shape,  batch[‘loudness_db’].shape`
64000, 1000, 1000, 1000

After the encoder, we get
`’audio’, ‘f0_confidence’, ‘f0_hz’, ‘loudness_db’, ‘f0_scaled’, ‘ld_scaled’`

![Markdown](http://i2.tiimg.com/640680/bc8fe4115ab89d14.png)

- Decode: include decoder and processor_group
	- Decoder on conditioning and generate **processor_inputs**
`‘audio’, ‘f0_confidence’, ‘f0_hz’, ‘loudness_db’, ‘f0_scaled’, ‘ld_scaled’, ‘amps’, ‘harmonic_distribution’, ‘noise_magnitudes’`
The last two features: (1, 1000, 60), (1, 1000, 65)

![Markdown](http://i2.tiimg.com/640680/2e131a5efb44ac7c.png)

Note for the noise_magnitude, we use `filtered_noise` core function to process
- signal: A tensor of harmonic waves of shape [batch, n_samples, 1]. **Here is an uniform noise.** tf.random.uniform([batch_size, self.n_samples], minval=-1.0, maxval=1.0)
- magnitudes: Magnitudes tensor of shape [batch, n_frames, n_filter_banks].
	- `frequency_filter(signal,magnitudes,window_size=self.window_size)`
		- the funtion include `frequency_impulse_response` to convert magnitudes to IR and do `fft_convolve` fo signal and IR
			- `frequency_impulse_response`: Get windowed impulse responses using the frequency sampling method.
Then we can get filtered noise, to add to signal


- processor_group(processor_inputs) will generate audio

![Markdown](http://i2.tiimg.com/640680/94ce0231982209cd.png)



### Usage
**Colab is easy to use**

#### installation
```
Requires tensorflow >=2.1.0
pip install —upgrade tensorflow-gpu
Shoud install libsndfile-dev but no package in conda
module load libsndfile/intel/1.0.28
! pip install soundfile --upgrade
conda install ffmpeg
```

`ddsp-master/ddsp/colab/tutorials/0_processor.ipynb`
demonstrate how to process ‘amplitudes’, ‘harmonic_distribution’, ‘f0_hz’
And **get_signal()** can synthesize audio from controls, 
_call_  can synthesize audio from raw inputs. amps, harmonic_distribution, f0_hz
The function is defined in `wavetable_synthesis`

![Markdown](http://i2.tiimg.com/640680/cbb82ed3d5e7ef04.png)

After controls:
* Amplitudes are now all positive
* The harmonic distribution sums to 1.0
* All harmonics that are above the Nyquist frequency now have an amplitude of 0.

![Markdown](http://i2.tiimg.com/640680/286e9d630d0510de.png)


![Markdown](http://i2.tiimg.com/640680/92b0f0331fba85a2.png)

Prepare data
`!ddsp_prepare_tfrecord`
Note, the audio should not be too short, you should merge the short audio into a single audio file and feed in

```
module load cuda/9.0.176
module load cudnn/9.0v7.0.5
```
Note that the GPU use is a little tricky when running on own machines

Results in jupyter notebook, nearly perfect reconstruction, PCC 0.8-0.9
Analyze results
	- SHTOOKA whole dataset https://drive.google.com/file/d/1DgjxlMLd-hYtYq4_O99oclqgfliL3Cqx/view?usp=sharing
	- SHTOOKA data with phonemes <=4 https://drive.google.com/file/d/1kPQEVD5OBjeliH2rsLGNjPcJExJv5sSe/view?usp=sharing
Other files: https://drive.google.com/drive/folders/1A7lT2dMrZf9r-EoRM2c61oQt3CGnaikM?usp=sharing





### Github Issues:
Q:
Hey, I just got a really good reconstruction result which is too good to be true. I have a sense that the idea behind the model is really good but it is still so amazing to me. I just use your demo autoencoder to reconstruct audios from the human voice and the result is really good. But I could not understand how it can be achieved by only using f0 and loudness information? For example, the vowel ‘a’ and ‘e’ is definitely different, how does this be reflected through f0 and loudness? I thought there might be some difference between musical instruments and human voice. I just couldn’t understand that these features are enough.
By the way, if I want to add z as latent space besides f0 and loudness, how can I tell the model to use it? I thought you mentioned in the paper that z may correspond to timbre information but I couldn’t find it in timbre_transfer.ipynb, can you achieve timbre transfer without z?
Another question I am really curious about is if we’d like to do human voice reconstruction from multiple sources(different people), should we consider timbre and include z in the model?
Also since the model is really doing a good job on waveform reconstruction. Have you considered to use it on TTS task? Can we use an encoder to generate some features like f0 and loudness from text of some other signal to generate waveform?
A:
> My guess is that the model is probably overfitting quite a lot to a small dataset. In that case, segment of loudness and f0 corresponds to a specific phoneme because the dataset doesn’t have enough variation. For a large dataset, there will be one to many mappings that the model can’t handle without more conditioning (latent or labels).
Q:
1. I put the reconstruction result analysis here: https://drive.google.com/file/d/1DgjxlMLd-hYtYq4_O99oclqgfliL3Cqx/view
2. For overfitting issues, I use SHTOOKA dataset which contains audio length around 1hour and 30 min, I think that is not too small for the model to overfit? I am still amazed that the model can handle the data so well, since I have tried parrotron model for spectrogram reconstruction on SHTOOKA dataset and the model could not converge…
3. I am not sure if I understood *more conditioning (latent or labels).* here:
> For a large dataset, there will be one to many mappings that the model can’t handle without more conditioning (latent or labels).
Do you mean we can add conditionings besides z, f0 and loudness? You also mentioned I could add grapheme or phoneme conditioning for TTS task, do you mean using an encoder to extract phoneme, grapheme or other conditioning and concat with z, f0 and loudness and then feed them to decoder?
4. I am also curios if I can further improve the result by add z conditioning and use Resnet instead CREPE mode? Or it will be harder to train? Have you try some more complicated model like VAE or GAN using DDSP?



## Plan
Not included here

