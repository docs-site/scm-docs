---
title: LV040-LD链接脚本
date: 2025-09-20 15:38:28
icon: famicons:logo-markdown
permalink: /sdoc/dev-tool/keil/126b08e6f2e40a653e71bc02
index: true
tags:
categories:
copyright: false
keywords:
cover:
comments:
mathjax:
top:
description:
tdoc:
  detailDate: 2025-09-20 15:38:28.166
  fulluuid: 53e71bc02dd346aeac5749700b205317
  useduuid: 53e71bc02
---

这篇笔记主要是STM32CubeMX软件生成的STM32F103ZETx_FLASH.ld链接文件的学习笔记。这篇笔记按照顺序从上到下分析STM32F103ZETx_FLASH.ld文件。关于GNU链接脚本的详细语法我们可以参考这里：[Documentation for binutils 2.40 (sourceware.org)](https://sourceware.org/binutils/docs/)，这里好像还有在线的文档。**【注意】**生成Makefile文件的话，链接脚本是自动生成的，并且每一次重新生成的时候，**链接脚本将会重新生成**，也就是说，若是我们修改了链接脚本内容的话，只要我们通过STM32CubeMX更新工程，我们修改的部分都会被删除。

<!-- more -->

## 一、参考资料

关于链接脚本，其实在GNU的官方文档中是有相关的内容的。

- GNU官网：[GNU 操作系统和自由软件运动](https://www.gnu.org/)
- Documentation for binutils 2.40 ：[Documentation for binutils 2.40 (sourceware.org)](https://sourceware.org/binutils/docs/)
- Linker (ld) 在线文档：[ld.pdf (sourceware.org)](https://sourceware.org/binutils/docs/ld.pdf)

GNU与GCC什么关系？这里简单了解一下吧，至少知道为什么我们找链接脚本的语法要到GNU的官网去，我查了下维基百科，是这样说的：

**GNU编译器套装**（英语：**GNU Compiler Collection**，缩写为**GCC**）是[GNU计划](https://zh.wikipedia.org/wiki/GNU計劃)制作的一种[优化编译器](https://zh.wikipedia.org/w/index.php?title=优化编译器&action=edit&redlink=1)，支持各种[编程语言](https://zh.wikipedia.org/wiki/編程語言)、[操作系统](https://zh.wikipedia.org/wiki/操作系统)、[计算机系统结构](https://zh.wikipedia.org/wiki/计算机系统结构)。该编译器是以[GPL](https://zh.wikipedia.org/wiki/GPL)及[LGPL](https://zh.wikipedia.org/wiki/LGPL)许可证所发行的[自由软体](https://zh.wikipedia.org/wiki/自由軟體)，也是[GNU计划](https://zh.wikipedia.org/wiki/GNU計劃)的关键部分，还是[GNU工具链](https://zh.wikipedia.org/wiki/GNU工具链)的主要组成部份之一。GCC（特别是其中的C语言编译器）也常被认为是跨平台编译器的事实标准。1985年由[理查德·马修·斯托曼](https://zh.wikipedia.org/wiki/理查德·马修·斯托曼)开始发展，现在由[自由软体基金会](https://zh.wikipedia.org/wiki/自由軟體基金會)负责维护工作。截至2019年，GCC大约有1500万行代码，是现存最大的自由程序之一。[[3\]](https://zh.wikipedia.org/zh-hans/GCC#cite_note-loc-3) 它在自由软件的发展中发挥了重要作用，不仅是一个工具，还是一个典例。

原名为**GNU C语言编译器**（**GNU C Compiler**），因为它原本只能处理[C语言](https://zh.wikipedia.org/wiki/C語言)。同年12月，新的GCC编译器可以编译[C++](https://zh.wikipedia.org/wiki/C%2B%2B)语言。后来又为[Fortran](https://zh.wikipedia.org/wiki/Fortran)、[Pascal](https://zh.wikipedia.org/wiki/Pascal_(程式語言))、[Objective-C](https://zh.wikipedia.org/wiki/Objective-C)、[Java](https://zh.wikipedia.org/wiki/Java)、[Ada](https://zh.wikipedia.org/wiki/Ada)，[Go](https://zh.wikipedia.org/wiki/Go)等其他语言开发了前端。C和C++编译器也支持[OpenMP](https://zh.wikipedia.org/wiki/OpenMP)和[OpenACC](https://zh.wikipedia.org/wiki/OpenACC)规范。

GCC编译器已经被移植到比其他编译器更多的平台和指令集架构上，并被广泛部署在开发自由和专有软件的工具中。GCC还可用于许多嵌入式系统，包括基于[ARM](https://zh.wikipedia.org/wiki/ARM架構)和[Power ISA](https://zh.wikipedia.org/w/index.php?title=Power_ISA&action=edit&redlink=1)的芯片。

GCC不仅是GNU操作系统的官方编译器，还是许多类UNIX系统和Linux发行版的标准编译器。BSD家族中的大部分操作系统也在GCC发布之后转用GCC；不过FreeBSD、OpenBSD和Apple macOS已经转向了Clang编译器[[4\]](https://zh.wikipedia.org/zh-hans/GCC#cite_note-4)，主要是因为许可问题。[[5\]](https://zh.wikipedia.org/zh-hans/GCC#cite_note-5)[[6\]](https://zh.wikipedia.org/zh-hans/GCC#cite_note-6)[[7\]](https://zh.wikipedia.org/zh-hans/GCC#cite_note-7)GCC也可以编译[Windows](https://zh.wikipedia.org/wiki/Microsoft_Windows)、[Android](https://zh.wikipedia.org/wiki/Android)、[iOS](https://zh.wikipedia.org/wiki/IOS)、[Solaris](https://zh.wikipedia.org/wiki/Solaris)、[HP-UX](https://zh.wikipedia.org/wiki/HP-UX)、[IBM AIX](https://zh.wikipedia.org/wiki/IBM_AIX)和[DOS](https://zh.wikipedia.org/wiki/DOS)系统的代码。GCC原本用C开发，后来因为[LLVM](https://zh.wikipedia.org/wiki/LLVM)、[Clang](https://zh.wikipedia.org/wiki/Clang)的崛起，它更快地将开发语言转换为C++。许多C的爱好者在对C++一知半解的情况下主观认定C++的性能一定会输给C，但是Ian Lance Taylor给出了不同的意见，并表明C++不但性能不输给C，而且能设计出更好，更容易维护的程式[[8\]](https://zh.wikipedia.org/zh-hans/GCC#cite_note-8)[[9\]](https://zh.wikipedia.org/zh-hans/GCC#cite_note-9)。

## 二、一个完整的链接文件

STM32F103ZETx_FLASH.ld 文件完整内容如下：

```assembly
/* Entry Point */
ENTRY(Reset_Handler)

/* Highest address of the user mode stack */
_estack = ORIGIN(RAM) + LENGTH(RAM);    /* end of RAM */
/* Generate a link error if heap and stack don't fit into RAM */
_Min_Heap_Size = 0x200;      /* required amount of heap  */
_Min_Stack_Size = 0x400; /* required amount of stack */

/* Specify the memory areas */
MEMORY
{
RAM (xrw)      : ORIGIN = 0x20000000, LENGTH = 64K
FLASH (rx)      : ORIGIN = 0x8000000, LENGTH = 512K
}

/* Define output sections */
SECTIONS
{
  /* The startup code goes first into FLASH */
  .isr_vector :
  {
    . = ALIGN(4);
    KEEP(*(.isr_vector)) /* Startup code */
    . = ALIGN(4);
  } >FLASH

  /* The program code and other data goes into FLASH */
  .text :
  {
    . = ALIGN(4);
    *(.text)           /* .text sections (code) */
    *(.text*)          /* .text* sections (code) */
    *(.glue_7)         /* glue arm to thumb code */
    *(.glue_7t)        /* glue thumb to arm code */
    *(.eh_frame)

    KEEP (*(.init))
    KEEP (*(.fini))

    . = ALIGN(4);
    _etext = .;        /* define a global symbols at end of code */
  } >FLASH

  /* Constant data goes into FLASH */
  .rodata :
  {
    . = ALIGN(4);
    *(.rodata)         /* .rodata sections (constants, strings, etc.) */
    *(.rodata*)        /* .rodata* sections (constants, strings, etc.) */
    . = ALIGN(4);
  } >FLASH

  .ARM.extab   : { *(.ARM.extab* .gnu.linkonce.armextab.*) } >FLASH
  .ARM : {
    __exidx_start = .;
    *(.ARM.exidx*)
    __exidx_end = .;
  } >FLASH

  .preinit_array     :
  {
    PROVIDE_HIDDEN (__preinit_array_start = .);
    KEEP (*(.preinit_array*))
    PROVIDE_HIDDEN (__preinit_array_end = .);
  } >FLASH
  .init_array :
  {
    PROVIDE_HIDDEN (__init_array_start = .);
    KEEP (*(SORT(.init_array.*)))
    KEEP (*(.init_array*))
    PROVIDE_HIDDEN (__init_array_end = .);
  } >FLASH
  .fini_array :
  {
    PROVIDE_HIDDEN (__fini_array_start = .);
    KEEP (*(SORT(.fini_array.*)))
    KEEP (*(.fini_array*))
    PROVIDE_HIDDEN (__fini_array_end = .);
  } >FLASH

  /* used by the startup to initialize data */
  _sidata = LOADADDR(.data);

  /* Initialized data sections goes into RAM, load LMA copy after code */
  .data : 
  {
    . = ALIGN(4);
    _sdata = .;        /* create a global symbol at data start */
    *(.data)           /* .data sections */
    *(.data*)          /* .data* sections */

    . = ALIGN(4);
    _edata = .;        /* define a global symbol at data end */
  } >RAM AT> FLASH

  
  /* Uninitialized data section */
  . = ALIGN(4);
  .bss :
  {
    /* This is used by the startup in order to initialize the .bss secion */
    _sbss = .;         /* define a global symbol at bss start */
    __bss_start__ = _sbss;
    *(.bss)
    *(.bss*)
    *(COMMON)

    . = ALIGN(4);
    _ebss = .;         /* define a global symbol at bss end */
    __bss_end__ = _ebss;
  } >RAM

  /* User_heap_stack section, used to check that there is enough RAM left */
  ._user_heap_stack :
  {
    . = ALIGN(8);
    PROVIDE ( end = . );
    PROVIDE ( _end = . );
    . = . + _Min_Heap_Size;
    . = . + _Min_Stack_Size;
    . = ALIGN(8);
  } >RAM

  

  /* Remove information from the standard libraries */
  /DISCARD/ :
  {
    libc.a ( * )
    libm.a ( * )
    libgcc.a ( * )
  }

  .ARM.attributes 0 : { *(.ARM.attributes) }
}
```

## 三、各部分说明

### 1. 入口与堆栈

```assembly
/* Entry Point */
ENTRY(Reset_Handler)

/* Highest address of the user mode stack */
_estack = ORIGIN(RAM) + LENGTH(RAM);    /* end of RAM */
/* Generate a link error if heap and stack don't fit into RAM */
_Min_Heap_Size = 0x200;      /* required amount of heap  */
_Min_Stack_Size = 0x400; /* required amount of stack */
```

（1）第2行：指定入口地址。

（2）第5行：RAM的结束地址

（3）第7、8行：指定堆的大小和栈的大小分别为0x200和0x400。

### 2. 内存布局

#### 2.1 MEMORY

```assembly
MEMORY
{
　　<name> [(<attr>)] : ORIGIN = <origin>, LENGTH = <len>
　　...
}
```

（1）MEMORY关键字用于描述一个MCU ROM和RAM的内存地址分布（Memory Map），MEMORY中所做的内存描述主要用于SECTIONS中LMA和VMA的定义。

（2）name ：是所要定义的内存区域的名字。

（3）attr ：是可选的，并不重要，具体用法可参考GNU Linker的语法说明。

（4）origin ：是其起始地址。

（5）len ：为内存区域的大小，MEMORY语法中可以使用如K、M和G这样的内存单位。

【注意】ORIGIN可以写为org，而LENGTH可以写为l。

#### 2.2 实例分析

```assembly
/* Specify the memory areas */
MEMORY
{
RAM (xrw)      : ORIGIN = 0x20000000, LENGTH = 64K
FLASH (rx)      : ORIGIN = 0x8000000, LENGTH = 512K
}
```

这一部分给出地址的划分区间。

（1）RAM和FLASH表示内存名称；

（2）后边的括号表示权限（x:可运行；r:可读；w:可写）；

（3）ORIGIN表示起始地址，LENGTH表示这段内存区域的长度。可以看到这里RAM是可运行可读可写，而FLASH只可运行可读。我们知道STM32的FLASH是可以写的，但这里的权限只针对链接脚本，并不代表代码执行。

我们可以在这里增加一个由malloc使用的MALLOC段，放在外部SRAM上，地址0x68000000：

```assembly
/* Specify the memory areas */
MEMORY
{
RAM (xrw)      : ORIGIN = 0x20000000, LENGTH = 64K
FLASH (rx)     : ORIGIN = 0x8000000, LENGTH = 512K
MALLOC(rw)     : ORIGIN = 0x68000000, LENGTH = 512K
}
```

### 3. 段的定义

#### 3.1 SECTIONS

##### 3.1.1 框架

```assembly
SECTIONS
{
　　<sections−command>
　　<sections−command>
　　...
}
```

（1）SECTIONS关键字用于定义output section（输出段）的相应input section（输入段）、LMA和VMA，是整个连接脚本中最为重要的部分。注：output section是实际存储在内存中的“段”，而input section是其构成成员，如.data为数据段，由所有全局变量构成（默认情况下）；.text为代码段，由所有函数构成（默认情况下）。

##### 3.1.2 command

主要的部分是 sections−command ，SECTIONS{ }只是属于框架。 sections−command 的语法如下：

```assembly
section [address] [(type)] :
[AT(lma)]
[ALIGN(section_align) | ALIGN_WITH_INPUT]
[SUBALIGN(subsection_align)]
[constraint]
{
    output-section-command
    output-section-command
    ...
} [>region] [AT>lma_region] [:phdr :phdr ...] [=fillexp] [,]

```

我们从使用的角度来讲解其语法：（假设有一个全局变量myData，我们用#pragma section命令将其定义为.myData段（input section））

（1）我们首先可以定义output section的名字，随便什么都可以，比如.my_data；

（2）然后我们可以定义其构成成员，*(.myData)；

（3）接下来我们就要指定 .my_data 的LMA和VMA了，有4种方法：

```assembly
[<address>] + [AT(<lma>)]

[<address>] + [AT><lma region>]

[><region>] + [AT><lma region>]

[><region>] + [AT(<lma>)]
```

但是要注意这些用法的不同：`[<address>]`和 `[AT(<lma>)]`必须指定具体的地址，而`[><region>]` 和`[AT> <lma region>]`只需指定内存空间，具体地址紧接着上一个output section的末尾地址。

经过以上步骤，我们得出如下section定义：（这里只列出2种）

```assembly
SECTIONS
{
　　.my_data ( 0xD0004000 ) : AT ( 0x80000020 )
　　{
　　　　*(.myData)
　　}
　　...
}
/* 或者 */
SECTIONS
{
　　.my_data :
　　{
　　　　*(.myData)
　　} > ram AT> rom
　　...

}
```

#### 3.2 段的作用

```assembly
/* Define output sections */
SECTIONS
{
 /* 中间部分省略...*/
  .text :
  {
    . = ALIGN(4);
    *(.text)           /* .text sections (code) */
    *(.text*)          /* .text* sections (code) */
    *(.glue_7)         /* glue arm to thumb code */
    *(.glue_7t)        /* glue thumb to arm code */
    *(.eh_frame)

    KEEP (*(.init))
    KEEP (*(.fini))

    . = ALIGN(4);
    _etext = .;        /* define a global symbols at end of code */
  } >FLASH
  /* 中间部分省略...*/
}
```

这里就是链接脚本的核心功能，我们先不考虑每个段的功能，先了解一下链接脚本到底用来干什么。因为一个工程内可能有多个.c文件，比如代码里面一共3个文件：分别是 main.c 、usart.c 、 start.s 。很明显一个主程序，一个串口驱动，一个启动文件。在实际编译中，会把它们分别编译为 main.o 、usart.o 、 start.o ，假如每个.o文件中都包含.text、.data、.bss段，但是我们知道，程序最后烧入MCU是只有一个文件，这里就涉及到段的合并，也就是上面的命令所实现的功能，把每个.o文件中的相同段合一。

-  一般的程序中包含常见的几个段：text(存放程序)，rodata(存放被初始化的数据)，data(表示初始化不为0的变量)，bss(表示初始化值为默认的全局变量)。
-  text，rodata放在flash中，而data中的初始化值作为rodata放在flash中，变量在ram中占有空间，bss占ram空间。

#### 3.2 isr_vector

```assembly
  /* The startup code goes first into FLASH */
  .isr_vector :
  {
    . = ALIGN(4);
    KEEP(*(.isr_vector)) /* Startup code */
    . = ALIGN(4);
  } >FLASH
```

这一部分表示中断向量表被链接到段 .isr_vector 内。

（1）点（ . ）  ：表示当前虚拟内存地址(location counter)

（2）ALIGN(4) ：表示四字节对齐。

（3）KEEP ：这个命令来保存所有文件中的 .isr_vector 内容，即使它们没有被调用。也就是在保存中断向量前做四字节对齐，保存后做四字节对齐。

（3）>FLASH ：内容存在上面MEMORY中定义的FLASH中。

#### 3.3 text

```assembly
  /* The program code and other data goes into FLASH */
  .text :
  {
    . = ALIGN(4);
    *(.text)           /* .text sections (code) */
    *(.text*)          /* .text* sections (code) 所有代码段*/
    *(.glue_7)         /* glue arm to thumb code ARM与THUMB相互调用生成的段 */
    *(.glue_7t)        /* glue thumb to arm code ARM与THUMB相互调用生成的段*/
    *(.eh_frame)       /* 用于链接异常生成的段 */

    KEEP (*(.init))    /* 构造析构相关 */
    KEEP (*(.fini))    /* 构造析构相关 */

    . = ALIGN(4);
    _etext = .;        /* define a global symbols at end of code 把当前虚拟地址赋值给_etext，这是一个全局变量 */
  } >FLASH
```

第一个冒号左边的.text就是合并后的.text段，它是由符合花括号内规则的所有内容合并得到的，在刚才的例子里就是 main.o 、usart.o 、 start.o 中的.text段。\* 号代表通配符，这里它没有前缀和后缀，也没有 \[ \] 内容修饰，所以它代表所有匹配文件。

-  . = ALIGN(4);  ：是指4字节对齐。
-  **.** ：小数点表示当前的地址位置。
-  eh_frame ：段可以自定义，由于编译obj过程中不会生成用户自定义的段，因此在源码中需要指定需要特殊处理的段。
-  结尾的 >FLASH指上面花括号内的内容都放在第二部分中定义的FLASH空间中。

剩下的暂时就不说了，详细的语法结构，我们可以看[ld.pdf (sourceware.org)](https://sourceware.org/binutils/docs/ld.pdf)的3.6 SECTIONS Command一节，有超级详细的说明。

## 四、多个链接脚本

我们的工程中只能有一个链接脚本吗？一开始我以为只能有一个，后来发现，其实可以有多个的，最终他们都会汇集到一起。比如，后边我们学习SRAM的时候，可能会使用链接脚本来定义一个段，然后预存数组到指定的地址。我们直接在STM32CubeMX生成的链接脚本中添加也是没问题的，但是就一个坏处，那就是每次STM32CubeMX更新工程的时候，这个脚本都会重新生成，我们添加的东西也都不复存在，所以我们可以自己新建一个链接脚本，然后在编译的时候一起编译就好啦。

### 1. 新建链接脚本 mine.ld

```assembly
SECTIONS
{
  .sram :
  {
    . = ALIGN(4);
    __SRAM_SYMBOLS = .;       /* create a global symbol at ccmram start */
    *(.sram)
    *(.sram*)
    
    . = ALIGN(4);
    __SRAM_SYMBOLS = .;       /* create a global symbol at ccmram end */
  } >SRAM AT> FLASH
}
```

### 2. 修改Makefile

我们需要把我们自己的链接脚本也添加到Makefile中：

```Makefile
#######################################
# LDFLAGS
#######################################
# link script
LDSCRIPT = STM32F103ZETx_FLASH.ld mine.ld

```

这样我们那就不用担心更新工程的时候把我们添加的内容清理掉啦。
