import{_ as n,c as a,o as e,b0 as p}from"./chunks/framework.C5ev1SXp.js";const m=JSON.parse('{"title":"LV040-LD链接脚本","description":null,"frontmatter":{"title":"LV040-LD链接脚本","date":"2025-09-20T15:38:28.000Z","icon":"famicons:logo-markdown","permalink":"/sdoc/dev-tool/keil/126b08e6f2e40a653e71bc02","index":true,"tags":null,"categories":null,"copyright":false,"keywords":null,"cover":null,"comments":null,"mathjax":null,"top":null,"description":null,"tdoc":{"detailDate":"2025-09-20T15:38:28.166Z","fulluuid":"53e71bc02dd346aeac5749700b205317","useduuid":"53e71bc02"}},"headers":[],"relativePath":"sdoc/dev-tool/keil/126b08e6f2e40a653e71bc02.md","filePath":"sdoc/01-开发工具/02-STM32Cube/LV015-LD链接脚本.md","lastUpdated":1758153691000}'),l={name:"sdoc/dev-tool/keil/126b08e6f2e40a653e71bc02.md"};function r(i,s,t,c,b,o){return e(),a("div",null,[...s[0]||(s[0]=[p(`<h1 id="lv040-ld链接脚本" tabindex="-1">LV040-LD链接脚本 <a class="header-anchor" href="#lv040-ld链接脚本" aria-label="Permalink to &quot;LV040-LD链接脚本&quot;">​</a></h1><p>这篇笔记主要是STM32CubeMX软件生成的STM32F103ZETx_FLASH.ld链接文件的学习笔记。这篇笔记按照顺序从上到下分析STM32F103ZETx_FLASH.ld文件。关于GNU链接脚本的详细语法我们可以参考这里：<a href="https://sourceware.org/binutils/docs/" target="_blank" rel="noreferrer">Documentation for binutils 2.40 (sourceware.org)</a>，这里好像还有在线的文档。**【注意】**生成Makefile文件的话，链接脚本是自动生成的，并且每一次重新生成的时候，<strong>链接脚本将会重新生成</strong>，也就是说，若是我们修改了链接脚本内容的话，只要我们通过STM32CubeMX更新工程，我们修改的部分都会被删除。</p><h2 id="一、参考资料" tabindex="-1">一、参考资料 <a class="header-anchor" href="#一、参考资料" aria-label="Permalink to &quot;一、参考资料&quot;">​</a></h2><p>关于链接脚本，其实在GNU的官方文档中是有相关的内容的。</p><ul><li>GNU官网：<a href="https://www.gnu.org/" target="_blank" rel="noreferrer">GNU 操作系统和自由软件运动</a></li><li>Documentation for binutils 2.40 ：<a href="https://sourceware.org/binutils/docs/" target="_blank" rel="noreferrer">Documentation for binutils 2.40 (sourceware.org)</a></li><li>Linker (ld) 在线文档：<a href="https://sourceware.org/binutils/docs/ld.pdf" target="_blank" rel="noreferrer">ld.pdf (sourceware.org)</a></li></ul><p>GNU与GCC什么关系？这里简单了解一下吧，至少知道为什么我们找链接脚本的语法要到GNU的官网去，我查了下维基百科，是这样说的：</p><p><strong>GNU编译器套装</strong>（英语：<strong>GNU Compiler Collection</strong>，缩写为<strong>GCC</strong>）是<a href="https://zh.wikipedia.org/wiki/GNU%E8%A8%88%E5%8A%83" target="_blank" rel="noreferrer">GNU计划</a>制作的一种<a href="https://zh.wikipedia.org/w/index.php?title=%E4%BC%98%E5%8C%96%E7%BC%96%E8%AF%91%E5%99%A8&amp;action=edit&amp;redlink=1" target="_blank" rel="noreferrer">优化编译器</a>，支持各种<a href="https://zh.wikipedia.org/wiki/%E7%B7%A8%E7%A8%8B%E8%AA%9E%E8%A8%80" target="_blank" rel="noreferrer">编程语言</a>、<a href="https://zh.wikipedia.org/wiki/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F" target="_blank" rel="noreferrer">操作系统</a>、<a href="https://zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%B3%BB%E7%BB%9F%E7%BB%93%E6%9E%84" target="_blank" rel="noreferrer">计算机系统结构</a>。该编译器是以<a href="https://zh.wikipedia.org/wiki/GPL" target="_blank" rel="noreferrer">GPL</a>及<a href="https://zh.wikipedia.org/wiki/LGPL" target="_blank" rel="noreferrer">LGPL</a>许可证所发行的<a href="https://zh.wikipedia.org/wiki/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94" target="_blank" rel="noreferrer">自由软体</a>，也是<a href="https://zh.wikipedia.org/wiki/GNU%E8%A8%88%E5%8A%83" target="_blank" rel="noreferrer">GNU计划</a>的关键部分，还是<a href="https://zh.wikipedia.org/wiki/GNU%E5%B7%A5%E5%85%B7%E9%93%BE" target="_blank" rel="noreferrer">GNU工具链</a>的主要组成部份之一。GCC（特别是其中的C语言编译器）也常被认为是跨平台编译器的事实标准。1985年由<a href="https://zh.wikipedia.org/wiki/%E7%90%86%E6%9F%A5%E5%BE%B7%C2%B7%E9%A9%AC%E4%BF%AE%C2%B7%E6%96%AF%E6%89%98%E6%9B%BC" target="_blank" rel="noreferrer">理查德·马修·斯托曼</a>开始发展，现在由<a href="https://zh.wikipedia.org/wiki/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94%E5%9F%BA%E9%87%91%E6%9C%83" target="_blank" rel="noreferrer">自由软体基金会</a>负责维护工作。截至2019年，GCC大约有1500万行代码，是现存最大的自由程序之一。[<a href="https://zh.wikipedia.org/zh-hans/GCC#cite_note-loc-3" target="_blank" rel="noreferrer">3]</a> 它在自由软件的发展中发挥了重要作用，不仅是一个工具，还是一个典例。</p><p>原名为<strong>GNU C语言编译器</strong>（<strong>GNU C Compiler</strong>），因为它原本只能处理<a href="https://zh.wikipedia.org/wiki/C%E8%AA%9E%E8%A8%80" target="_blank" rel="noreferrer">C语言</a>。同年12月，新的GCC编译器可以编译<a href="https://zh.wikipedia.org/wiki/C%2B%2B" target="_blank" rel="noreferrer">C++</a>语言。后来又为<a href="https://zh.wikipedia.org/wiki/Fortran" target="_blank" rel="noreferrer">Fortran</a>、<a href="https://zh.wikipedia.org/wiki/Pascal_(%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80)" target="_blank" rel="noreferrer">Pascal</a>、<a href="https://zh.wikipedia.org/wiki/Objective-C" target="_blank" rel="noreferrer">Objective-C</a>、<a href="https://zh.wikipedia.org/wiki/Java" target="_blank" rel="noreferrer">Java</a>、<a href="https://zh.wikipedia.org/wiki/Ada" target="_blank" rel="noreferrer">Ada</a>，<a href="https://zh.wikipedia.org/wiki/Go" target="_blank" rel="noreferrer">Go</a>等其他语言开发了前端。C和C++编译器也支持<a href="https://zh.wikipedia.org/wiki/OpenMP" target="_blank" rel="noreferrer">OpenMP</a>和<a href="https://zh.wikipedia.org/wiki/OpenACC" target="_blank" rel="noreferrer">OpenACC</a>规范。</p><p>GCC编译器已经被移植到比其他编译器更多的平台和指令集架构上，并被广泛部署在开发自由和专有软件的工具中。GCC还可用于许多嵌入式系统，包括基于<a href="https://zh.wikipedia.org/wiki/ARM%E6%9E%B6%E6%A7%8B" target="_blank" rel="noreferrer">ARM</a>和<a href="https://zh.wikipedia.org/w/index.php?title=Power_ISA&amp;action=edit&amp;redlink=1" target="_blank" rel="noreferrer">Power ISA</a>的芯片。</p><p>GCC不仅是GNU操作系统的官方编译器，还是许多类UNIX系统和Linux发行版的标准编译器。BSD家族中的大部分操作系统也在GCC发布之后转用GCC；不过FreeBSD、OpenBSD和Apple macOS已经转向了Clang编译器[<a href="https://zh.wikipedia.org/zh-hans/GCC#cite_note-4" target="_blank" rel="noreferrer">4]</a>，主要是因为许可问题。[<a href="https://zh.wikipedia.org/zh-hans/GCC#cite_note-5" target="_blank" rel="noreferrer">5]</a>[<a href="https://zh.wikipedia.org/zh-hans/GCC#cite_note-6" target="_blank" rel="noreferrer">6]</a>[<a href="https://zh.wikipedia.org/zh-hans/GCC#cite_note-7" target="_blank" rel="noreferrer">7]</a>GCC也可以编译<a href="https://zh.wikipedia.org/wiki/Microsoft_Windows" target="_blank" rel="noreferrer">Windows</a>、<a href="https://zh.wikipedia.org/wiki/Android" target="_blank" rel="noreferrer">Android</a>、<a href="https://zh.wikipedia.org/wiki/IOS" target="_blank" rel="noreferrer">iOS</a>、<a href="https://zh.wikipedia.org/wiki/Solaris" target="_blank" rel="noreferrer">Solaris</a>、<a href="https://zh.wikipedia.org/wiki/HP-UX" target="_blank" rel="noreferrer">HP-UX</a>、<a href="https://zh.wikipedia.org/wiki/IBM_AIX" target="_blank" rel="noreferrer">IBM AIX</a>和<a href="https://zh.wikipedia.org/wiki/DOS" target="_blank" rel="noreferrer">DOS</a>系统的代码。GCC原本用C开发，后来因为<a href="https://zh.wikipedia.org/wiki/LLVM" target="_blank" rel="noreferrer">LLVM</a>、<a href="https://zh.wikipedia.org/wiki/Clang" target="_blank" rel="noreferrer">Clang</a>的崛起，它更快地将开发语言转换为C++。许多C的爱好者在对C++一知半解的情况下主观认定C++的性能一定会输给C，但是Ian Lance Taylor给出了不同的意见，并表明C++不但性能不输给C，而且能设计出更好，更容易维护的程式[<a href="https://zh.wikipedia.org/zh-hans/GCC#cite_note-8" target="_blank" rel="noreferrer">8]</a>[<a href="https://zh.wikipedia.org/zh-hans/GCC#cite_note-9" target="_blank" rel="noreferrer">9]</a>。</p><h2 id="二、一个完整的链接文件" tabindex="-1">二、一个完整的链接文件 <a class="header-anchor" href="#二、一个完整的链接文件" aria-label="Permalink to &quot;二、一个完整的链接文件&quot;">​</a></h2><p>STM32F103ZETx_FLASH.ld 文件完整内容如下：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Entry Point */</span></span>
<span class="line"><span>ENTRY(Reset_Handler)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Highest address of the user mode stack */</span></span>
<span class="line"><span>_estack = ORIGIN(RAM) + LENGTH(RAM);    /* end of RAM */</span></span>
<span class="line"><span>/* Generate a link error if heap and stack don&#39;t fit into RAM */</span></span>
<span class="line"><span>_Min_Heap_Size = 0x200;      /* required amount of heap  */</span></span>
<span class="line"><span>_Min_Stack_Size = 0x400; /* required amount of stack */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Specify the memory areas */</span></span>
<span class="line"><span>MEMORY</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>RAM (xrw)      : ORIGIN = 0x20000000, LENGTH = 64K</span></span>
<span class="line"><span>FLASH (rx)      : ORIGIN = 0x8000000, LENGTH = 512K</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Define output sections */</span></span>
<span class="line"><span>SECTIONS</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  /* The startup code goes first into FLASH */</span></span>
<span class="line"><span>  .isr_vector :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    KEEP(*(.isr_vector)) /* Startup code */</span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>  } &gt;FLASH</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* The program code and other data goes into FLASH */</span></span>
<span class="line"><span>  .text :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    *(.text)           /* .text sections (code) */</span></span>
<span class="line"><span>    *(.text*)          /* .text* sections (code) */</span></span>
<span class="line"><span>    *(.glue_7)         /* glue arm to thumb code */</span></span>
<span class="line"><span>    *(.glue_7t)        /* glue thumb to arm code */</span></span>
<span class="line"><span>    *(.eh_frame)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    KEEP (*(.init))</span></span>
<span class="line"><span>    KEEP (*(.fini))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    _etext = .;        /* define a global symbols at end of code */</span></span>
<span class="line"><span>  } &gt;FLASH</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* Constant data goes into FLASH */</span></span>
<span class="line"><span>  .rodata :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    *(.rodata)         /* .rodata sections (constants, strings, etc.) */</span></span>
<span class="line"><span>    *(.rodata*)        /* .rodata* sections (constants, strings, etc.) */</span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>  } &gt;FLASH</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  .ARM.extab   : { *(.ARM.extab* .gnu.linkonce.armextab.*) } &gt;FLASH</span></span>
<span class="line"><span>  .ARM : {</span></span>
<span class="line"><span>    __exidx_start = .;</span></span>
<span class="line"><span>    *(.ARM.exidx*)</span></span>
<span class="line"><span>    __exidx_end = .;</span></span>
<span class="line"><span>  } &gt;FLASH</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  .preinit_array     :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    PROVIDE_HIDDEN (__preinit_array_start = .);</span></span>
<span class="line"><span>    KEEP (*(.preinit_array*))</span></span>
<span class="line"><span>    PROVIDE_HIDDEN (__preinit_array_end = .);</span></span>
<span class="line"><span>  } &gt;FLASH</span></span>
<span class="line"><span>  .init_array :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    PROVIDE_HIDDEN (__init_array_start = .);</span></span>
<span class="line"><span>    KEEP (*(SORT(.init_array.*)))</span></span>
<span class="line"><span>    KEEP (*(.init_array*))</span></span>
<span class="line"><span>    PROVIDE_HIDDEN (__init_array_end = .);</span></span>
<span class="line"><span>  } &gt;FLASH</span></span>
<span class="line"><span>  .fini_array :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    PROVIDE_HIDDEN (__fini_array_start = .);</span></span>
<span class="line"><span>    KEEP (*(SORT(.fini_array.*)))</span></span>
<span class="line"><span>    KEEP (*(.fini_array*))</span></span>
<span class="line"><span>    PROVIDE_HIDDEN (__fini_array_end = .);</span></span>
<span class="line"><span>  } &gt;FLASH</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* used by the startup to initialize data */</span></span>
<span class="line"><span>  _sidata = LOADADDR(.data);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* Initialized data sections goes into RAM, load LMA copy after code */</span></span>
<span class="line"><span>  .data : </span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    _sdata = .;        /* create a global symbol at data start */</span></span>
<span class="line"><span>    *(.data)           /* .data sections */</span></span>
<span class="line"><span>    *(.data*)          /* .data* sections */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    _edata = .;        /* define a global symbol at data end */</span></span>
<span class="line"><span>  } &gt;RAM AT&gt; FLASH</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  /* Uninitialized data section */</span></span>
<span class="line"><span>  . = ALIGN(4);</span></span>
<span class="line"><span>  .bss :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    /* This is used by the startup in order to initialize the .bss secion */</span></span>
<span class="line"><span>    _sbss = .;         /* define a global symbol at bss start */</span></span>
<span class="line"><span>    __bss_start__ = _sbss;</span></span>
<span class="line"><span>    *(.bss)</span></span>
<span class="line"><span>    *(.bss*)</span></span>
<span class="line"><span>    *(COMMON)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    _ebss = .;         /* define a global symbol at bss end */</span></span>
<span class="line"><span>    __bss_end__ = _ebss;</span></span>
<span class="line"><span>  } &gt;RAM</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* User_heap_stack section, used to check that there is enough RAM left */</span></span>
<span class="line"><span>  ._user_heap_stack :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    . = ALIGN(8);</span></span>
<span class="line"><span>    PROVIDE ( end = . );</span></span>
<span class="line"><span>    PROVIDE ( _end = . );</span></span>
<span class="line"><span>    . = . + _Min_Heap_Size;</span></span>
<span class="line"><span>    . = . + _Min_Stack_Size;</span></span>
<span class="line"><span>    . = ALIGN(8);</span></span>
<span class="line"><span>  } &gt;RAM</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* Remove information from the standard libraries */</span></span>
<span class="line"><span>  /DISCARD/ :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    libc.a ( * )</span></span>
<span class="line"><span>    libm.a ( * )</span></span>
<span class="line"><span>    libgcc.a ( * )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  .ARM.attributes 0 : { *(.ARM.attributes) }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br></div></div><h2 id="三、各部分说明" tabindex="-1">三、各部分说明 <a class="header-anchor" href="#三、各部分说明" aria-label="Permalink to &quot;三、各部分说明&quot;">​</a></h2><h3 id="_1-入口与堆栈" tabindex="-1">1. 入口与堆栈 <a class="header-anchor" href="#_1-入口与堆栈" aria-label="Permalink to &quot;1. 入口与堆栈&quot;">​</a></h3><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Entry Point */</span></span>
<span class="line"><span>ENTRY(Reset_Handler)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Highest address of the user mode stack */</span></span>
<span class="line"><span>_estack = ORIGIN(RAM) + LENGTH(RAM);    /* end of RAM */</span></span>
<span class="line"><span>/* Generate a link error if heap and stack don&#39;t fit into RAM */</span></span>
<span class="line"><span>_Min_Heap_Size = 0x200;      /* required amount of heap  */</span></span>
<span class="line"><span>_Min_Stack_Size = 0x400; /* required amount of stack */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>（1）第2行：指定入口地址。</p><p>（2）第5行：RAM的结束地址</p><p>（3）第7、8行：指定堆的大小和栈的大小分别为0x200和0x400。</p><h3 id="_2-内存布局" tabindex="-1">2. 内存布局 <a class="header-anchor" href="#_2-内存布局" aria-label="Permalink to &quot;2. 内存布局&quot;">​</a></h3><h4 id="_2-1-memory" tabindex="-1">2.1 MEMORY <a class="header-anchor" href="#_2-1-memory" aria-label="Permalink to &quot;2.1 MEMORY&quot;">​</a></h4><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>MEMORY</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>　　&lt;name&gt; [(&lt;attr&gt;)] : ORIGIN = &lt;origin&gt;, LENGTH = &lt;len&gt;</span></span>
<span class="line"><span>　　...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>（1）MEMORY关键字用于描述一个MCU ROM和RAM的内存地址分布（Memory Map），MEMORY中所做的内存描述主要用于SECTIONS中LMA和VMA的定义。</p><p>（2）name ：是所要定义的内存区域的名字。</p><p>（3）attr ：是可选的，并不重要，具体用法可参考GNU Linker的语法说明。</p><p>（4）origin ：是其起始地址。</p><p>（5）len ：为内存区域的大小，MEMORY语法中可以使用如K、M和G这样的内存单位。</p><p>【注意】ORIGIN可以写为org，而LENGTH可以写为l。</p><h4 id="_2-2-实例分析" tabindex="-1">2.2 实例分析 <a class="header-anchor" href="#_2-2-实例分析" aria-label="Permalink to &quot;2.2 实例分析&quot;">​</a></h4><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Specify the memory areas */</span></span>
<span class="line"><span>MEMORY</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>RAM (xrw)      : ORIGIN = 0x20000000, LENGTH = 64K</span></span>
<span class="line"><span>FLASH (rx)      : ORIGIN = 0x8000000, LENGTH = 512K</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这一部分给出地址的划分区间。</p><p>（1）RAM和FLASH表示内存名称；</p><p>（2）后边的括号表示权限（x:可运行；r:可读；w:可写）；</p><p>（3）ORIGIN表示起始地址，LENGTH表示这段内存区域的长度。可以看到这里RAM是可运行可读可写，而FLASH只可运行可读。我们知道STM32的FLASH是可以写的，但这里的权限只针对链接脚本，并不代表代码执行。</p><p>我们可以在这里增加一个由malloc使用的MALLOC段，放在外部SRAM上，地址0x68000000：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Specify the memory areas */</span></span>
<span class="line"><span>MEMORY</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>RAM (xrw)      : ORIGIN = 0x20000000, LENGTH = 64K</span></span>
<span class="line"><span>FLASH (rx)     : ORIGIN = 0x8000000, LENGTH = 512K</span></span>
<span class="line"><span>MALLOC(rw)     : ORIGIN = 0x68000000, LENGTH = 512K</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="_3-段的定义" tabindex="-1">3. 段的定义 <a class="header-anchor" href="#_3-段的定义" aria-label="Permalink to &quot;3. 段的定义&quot;">​</a></h3><h4 id="_3-1-sections" tabindex="-1">3.1 SECTIONS <a class="header-anchor" href="#_3-1-sections" aria-label="Permalink to &quot;3.1 SECTIONS&quot;">​</a></h4><h5 id="_3-1-1-框架" tabindex="-1">3.1.1 框架 <a class="header-anchor" href="#_3-1-1-框架" aria-label="Permalink to &quot;3.1.1 框架&quot;">​</a></h5><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SECTIONS</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>　　&lt;sections−command&gt;</span></span>
<span class="line"><span>　　&lt;sections−command&gt;</span></span>
<span class="line"><span>　　...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>（1）SECTIONS关键字用于定义output section（输出段）的相应input section（输入段）、LMA和VMA，是整个连接脚本中最为重要的部分。注：output section是实际存储在内存中的“段”，而input section是其构成成员，如.data为数据段，由所有全局变量构成（默认情况下）；.text为代码段，由所有函数构成（默认情况下）。</p><h5 id="_3-1-2-command" tabindex="-1">3.1.2 command <a class="header-anchor" href="#_3-1-2-command" aria-label="Permalink to &quot;3.1.2 command&quot;">​</a></h5><p>主要的部分是 sections−command ，SECTIONS{ }只是属于框架。 sections−command 的语法如下：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>section [address] [(type)] :</span></span>
<span class="line"><span>[AT(lma)]</span></span>
<span class="line"><span>[ALIGN(section_align) | ALIGN_WITH_INPUT]</span></span>
<span class="line"><span>[SUBALIGN(subsection_align)]</span></span>
<span class="line"><span>[constraint]</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    output-section-command</span></span>
<span class="line"><span>    output-section-command</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>} [&gt;region] [AT&gt;lma_region] [:phdr :phdr ...] [=fillexp] [,]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>我们从使用的角度来讲解其语法：（假设有一个全局变量myData，我们用#pragma section命令将其定义为.myData段（input section））</p><p>（1）我们首先可以定义output section的名字，随便什么都可以，比如.my_data；</p><p>（2）然后我们可以定义其构成成员，*(.myData)；</p><p>（3）接下来我们就要指定 .my_data 的LMA和VMA了，有4种方法：</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[&lt;address&gt;] + [AT(&lt;lma&gt;)]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[&lt;address&gt;] + [AT&gt;&lt;lma region&gt;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[&gt;&lt;region&gt;] + [AT&gt;&lt;lma region&gt;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[&gt;&lt;region&gt;] + [AT(&lt;lma&gt;)]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>但是要注意这些用法的不同：<code>[&lt;address&gt;]</code>和 <code>[AT(&lt;lma&gt;)]</code>必须指定具体的地址，而<code>[&gt;&lt;region&gt;]</code> 和<code>[AT&gt; &lt;lma region&gt;]</code>只需指定内存空间，具体地址紧接着上一个output section的末尾地址。</p><p>经过以上步骤，我们得出如下section定义：（这里只列出2种）</p><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SECTIONS</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>　　.my_data ( 0xD0004000 ) : AT ( 0x80000020 )</span></span>
<span class="line"><span>　　{</span></span>
<span class="line"><span>　　　　*(.myData)</span></span>
<span class="line"><span>　　}</span></span>
<span class="line"><span>　　...</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* 或者 */</span></span>
<span class="line"><span>SECTIONS</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>　　.my_data :</span></span>
<span class="line"><span>　　{</span></span>
<span class="line"><span>　　　　*(.myData)</span></span>
<span class="line"><span>　　} &gt; ram AT&gt; rom</span></span>
<span class="line"><span>　　...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h4 id="_3-2-段的作用" tabindex="-1">3.2 段的作用 <a class="header-anchor" href="#_3-2-段的作用" aria-label="Permalink to &quot;3.2 段的作用&quot;">​</a></h4><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* Define output sections */</span></span>
<span class="line"><span>SECTIONS</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span> /* 中间部分省略...*/</span></span>
<span class="line"><span>  .text :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    *(.text)           /* .text sections (code) */</span></span>
<span class="line"><span>    *(.text*)          /* .text* sections (code) */</span></span>
<span class="line"><span>    *(.glue_7)         /* glue arm to thumb code */</span></span>
<span class="line"><span>    *(.glue_7t)        /* glue thumb to arm code */</span></span>
<span class="line"><span>    *(.eh_frame)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    KEEP (*(.init))</span></span>
<span class="line"><span>    KEEP (*(.fini))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    _etext = .;        /* define a global symbols at end of code */</span></span>
<span class="line"><span>  } &gt;FLASH</span></span>
<span class="line"><span>  /* 中间部分省略...*/</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>这里就是链接脚本的核心功能，我们先不考虑每个段的功能，先了解一下链接脚本到底用来干什么。因为一个工程内可能有多个.c文件，比如代码里面一共3个文件：分别是 main.c 、usart.c 、 start.s 。很明显一个主程序，一个串口驱动，一个启动文件。在实际编译中，会把它们分别编译为 main.o 、usart.o 、 start.o ，假如每个.o文件中都包含.text、.data、.bss段，但是我们知道，程序最后烧入MCU是只有一个文件，这里就涉及到段的合并，也就是上面的命令所实现的功能，把每个.o文件中的相同段合一。</p><ul><li>一般的程序中包含常见的几个段：text(存放程序)，rodata(存放被初始化的数据)，data(表示初始化不为0的变量)，bss(表示初始化值为默认的全局变量)。</li><li>text，rodata放在flash中，而data中的初始化值作为rodata放在flash中，变量在ram中占有空间，bss占ram空间。</li></ul><h4 id="_3-2-isr-vector" tabindex="-1">3.2 isr_vector <a class="header-anchor" href="#_3-2-isr-vector" aria-label="Permalink to &quot;3.2 isr_vector&quot;">​</a></h4><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  /* The startup code goes first into FLASH */</span></span>
<span class="line"><span>  .isr_vector :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    KEEP(*(.isr_vector)) /* Startup code */</span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>  } &gt;FLASH</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这一部分表示中断向量表被链接到段 .isr_vector 内。</p><p>（1）点（ . ） ：表示当前虚拟内存地址(location counter)</p><p>（2）ALIGN(4) ：表示四字节对齐。</p><p>（3）KEEP ：这个命令来保存所有文件中的 .isr_vector 内容，即使它们没有被调用。也就是在保存中断向量前做四字节对齐，保存后做四字节对齐。</p><p>（3）&gt;FLASH ：内容存在上面MEMORY中定义的FLASH中。</p><h4 id="_3-3-text" tabindex="-1">3.3 text <a class="header-anchor" href="#_3-3-text" aria-label="Permalink to &quot;3.3 text&quot;">​</a></h4><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  /* The program code and other data goes into FLASH */</span></span>
<span class="line"><span>  .text :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    *(.text)           /* .text sections (code) */</span></span>
<span class="line"><span>    *(.text*)          /* .text* sections (code) 所有代码段*/</span></span>
<span class="line"><span>    *(.glue_7)         /* glue arm to thumb code ARM与THUMB相互调用生成的段 */</span></span>
<span class="line"><span>    *(.glue_7t)        /* glue thumb to arm code ARM与THUMB相互调用生成的段*/</span></span>
<span class="line"><span>    *(.eh_frame)       /* 用于链接异常生成的段 */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    KEEP (*(.init))    /* 构造析构相关 */</span></span>
<span class="line"><span>    KEEP (*(.fini))    /* 构造析构相关 */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    _etext = .;        /* define a global symbols at end of code 把当前虚拟地址赋值给_etext，这是一个全局变量 */</span></span>
<span class="line"><span>  } &gt;FLASH</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>第一个冒号左边的.text就是合并后的.text段，它是由符合花括号内规则的所有内容合并得到的，在刚才的例子里就是 main.o 、usart.o 、 start.o 中的.text段。* 号代表通配符，这里它没有前缀和后缀，也没有 [ ] 内容修饰，所以它代表所有匹配文件。</p><ul><li>. = ALIGN(4); ：是指4字节对齐。</li><li><strong>.</strong> ：小数点表示当前的地址位置。</li><li>eh_frame ：段可以自定义，由于编译obj过程中不会生成用户自定义的段，因此在源码中需要指定需要特殊处理的段。</li><li>结尾的 &gt;FLASH指上面花括号内的内容都放在第二部分中定义的FLASH空间中。</li></ul><p>剩下的暂时就不说了，详细的语法结构，我们可以看<a href="https://sourceware.org/binutils/docs/ld.pdf" target="_blank" rel="noreferrer">ld.pdf (sourceware.org)</a>的3.6 SECTIONS Command一节，有超级详细的说明。</p><h2 id="四、多个链接脚本" tabindex="-1">四、多个链接脚本 <a class="header-anchor" href="#四、多个链接脚本" aria-label="Permalink to &quot;四、多个链接脚本&quot;">​</a></h2><p>我们的工程中只能有一个链接脚本吗？一开始我以为只能有一个，后来发现，其实可以有多个的，最终他们都会汇集到一起。比如，后边我们学习SRAM的时候，可能会使用链接脚本来定义一个段，然后预存数组到指定的地址。我们直接在STM32CubeMX生成的链接脚本中添加也是没问题的，但是就一个坏处，那就是每次STM32CubeMX更新工程的时候，这个脚本都会重新生成，我们添加的东西也都不复存在，所以我们可以自己新建一个链接脚本，然后在编译的时候一起编译就好啦。</p><h3 id="_1-新建链接脚本-mine-ld" tabindex="-1">1. 新建链接脚本 mine.ld <a class="header-anchor" href="#_1-新建链接脚本-mine-ld" aria-label="Permalink to &quot;1. 新建链接脚本 mine.ld&quot;">​</a></h3><div class="language-assembly vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SECTIONS</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  .sram :</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    __SRAM_SYMBOLS = .;       /* create a global symbol at ccmram start */</span></span>
<span class="line"><span>    *(.sram)</span></span>
<span class="line"><span>    *(.sram*)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    . = ALIGN(4);</span></span>
<span class="line"><span>    __SRAM_SYMBOLS = .;       /* create a global symbol at ccmram end */</span></span>
<span class="line"><span>  } &gt;SRAM AT&gt; FLASH</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_2-修改makefile" tabindex="-1">2. 修改Makefile <a class="header-anchor" href="#_2-修改makefile" aria-label="Permalink to &quot;2. 修改Makefile&quot;">​</a></h3><p>我们需要把我们自己的链接脚本也添加到Makefile中：</p><div class="language-Makefile vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">Makefile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#######################################</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># LDFLAGS</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#######################################</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># link script</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">LDSCRIPT = STM32F103ZETx_FLASH.ld mine.ld</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这样我们那就不用担心更新工程的时候把我们添加的内容清理掉啦。</p>`,76)])])}const d=n(l,[["render",r]]);export{m as __pageData,d as default};
