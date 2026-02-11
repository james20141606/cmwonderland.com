---
title: Snakemake Basic
pubDatetime: 2018-05-05T22:39:51Z
description: "snakemake是一个用来编写任务流程的工具，用python写的，因此其执行的流程脚本也比较通俗易懂，易于理解，可以看做用户友好版的make。"
author: "James Chen"
tags: ["techniques", "bioinformatics", "codes"]
categories: ["techniques"]
draft: false
---

snakemake是一个用来编写任务流程的工具，用python写的，因此其执行的流程脚本也比较通俗易懂，易于理解，可以看做用户友好版的make。


其实流程控制是复杂任务（在生信领域很常见）必需的关注点。只是snakemake对于代码功力不够的人来说，在写好代码与重复流程的花销的trade off上，还不如一遍遍重复流程。。但是真的是一个写好了就很好用的东西，我经历的第一个项目就让我深有感触，eMaize早期做的说实话不算复杂，但是一步一步数据读取、处理、特征选择、回归等步骤已经能够把人搞晕了，如果一步有问题要返工，就得调出来以前的代码、笔记，如果笔记记得不详细就惨了，所以在接触snakemake的时候，就感觉到这款工具确实非常有意义（尤其是在别人写好自己用的时候\(^o^)/~）

这次motif预测的数据处理过程很繁杂，数据种类很多，bin神的代码组织向来非常复杂严谨，所以实在是个用snakemake的绝佳场景，在读他的文件的时候，就顺便看了看snakemake的基本使用。

## Installation
```
conda install -c bioconda snakemake
#或者
pip3 install snakemake
```


## 一个简单的例子
**建立两个文件**
```
$ echo "Here is hello." > hello.txt
$ echo "Here is world." > world.txt
```

**接下来开始编写我们的Snakefile**

```
rule concat:  # 这里的rule可视为snakemake定义的关键字，concat使我们自定义的这一步任务的名称
    input:   # input同样是snakemake的关键字，定义了在这个任务中的输入文件 
        expand("{file}.txt", file=["hello", "world"]) #expand是一个snakemake定义的替换命令
    output:   # output也是snakemake的关键字，定义输出结果的保存文件
        "merged.txt"
    shell:  # 这里表示我们下面的命令将在命令行中执行
        "cat {input} > {output}"
```

**最后就可以在Snakefile的路径执行snakemake命令即可**

```
$ snakemake
$ cat merge.txt
Here is hello.
Here is world.
```

在上面的Snakefile脚本中，rule、input、output、shell、expand均为snakemake中的关键字或者命令。同时Snakefile中的每一个rule其实都可以看作是一个简单的shell脚本，通过Snakefile将多个rule组织在一起并按照我们定义的顺序来执行。另外，**在output中的结果文件可以是未存在目录中的文件,这时会自动创建不存在的目录**（这个功能是在很强）。

## snakemake中命令与规则

### rule
rule是Snakefile中最主要的部分。如上面的例子所说，每一个rule定义了一系列pipe中的一步，每一个rule都可以当作一个shell脚本来处理，一般主要包括input、output、shell3个部分。同时还有许多上面没有列出来的用法：

#### rule all
不同于其他的rule，在rule all里面一般不会去定义要执行的命令，他一般用来定义最后的输出结果文件。除了rule all中定义的文件外最后输出结果不会保存任何中间文件。例如将上面的脚本改成如下文件则没有输出结果：
```
rule all:
    input:
         #"merged.txt"  取消注释后，则能正常输出文件
rule concat:
    input:
        expand("{file}.txt", file=["hello", "world"])
    output:
        "merge.txt"
    shell:
        "cat {input} > {output}"
```

#### wildcards
用来获取通配符匹配到的部分，例如对于通配符$”{dataset}/file.{group}.txt”$匹配到文件101/file.A.txt，则{wildcards.dataset}就是101，{wildcards.group}就是A。
#### threads
通过在rule里面指定threads参数来指定分配给程序的线程数，egthreads: 8。
#### resources
可用来指定程序运行的内存，eg. resources: mem_mb=800。
#### message
使用message参数可以指定每运行到一个rule时，在终端中给出提示信息，eg.message: "starting mapping ..."。
#### priority
可用来指定程序运行的优先级，默认为0，eg.priority: 20。
#### log
用来指定生成的日志文件，eg.log: "logs/concat.log"。
#### params
指定程序运行的参数，eg.params: cat="-n",调用方法为{params.cat}。
#### run
在run的缩进区域里面可以输入并执行python代码。
#### scripts
用来执行指定脚本，eg.scripts: "rm_dup.py"
#### temp
通过temp方法可以在所有rule运行完后删除指定的中间文件，eg.output: temp("f1.bam")。
#### protected
用来指定某些**中间文件是需要保留的**，eg.output: protected("f1.bam")。
#### ancient
重复运行执行某个Snakefile时，snakemake会通过比较输入文件的时间戳是否更改(比原来的新)来决定是否重新执行程序生成文件，使用ancient方法可以强制使得结果文件一旦生成就不会再次重新生成覆盖，即便输入文件时间戳已经更新，eg.input: ancient("f1.fastq")。
#### Rule Dependencies。可通过快捷方式指定前一个rule的输出文件为此rule的输入文件：
```
rule a:
    input:  "path/to/input"
    output: "path/to/output"
    shell:  ...

rule b:
    input:  rules.a.output   #直接通过rules.a.output 指定rule a的输出
    output: "path/to/output/of/b"
    shell:  ...
```
#### report
使用snakemake定义的report函数可以方便的将结果嵌入到一个**HTML文件**中进行查看。

### configuration
每计算一次数据都要重写一次Snakefile有时可能会显得有些繁琐，可以将那些改动写入配置文件，使用相同流程计算时，将输入文件的文件名写入配置文件然后通过Snakefile读入即可。
配置文件有两种书写格式——json和yaml。在Snakefile中读入配置文件使用如下方式：

```
configfile: "path/to/config.json" 
configfile: "path/to/config.yaml"

# 也可直接在执行snakemake命令时指定配置
$ snakemake --config yourparam=1.5
```
在shell命令中直接调用config文件中的内容的话，不需要引号，如config[a]而不是config["a"]。

## snakemake的执行
一般讲所有的参数配置写入Snakefile后直接在Snakefile所在路径执行snakemake命令即可开始执行流程任务，如果只有一个snakefile的话，连文件都不用写。一些常用的参数：

```
--snakefile, -s 指定Snakefile，否则是当前目录下的Snakefile
--dryrun, -n  不真正执行，一般用来查看Snakefile是否有错
--printshellcmds, -p   输出要执行的shell命令
--reason, -r  输出每条rule执行的原因,默认FALSE
--cores, --jobs, -j  指定运行的核数，若不指定，则使用最大的核数
--force, -f 重新运行第一条rule或指定的rule
--forceall, -F 重新运行所有的rule，不管是否已经有输出结果
--forcerun, -R 重新执行Snakefile，当更新了rule时候使用此命令

#一些可视化命令
$ snakemake --dag | dot -Tpdf > dag.pdf

#集群投递
snakemake --cluster "qsub -V -cwd -q 节点队列" -j 10
# --cluster /-c CMD: 集群运行指令
# qusb -V -cwd -q， 表示输出当前环境变量(-V),在当前目录下运行(-cwd), 投递到指定的队列(-q), 如果不指定则使用任何可用队列
# --local-cores N: 在每个集群中最多并行N核
# --cluster-config/-u FILE: 集群配置文件
```

#### Snakemake  生成图
```
snakemake --dag | dot -Tpdf > dag.pdf
```

#### 生成report
以HTML格式生成report

```
rule report:
    input:
        "calls/all.vcf"
    output:
        "report.html"
    run:
        from snakemake.utils import report
        with open(input[0]) as vcf:
            n_calls = sum(1 for l in vcf if not l.startswith("#"))

        report("""
        An example variant calling workflow
        ===================================

        Reads were mapped to the Yeast
        reference genome and variants were called jointly with
        SAMtools/BCFtools.

        This resulted in {n_calls} variants (see Table T1_).
        """, output[0], T1=input[0])
```


一个完整的例子

```
SAMPLES = ["A", "B"]


rule all:
    input:
        "report.html"


rule bwa_map:
    input:
        "data/genome.fa",
        "data/samples/{sample}.fastq"
    output:
        "mapped_reads/{sample}.bam"
    shell:
        "bwa mem {input} | samtools view -Sb - > {output}"


rule samtools_sort:
    input:
        "mapped_reads/{sample}.bam"
    output:
        "sorted_reads/{sample}.bam"
    shell:
        "samtools sort -T sorted_reads/{wildcards.sample} "
        "-O bam {input} > {output}"


rule samtools_index:
    input:
        "sorted_reads/{sample}.bam"
    output:
        "sorted_reads/{sample}.bam.bai"
    shell:
        "samtools index {input}"


rule bcftools_call:
    input:
        fa="data/genome.fa",
        bam=expand("sorted_reads/{sample}.bam", sample=SAMPLES),
        bai=expand("sorted_reads/{sample}.bam.bai", sample=SAMPLES)
    output:
        "calls/all.vcf"
    shell:
        "samtools mpileup -g -f {input.fa} {input.bam} | "
        "bcftools call -mv - > {output}"


rule report:
    input:
        "calls/all.vcf"
    output:
        "report.html"
    run:
        from snakemake.utils import report
        with open(input[0]) as vcf:
            n_calls = sum(1 for l in vcf if not l.startswith("#"))

        report("""
        An example variant calling workflow
        ===================================

        Reads were mapped to the Yeast
        reference genome and variants were called jointly with
        SAMtools/BCFtools.

        This resulted in {n_calls} variants (see Table T1_).
        """, output[0], T1=input[0])
```


**更加复杂的例子可以看这里：**
[斌神写的](https://github.com/james20141606/Deepshape/blob/master/predict_reactivity/Snakefile)

资源
[Snakemake documentation](http://snakemake.readthedocs.io/)
[snakemake—我最喜欢的流程管理工具 - 简书](https://www.jianshu.com/p/8e57fd2b81b2)
[snakemake使用笔记](https://www.jianshu.com/p/14b9eccc0c0e)



