---
title: LV015-基于SD卡移植FATFS
date: 2025-09-27 11:10:24
icon: famicons:logo-markdown
permalink: /sdoc/advanced-chapter/file-system/126b09511b702501a47f120c
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
  detailDate: 2025-09-27 11:10:24.592
  fulluuid: 1a47f120cd8c41b6ab06d05da2ace352
  useduuid: 1a47f120c
---


<!-- more -->


我们先来看一下以SD卡为存储介质的FatFs文件系统的移植。另外就是，我后来移植的过程中，发现我们在使用STM32CubeMX配置SDIO的时候不要开SDIO和DMA中断，不然SD卡读写是有问题的，但是吧，移植好文件系统后，不知道为什么，怎么都跑不起来，具体是哪的影响还不清楚，后边知道了再补充。

## 一、底层读写

### 1. 初始化

首先我们需要初始化SD卡，这里还是使用STM32CubeMX来配置的SDIO，所以初始化就如下函数所示：

```c
void MX_SDIO_SD_Init(void);
```

**【函数说明】**这个函数是完成SDIO的初始化，也就完成了对SD卡的初始化。注意这里有两个坑，一个就是初始化的时候的总线宽度设置为1位，还有就是时钟频率，若通信失败，可以降低试一试。这个里边要注意时钟

### 2. 获取SD卡信息

这一步主要是为了看一下SD卡是否初始化成功，并且获取一些SD卡的信息，后边使用：

```c
HAL_SD_CardInfoTypeDef  SDCardInfo;                 //SD卡信息结构体
void show_sdcard_info(void)
{
	uint64_t CardCap;	//SD卡容量
	HAL_SD_CardCIDTypeDef SDCard_CID;

	/* 检测SD卡是否正常（处于数据传输模式的传输状态） */
    if(HAL_SD_GetCardState(&hsd) != HAL_SD_CARD_TRANSFER)
    {
        printf("SD card init fail!\r\n" );
		return;
    }
	printf("Initialize SD card successfully!\r\n");
	HAL_SD_GetCardCID(&hsd, &SDCard_CID);	//获取CID
	HAL_SD_GetCardInfo(&hsd, &SDCardInfo);  //获取SD卡信息
	switch(SDCardInfo.CardType)
	{
		case CARD_SDSC:
		{
			if(SDCardInfo.CardVersion == CARD_V1_X)
				printf("Card Type          :SDSC V1 \r\n");
			else if(SDCardInfo.CardVersion == CARD_V2_X)
				printf("Card Type          :SDSC V2 \r\n");
		}
		break;
		case CARD_SDHC_SDXC:
			printf("Card Type          :SDHC \r\n");
		break;
	}	
	CardCap=(uint64_t)(SDCardInfo.LogBlockNbr)*(uint64_t)(SDCardInfo.LogBlockSize);	//计算SD卡容量
  	printf("Card ManufacturerID:%d \r\n",SDCard_CID.ManufacturerID);				//制造商ID
 	printf("Card RCA           :%d \r\n",SDCardInfo.RelCardAdd);					//卡相对地址
	printf("LogBlockNbr        :%d \r\n",(uint32_t)(SDCardInfo.LogBlockNbr));		//显示逻辑块数量
	printf("LogBlockSize       :%d \r\n",(uint32_t)(SDCardInfo.LogBlockSize));		//显示逻辑块大小
	printf("Card Capacity      :%d MB\r\n",(uint32_t)(CardCap>>20));				//显示容量
 	printf("Card BlockSize     :%d \r\n\r\n",SDCardInfo.BlockSize);					//显示块大小
}
```

### 3. 读取数据

```c
/**
  * @brief  从SD卡读取数据
  * @note   
  * @param  buf 读数据缓存区
  * @param  sector 扇区地址
  * @param  cnt 扇区个数
  * @retval 返回错误状态;0,正常;其他,错误代码;
  */
uint8_t SD_ReadDisk(uint8_t *buf, uint32_t sector, uint32_t cnt)
{
    uint8_t sta = HAL_OK;
    uint32_t timeout = SD_TIMEOUT;
    long long lsector = sector;
    INTX_DISABLE(); // 关闭总中断(POLLING模式,严禁中断打断SDIO读写操作!!!)
    sta = HAL_SD_ReadBlocks(&hsd, (uint8_t *)buf, lsector, cnt, SD_TIMEOUT); // 多个sector的读操作

    // 等待SD卡读完
    while (SD_GetCardState() != SD_TRANSFER_OK)
    {
        if (timeout-- == 0)
        {
            sta = SD_TRANSFER_BUSY;
        }
    }
    INTX_ENABLE(); // 开启总中断
    return sta;
}
```

**【函数说明】**在指定地址开始读取指定长度的数据。

**【参数说明】**

- buf ：读数据缓存区
- sector ：扇区地址
- cnt ：扇区个数	

### 4.写入数据

```c
/**
  * @brief  向SD卡写入数据
  * @note   
  * @param  buf 写数据缓存区
  * @param  sector 扇区地址
  * @param  cnt 扇区个数
  * @retval 返回错误状态;0,正常;其他,错误代码;
  */
uint8_t SD_WriteDisk(uint8_t *buf, uint32_t sector, uint32_t cnt)
{
    uint8_t sta = HAL_OK;
    uint32_t timeout = SD_TIMEOUT;
    long long lsector = sector;
    INTX_DISABLE(); // 关闭总中断(POLLING模式,严禁中断打断SDIO读写操作!!!)
    sta = HAL_SD_WriteBlocks(&hsd, (uint8_t *)buf, lsector, cnt, SD_TIMEOUT); // 多个sector的写操作

    // 等待SD卡写完
    while (HAL_SD_GetCardState(&hsd) != HAL_SD_CARD_TRANSFER)
    {
        if (timeout-- == 0)
        {
            sta = SD_TRANSFER_BUSY;
        }
    }
    INTX_ENABLE(); // 开启总中断
    return sta;
}
```

**【函数说明】**在指定地址开始写入指定长度的数据。

**【参数说明】**

- buf ：写数据缓存区
- sector ：扇区地址
- cnt ：扇区个数	

## 二、diskio.c文件的移植

### 1. drive number

前边移植SPI FLASH的时候已经预留了：

```c
#define DEV_SDCARD      0	/* Example: Map SD card to physical drive 0 */
#define DEV_SPI_FLASH   1	/* Example: Map SPI FLASH to physical drive 1 */
```

### 2. disk_initialize()

#### 2.1 函数声明

首先是初始化函数disk_initialize()，我们可以参考文档[FatFs - disk_initialize (elm-chan.org)](http://elm-chan.org/fsw/ff/doc/dinit.html)：

```c
DSTATUS disk_initialize (
  BYTE pdrv           /* [IN] Physical drive number */
);
```

这个函数初始化存储设备，并使其准备好进行通用读/写。

#### 2.2 对SD卡初始化

我们来看一下对SD卡的初始化操作：

```c
case DEV_SDCARD:
    //MX_SDIO_SD_Init();// SDIO初始化
    //show_sdcard_info();
    result = 0;
    break;
```

#### 2.3 移植结果

```c
DSTATUS disk_initialize(
	BYTE pdrv /* Physical drive nmuber to identify the drive */
)
{
	int result = 0;

	switch (pdrv)
	{
		case DEV_SDCARD:
			//MX_SDIO_SD_Init();// SDIO初始化
			//show_sdcard_info();
			result = 0;
			break;
		default:
			result = -1;
			break;
	}
	if(result == 0)
		return RES_OK;
	else
		return STA_NOINIT; //初始化失败
}
```

### 3. disk_status()

#### 3.1 函数声明

这个函数主要是获取设备的状态，其实这个函数并不重要，我们甚至可以让它永远返回一个成功测标志。我们可以参考：[FatFs - disk_status (elm-chan.org)](http://elm-chan.org/fsw/ff/doc/dstat.html)

```c
DSTATUS disk_status (
  BYTE pdrv     /* [IN] Physical drive number */
);
```

#### 3.2 对SD卡的状态检测

这里就没检测了，直接返回OK：

```c
case DEV_SDCARD:
    result = 0;
    break;
```

#### 3.3 移植结果

```c
DSTATUS disk_status(
	BYTE pdrv /* Physical drive nmuber to identify the drive */
)
{
	int result = 0;

	switch (pdrv)
	{
		case DEV_SDCARD:
			result = 0;
			break;
		default:
			result = -1;
			break;
	}
	if(result == 0)
		return RES_OK;
	else
		return STA_NOINIT;
}
```

### 4. disk_read()

#### 4.1 函数声明

这个函数主要是读取数据，我们可以参考：[FatFs - disk_read (elm-chan.org)](http://elm-chan.org/fsw/ff/doc/dread.html)

```c
DRESULT disk_read (
  BYTE pdrv,     /* [IN] Physical drive number */
  BYTE* buff,    /* [OUT] Pointer to the read data buffer */
  LBA_t sector,  /* [IN] Start sector number */
  UINT count     /* [IN] Number of sectros to read */
);
```

**【函数参数】**

- pdrv ：用于标识目标设备的物理驱动器号。

- buff ：指向字节数组中用于存储读取数据的第一个数据的指针。读取数据的大小将是 扇区大小x字节数。

- sector ：启动扇区号。数据类型 LBA_t 是 DWORD 或 QWORD 的别名，具体取决于配置选项。

- count ：要读取的扇区数。

**【注意事项】**FatFs每次操作，都是以扇区为基本单位的。

#### 4.2 从SD卡读取

```c
case DEV_SDCARD:
    result = SD_ReadDisk(buff, sector, count);	// 成功时返回0;
    break;
```



#### 4.3 移植结果

```c
DRESULT disk_read(
	BYTE pdrv,	  /* Physical drive nmuber to identify the drive */
	BYTE *buff,	  /* Data buffer to store read data */
	LBA_t sector, /* Start sector in LBA */
	UINT count	  /* Number of sectors to read */
)
{
	int result = 0;

	switch (pdrv)
	{
		case DEV_SDCARD:
			result = SD_ReadDisk(buff, sector, count);	// 成功时返回0;
			break;
		default:
			result = -1;
			break;
	}
	if(result == 0)
		return RES_OK;
	else
		return RES_ERROR;
}
```

### 5. disk_write()

#### 5.1 函数声明

这个函数主要是写入数据，我们可以参考：[FatFs - disk_write (elm-chan.org)](http://elm-chan.org/fsw/ff/doc/dwrite.html)

```c
DRESULT disk_write (
  BYTE pdrv,        /* [IN] Physical drive number */
  const BYTE* buff, /* [IN] Pointer to the data to be written */
  LBA_t sector,     /* [IN] Sector number to write from */
  UINT count        /* [IN] Number of sectors to write */
);
```

**【函数参数】**

- pdrv ：用于标识目标设备的物理驱动器号。

- buff ：指向字节数组中用于存储写入数据的第一个数据的指针。写入数据的大小将是 扇区大小x字节数。

- sector ：启动扇区号。数据类型 LBA_t 是 DWORD 或 QWORD 的别名，具体取决于配置选项。

- count ：要读取的扇区数。

**【注意事项】**FatFs每次操作，都是以扇区为基本单位的。

#### 5.2 向SD卡写入

```c
case DEV_SDCARD:
    result =SD_WriteDisk((uint8_t*)buff, sector, count);
    break;
```

这里与前边的读一样，都是以扇区为单位操作，将参数传入底层写入函数的时候需要转换为相应的地址。

#### 5.3 移植结果

```c
DRESULT disk_write(
	BYTE pdrv,		  /* Physical drive nmuber to identify the drive */
	const BYTE *buff, /* Data to be written */
	LBA_t sector,	  /* Start sector in LBA */
	UINT count		  /* Number of sectors to write */
)
{
	int result = 0;

	switch (pdrv)
	{
		case DEV_SDCARD:
			result =SD_WriteDisk((uint8_t*)buff, sector, count);
			break;
		default:
			result = -1;
			break;
	}

	if(result == 0)
		return RES_OK;
	else
		return RES_ERROR;
}
```

### 6. disk_ioctl()

#### 6.1 函数声明

这个函数主要是用于控制设备，可根据不同命令执行不同功能，我们可以参考：[FatFs - disk_ioctl (elm-chan.org)](http://elm-chan.org/fsw/ff/doc/dioctl.html)

```c
DRESULT disk_ioctl (
  BYTE pdrv,     /* [IN] Drive number */
  BYTE cmd,      /* [IN] Control command code */
  void* buff     /* [I/O] Parameter and data buffer */
);
```

**【函数参数】**

- pdrv ：用于标识目标设备的物理驱动器号。

- cmd ：命令编号，比如GET_SECTOR_COUNT、GET_SECTOR_SIZE、GET_BLOCK_SIZE等，详细的命令及含义可以参考官方文档说明。

- buff ：参数的指针取决于命令代码。不要在意该命令是否没有要传递的参数。

#### 6.2 获取SD卡信息

```c
case DEV_SDCARD:
    switch(cmd)
    {
        case GET_SECTOR_COUNT:// 扇区数量
            *(DWORD *)buff = SDCardInfo.LogBlockNbr;
            break;
        case GET_SECTOR_SIZE:// 扇区大小
            *(WORD *)buff = SDCardInfo.BlockSize;// 每个扇区是512B
            break;
        case GET_BLOCK_SIZE:// 每次擦除块的大小的个数
            *(DWORD *)buff = SDCardInfo.LogBlockSize;
        default:
            break;
    }
    result = 0;
    break;
```

#### 6.3 移植结果

```c
DRESULT disk_ioctl(
	BYTE pdrv, /* Physical drive nmuber (0..) */
	BYTE cmd,  /* Control code */
	void *buff /* Buffer to send/receive control data */
)
{
	int result = 0;

	switch (pdrv)
	{
		case DEV_SDCARD:
			switch(cmd)
			{
				case GET_SECTOR_COUNT:// 扇区数量
					*(DWORD *)buff = SDCardInfo.LogBlockNbr;
					break;
				case GET_SECTOR_SIZE:// 扇区大小
					*(WORD *)buff = SDCardInfo.BlockSize;// 每个扇区是512B
					break;
				case GET_BLOCK_SIZE:// 每次擦除块的大小的个数
					*(DWORD *)buff = SDCardInfo.LogBlockSize;
				default:
					break;
			}
			result = 0;
			break;
		default:
			result = -1;
			break;
	}

	if(result == 0)
		return RES_OK;
	else
		return RES_ERROR;
}
```

## 三、ffconf.h文件的配置

这里的配置基本不变。

### 1. FF_VOLUMES

```c
#define FF_VOLUMES		2
/* Number of volumes (logical drives) to be used. (1-10) */
```

### 2. FF_MAX_SS

```c
#define FF_MIN_SS		512
#define FF_MAX_SS		4096
/* This set of options configures the range of sector size to be supported. (512,
/  1024, 2048 or 4096) Always set both 512 for most systems, generic memory card and
/  harddisk, but a larger value may be required for on-board flash memory and some
/  type of optical media. When FF_MAX_SS is larger than FF_MIN_SS, FatFs is configured
/  for variable sector size mode and disk_ioctl() function needs to implement
/  GET_SECTOR_SIZE command. */
```

### 3. FF_USE_MKFS

```c
#define FF_FS_READONLY  0
#define FF_USE_MKFS		1
/* This option switches f_mkfs() function. (0:Disable or 1:Enable) */
```
