---
title: LV025-FATFS中自定义的一些函数
date: 2025-09-27 11:14:30
icon: famicons:logo-markdown
permalink: /sdoc/advanced-chapter/file-system/126b09511d060b54b7d725e9
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
  detailDate: 2025-09-27 11:14:30.181
  fulluuid: 4b7d725e9ba54c78945189a9341e3b34
  useduuid: 4b7d725e9
---

<!-- more -->

最终的代码可以看这里：[STM32F103-Prj: STM32学习使用（STM32CubeMX+Makefile+VScode+J-Flash） (gitee.com)](https://gitee.com/sumumm/stm32f103-prj)

## 一、文件系统结构体定义

为了方便管理文件系统，定义一个结构体：

```c
typedef struct __ex_fatfs
{
    FATFS *fs[FF_VOLUMES]; // 逻辑磁盘工作区.
    BYTE *work;  // 挂载的时候用
    FIL *file;             // 文件1
    FIL *ftemp;            // 文件2
    UINT br;               // 读指针
    UINT bw;               // 写指针
    FILINFO fileinfo;      // 文件信息
    DIR dir;               // 目录
} EX_FATFS_PARAM;
```

## 二、申请内存

```c
/**
  * @brief  为文件系统所用变量申请内存
  * @note   
  * @param  
  * @retval 0，申请成功，-1，申请失败
  */
int8_t exf_init(void)
{
    uint8_t i;
    for (i = 0; i < FF_VOLUMES; i++)
    {
        exFatfsParam.fs[i] = (FATFS *)pub_malloc(SRAMIN, sizeof(FATFS)); // 为磁盘i工作区申请内存
        if (!exFatfsParam.fs[i])
            break;
    }
    exFatfsParam.file = (FIL *)pub_malloc(SRAMEX, sizeof(FIL));   // 为file申请内存
    exFatfsParam.ftemp = (FIL *)pub_malloc(SRAMEX, sizeof(FIL));  // 为ftemp申请内存
    exFatfsParam.work = (uint8_t *)pub_malloc(SRAMEX, FF_MAX_SS); // 为work申请内存
    if (i == FF_VOLUMES && exFatfsParam.file && exFatfsParam.ftemp && exFatfsParam.work)
        return 0; // 申请有一个失败,即失败.
    else
        return -1;
}
```

### 三、自定义函数 

### 1.  获取磁盘容量

```c
/**
  * @brief  得到磁盘剩余容量
  * @note   好像是去掉了FatFs自身占据的空间
  * @param  drv 磁盘编号("0:"/"1:")
  * @param  total 总容量 （单位KB）
  * @param  free 剩余容量 （单位KB）
  * @retval 0,正常.其他,错误代码
  */
uint8_t exf_getfree(uint8_t *drv, uint32_t *total, uint32_t *free)
{
    FATFS *fs1;
    uint8_t res;
    uint32_t fre_clust = 0, fre_sect = 0, tot_sect = 0;
    // 得到磁盘信息及空闲簇数量
    res = (uint32_t)f_getfree((const TCHAR *)drv, (DWORD *)&fre_clust, &fs1);
    if (res == 0)
    {
        tot_sect = (fs1->n_fatent - 2) * fs1->csize; // 得到总扇区数
        fre_sect = fre_clust * fs1->csize;           // 得到空闲扇区数
		//printf("fs1->n_fatent %d, fs1->csize %d, tot_sect %d, fre_sect %d\r\n", fs1->n_fatent, fs1->csize, tot_sect, fre_sect);
#if FF_MAX_SS != 512                                 // 扇区大小不是512字节,则转换为512字节
        tot_sect *= fs1->ssize / 512;
        fre_sect *= fs1->ssize / 512;
#endif
        *total = tot_sect >> 1; // 单位为KB
        *free = fre_sect >> 1;  // 单位为KB
    }
    return res;
}
```
