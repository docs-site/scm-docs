const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS_ROOT = "sumu-docs"
function copySdocDirectory() {
  try {
    // 记录开始时间
    const startTime = Date.now();
    
    console.log('🚀 开始执行 sdoc 目录拷贝任务');
    console.log('─'.repeat(50));
    
    // 获取当前工作目录的绝对路径
    const currentDir = process.cwd();
    console.log('📁 当前工作目录:', currentDir);

    // 获取工程目录名（当前目录的文件夹名）
    const projectName = path.basename(currentDir);
    console.log('🏗️  工程目录名:', projectName);

    // 构建目标目录名
    const targetDirName = `${DOCS_ROOT}/${projectName}`;
    console.log('🎯 目标目录名:', targetDirName);

    // 构建目标目录的完整路径（在当前目录的父级目录中）
    const targetDirPath = path.join(path.dirname(currentDir), targetDirName);
    console.log('📂 目标目录路径:', targetDirPath);

    // 源目录路径
    const sourceDirPath = path.join(currentDir, 'src', 'sdoc');
    console.log('📦 源目录路径:', sourceDirPath);
    console.log('─'.repeat(50));

    // 检查源目录是否存在
    if (!fs.existsSync(sourceDirPath)) {
      console.error('❌ 错误: sdoc 目录不存在:', sourceDirPath);
      process.exit(1);
    }

    // 如果目标目录已存在，直接进行覆盖（不删除）
    if (fs.existsSync(targetDirPath)) {
      console.log('📝 目标目录已存在，将直接覆盖...');
    }

    // 先统计源目录中的文件和目录数量
    console.log('📊 正在统计文件数量...');
    let fileCount = 0;
    let dirCount = 0;

    function countFiles(dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      items.forEach(item => {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          dirCount++;
          countFiles(fullPath);
        } else if (item.isFile()) {
          fileCount++;
        }
      });
    }

    countFiles(sourceDirPath);
    console.log(`📈 找到 ${fileCount} 个文件，${dirCount} 个目录`);

    // 使用系统命令拷贝目录（跨平台兼容），不显示详细文件信息
    console.log('─'.repeat(50));
    console.log('🔄 正在拷贝 sdoc 目录...');

    if (process.platform === 'win32') {
      // Windows 系统使用 xcopy（更可靠，支持创建目标目录）
      try {
        execSync(`xcopy "${sourceDirPath}" "${targetDirPath}" /E /I /H /Y > nul 2>&1`, { stdio: 'inherit' });
      } catch (error) {
        // 如果 xcopy 失败，尝试创建目标目录后重试
        if (!fs.existsSync(targetDirPath)) {
          fs.mkdirSync(targetDirPath, { recursive: true });
          execSync(`xcopy "${sourceDirPath}" "${targetDirPath}" /E /I /H /Y > nul 2>&1`, { stdio: 'inherit' });
        } else {
          throw error;
        }
      }
    } else {
      // Linux/Mac 系统使用 rsync 进行覆盖（保持权限和时间戳）
      try {
        // 确保目标目录存在
        if (!fs.existsSync(targetDirPath)) {
          fs.mkdirSync(targetDirPath, { recursive: true });
        }
        execSync(`rsync -a --delete "${sourceDirPath}/" "${targetDirPath}/" > /dev/null 2>&1`, { stdio: 'inherit' });
      } catch (error) {
        // 如果 rsync 不可用，使用 cp 作为备选
        execSync(`cp -Rf "${sourceDirPath}" "${targetDirPath}" > /dev/null 2>&1`, { stdio: 'inherit' });
      }
    }

    console.log('✅ 拷贝完成!');
    console.log(`📋 复制统计: ${fileCount} 个文件，${dirCount} 个目录`);
    
    // 计算并显示运行时间（分:秒:毫秒格式）
    const endTime = Date.now();
    const durationMs = endTime - startTime;
    
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    const milliseconds = durationMs % 1000;
    
    let timeString = '⏱️  Run time: ';
    if (minutes > 0) {
      timeString += `${minutes}m `;
    }
    if (seconds > 0 || minutes > 0) {
      timeString += `${seconds}s `;
    }
    timeString += `${milliseconds}ms`;
    
    console.log(timeString);
    console.log('🎉 Task completed!');

  } catch (error) {
    console.error('❌ 拷贝过程中发生错误:', error.message);
    process.exit(1);
  }
}

// 执行拷贝操作
copySdocDirectory();
