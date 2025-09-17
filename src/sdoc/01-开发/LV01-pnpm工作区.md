---
title: LV01-pnpm工作区 <Badge type="tip" text="PNPM" />
date: 2025-09-03 19:30:53
icon: famicons:logo-markdown
permalink: /sdoc/develop/126b07e425dd16cde8cddce7
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
  detailDate: 2025-09-03 19:30:53.364
  fulluuid: de8cddce7d20450baf040b1cb753b0b8
  useduuid: de8cddce7
---

<!-- more -->

## 一、工作区

> 参考资料：[工作区 | pnpm 中文网](https://pnpm.nodejs.cn/workspaces/)

pnpm 内置了对单一存储库（也称为多包存储库、多项目存储库或整体存储库）的支持。你可以创建一个工作区来将多个项目联合到一个存储库中。

> 工作区的根目录中必须有一个 [`pnpm-workspace.yaml`](https://pnpm.nodejs.cn/pnpm-workspace_yaml) 文件。

### 1. 工作区协议

如果 [linkWorkspacePackages](https://pnpm.nodejs.cn/settings#linkWorkspacePackages) 设置为 `true`，如果可用包与声明的范围匹配，pnpm 将从工作区链接包。例如，如果 `bar` 在其依赖中有 `"foo": "^1.0.0"` 并且 `foo@1.0.0` 在工作区中，则 `foo@1.0.0` 链接到 `bar`。但是，如果 `bar` 在依赖中有 `"foo": "2.0.0"`，并且 `foo@2.0.0` 不在工作区中，则将从注册表安装 `foo@2.0.0`。这种行为带来了一些不确定性。

幸运的是，pnpm 支持 `workspace:` 协议。使用此协议时，pnpm 将拒绝解析本地工作区包以外的任何内容。因此，如果你设置了 `"foo": "workspace:2.0.0"`，这次安装将失败，因为工作区中不存在 `"foo@2.0.0"`。

当 [linkWorkspacePackages](https://pnpm.nodejs.cn/settings#linkWorkspacePackages) 选项设置为 `false` 时，此协议特别有用。在这种情况下，如果使用 `workspace:` 协议，pnpm 将仅链接工作区中的包。

#### 1.1 通过别名引用工作区包

假设工作区中有一个名为 `foo` 的包。通常，你会将其引用为 `"foo": "workspace:*"`。

如果你想使用不同的别名，以下语法也可以使用：`"bar": "workspace:foo@*"`。

在发布之前，别名将转换为常规别名依赖。上面的例子将变成：`"bar": "npm:foo@1.0.0"`。

#### 1.2 通过相对路径引用工作区包

在有 2 个包的工作区中：

```text
+ packages
	+ foo
	+ bar
```

`bar` 的依赖中可能有 `foo` 声明为 `"foo": "workspace:../foo"`。在发布之前，这些规范将转换为所有包管理器支持的常规版本规范。

#### 1.3 发布工作区包

当工作区包打包到存档中时（无论是通过 `pnpm pack` 还是像 `pnpm publish` 这样的发布命令之一），我们通过以下方式动态替换任何 `workspace:` 依赖：

- 目标工作区中的相应版本（如果你使用 `workspace:*`、`workspace:~` 或 `workspace:^`）
- 关联的 semver 范围（对于任何其他范围类型）

例如，如果工作区中有 `foo`、`bar`、`qar`、`zoo`，它们的版本均为 `1.5.0`，则如下：

```json
{
  "dependencies": {
    "foo": "workspace:*",
    "bar": "workspace:~",
    "qar": "workspace:^",
    "zoo": "workspace:^1.5.0"
  }
}
```

将转化为：

```json
{
  "dependencies": {
    "foo": "1.5.0",
    "bar": "~1.5.0",
    "qar": "^1.5.0",
    "zoo": "^1.5.0"
  }
}
```

此功能允许你依赖本地工作区包，同时仍然能够将生成的包发布到远程注册表，而无需中间发布步骤 - 你的消费者将能够像使用任何其他包一样使用你发布的工作区，同时仍然受益于 semver 提供的保证。

### 2. 发布工作流程

对工作区内的包进行版本控制是一项复杂的任务，pnpm 目前没有为此提供内置解决方案。然而，有 2 个经过充分测试的工具可以处理版本控制并支持 pnpm：

- [changesets](https://github.com/changesets/changesets)
- [Rush](https://rushjs.io/)

有关如何使用 Rush 设置存储库，请阅读 [此页](https://rushjs.io/pages/maintainer/setup_new_repo)。

要通过 pnpm 使用变更集，请阅读 [本指南](https://pnpm.nodejs.cn/using-changesets)。

### 3. 故障排除

如果工作区依赖之间存在循环，pnpm 无法保证脚本将按拓扑顺序运行。如果 pnpm 在安装过程中检测到循环依赖，它将产生警告。如果 pnpm 能够找出哪些依赖导致了循环，它也会显示它们。

如果你看到消息 `There are cyclic workspace dependencies`，请检查 `dependencies`、`optionalDependencies` 和 `devDependencies` 中声明的工作区依赖。

## 二、`pnpm-workspace.yaml`

> 参考资料：[pnpm-workspace.yaml | pnpm 中文网](https://pnpm.nodejs.cn/pnpm-workspace_yaml)

`pnpm-workspace.yaml` 定义 [workspace](https://pnpm.nodejs.cn/workspaces) 的根目录，使你能够在工作区中包含/排除目录。默认情况下，包含所有子目录的所有包。

例如：pnpm-workspace.yaml

```yaml
packages:
  # specify a package in a direct subdir of the root
  - "my-app"
  # all packages in direct subdirs of packages/
  - "packages/*"
  # all packages in subdirs of components/
  - "components/**"
  # exclude packages that are inside test directories
  - "!**/test/**"
```

即使使用自定义位置通配符，根包也始终包含在内。

目录也在 `pnpm-workspace.yaml` 文件中定义。详情请参阅 [目录](https://pnpm.nodejs.cn/catalogs)。

```yaml
packages:
  - "packages/*"

catalog:
  chalk: ^4.1.2

catalogs:
  react16:
    react: ^16.7.0
    react-dom: ^16.7.0
  react17:
    react: ^17.10.0
    react-dom: ^17.10.0
```

## 三、目录

"目录" 是用于将依赖版本范围定义为可重用常量的 [工作区功能](https://pnpm.nodejs.cn/workspaces)。目录中定义的常量稍后可以在 `package.json` 文件中引用。

### 1. 目录协议 (`catalog:`)

一旦在 `pnpm-workspace.yaml` 中定义了目录，

```yaml
packages:
  - packages/*

# Define a catalog of version ranges.
catalog:
  react: ^18.3.1
  redux: ^5.0.1
```

可以使用 `catalog:` 协议代替版本范围本身。例如在packages/example-app/package.json

```json
{
  "name": "@example/app",
  "dependencies": {
    "react": "catalog:",
    "redux": "catalog:"
  }
}
```

这相当于直接编写版本范围（例如 `^18.3.1`）。

```json
{
  "name": "@example/app",
  "dependencies": {
    "react": "^18.3.1",
    "redux": "^5.0.1"
  }
}
```

你可以在以下字段中使用 `catalog:` 协议：

- `package.json`：`dependencies`、`devDependencies`、`peerDependencies`、`optionalDependencies`
- `pnpm-workspace.yaml`：`overrides`

`catalog:` 协议允许在冒号后使用可选名称（例如：`catalog:name`）来指定应使用哪个目录。省略名称时，将使用默认目录。

根据场景，与直接编写版本范围相比，`catalog:` 协议提供了一些 [advantages](https://pnpm.nodejs.cn/catalogs/#advantages)，下面将详细介绍。

> 优点
>
> 在工作区（即 monorepo 或多包存储库）中，许多包通常使用相同的依赖。目录在编写 `package.json` 文件时减少了重复，并提供了一些好处：
>
> - 维护唯一版本 — 通常希望工作区中只有一个版本的依赖。目录使其更易于维护。重复的依赖可能会在运行时发生冲突并导致错误。使用打包器时，重复项也会增加大小。
> - 更容易升级 - 升级依赖时，只需要编辑 `pnpm-workspace.yaml` 中的目录条目，而不是使用该依赖的所有 `package.json` 文件。这节省了时间 - 只需要更改一行，而不是很多行。
> - 更少的合并冲突 — 由于在升级依赖时不需要编辑 `package.json` 文件，因此这些文件中不再发生 git 合并冲突。

### 2. 定义目录

目录在 `pnpm-workspace.yaml` 文件中定义。有两种定义目录的方法。

（1）使用（单数）`catalog` 字段创建名为 `default` 的目录。

（2）使用（复数）`catalogs` 字段创建任意命名的目录。

> 如果你有一个现有的工作区，想要使用目录迁移到该工作区，则可以使用以下 [codemod](https://go.codemod.com/pnpm-catalog)：
>
> ```bash
> pnpx codemod pnpm/catalog
> ```

#### 2.1 默认目录

顶层 `catalog` 字段允许用户定义名为 `default` 的目录。

```yaml
catalog:
  react: ^18.2.0
  react-dom: ^18.2.0
```

可以通过 `catalog:default` 引用这些版本范围。仅对于默认目录，也可以使用特殊的 `catalog:` 简写。将 `catalog:` 视为扩展为 `catalog:default` 的简写。

#### 2.2 命名目录

可以在 `catalogs` 键下配置具有任意选择名称的多个目录。

```yaml
catalogs:
  # Can be referenced through "catalog:react17"
  react17:
    react: ^17.0.2
    react-dom: ^17.0.2

  # Can be referenced through "catalog:react18"
  react18:
    react: ^18.2.0
    react-dom: ^18.2.0
```

可以定义一个默认目录以及多个命名目录。这可能在大型多包存储库中很有用，这些存储库正在逐步迁移到依赖的较新版本。

```yaml
catalog:
  react: ^16.14.0
  react-dom: ^16.14.0

catalogs:
  # Can be referenced through "catalog:react17"
  react17:
    react: ^17.0.2
    react-dom: ^17.0.2

  # Can be referenced through "catalog:react18"
  react18:
    react: ^18.2.0
    react-dom: ^18.2.0
```

### 3. 发布

运行 `pnpm publish` 或 `pnpm pack` 时，将删除 `catalog:` 协议。这类似于 [`workspace:` 协议](https://pnpm.nodejs.cn/workspaces#workspace-protocol-workspace)，即 [发布时也替换](https://pnpm.nodejs.cn/workspaces#publishing-workspace-packages)。

例如，packages/example-components/package.json

```json
{
  "name": "@example/components",
  "dependencies": {
    "react": "catalog:react18"
  }
}
```

发布时将成为以下内容。

```json
{
  "name": "@example/components",
  "dependencies": {
    "react": "^18.3.1"
  }
}
```

`catalog:` 协议替换过程允许其他工作区或包管理器使用 `@example/components` 包。

## 四、设置

### 1. catalogMode

> 已添加于：v10.12.1

- 默认：manual
- 类型：手动、严格、优先

控制在运行 `pnpm add` 时是否以及如何将依赖添加到默认目录。有三种模式：

- strict - 仅允许目录中的依赖版本。添加目录版本范围之外的依赖将导致错误。
- prefer - 优先使用目录版本，但如果未找到兼容版本，则会回退到直接依赖。
- 手动（默认） - 不会自动将依赖添加到目录中。

## 五、pnpm基本命令

### 1. 工作区初始化

#### 1.1 创建工作区配置文件

```bash
# 创建 pnpm-workspace.yaml 文件
cat > pnpm-workspace.yaml << EOF
packages:
  - 'packages/*'
EOF
```

#### 1.2 初始化根项目

```bash
# 创建项目目录
mkdir my-workspace && cd my-workspace

# 初始化根目录的 package.json
pnpm init

# 修改根目录的 package.json，添加私有字段和基本信息
cat > package.json << EOF
{
  "name": "my-workspace",
  "version": "1.0.0",
  "description": "PNPM workspace example",
  "private": true,
  "scripts": {
    "build": "pnpm -r run build",
    "test": "pnpm -r run test",
    "dev": "pnpm -r run dev"
  }
}
EOF
```

#### 1.3 创建子包

```bash
# 创建 packages 目录
mkdir packages

# 创建第一个子包 pkg-one
mkdir packages/pkg-one
cd packages/pkg-one
pnpm init

# 修改 pkg-one 的 package.json
cat > package.json << EOF
{
  "name": "@my-workspace/pkg-one",
  "version": "1.0.0",
  "description": "First package in workspace",
  "main": "index.js",
  "scripts": {
    "build": "echo 'Building pkg-one'",
    "test": "echo 'Testing pkg-one'",
    "dev": "echo 'Dev mode for pkg-one'"
  }
}
EOF

# 创建 pkg-one 的主文件
echo "console.log('This is pkg-one');" > index.js

# 返回到项目根目录
cd ../../

# 创建第二个子包 pkg-two
mkdir packages/pkg-two
cd packages/pkg-two
pnpm init

# 修改 pkg-two 的 package.json
cat > package.json << EOF
{
  "name": "@my-workspace/pkg-two",
  "version": "1.0.0",
  "description": "Second package in workspace",
  "main": "index.js",
  "scripts": {
    "build": "echo 'Building pkg-two'",
    "test": "echo 'Testing pkg-two'",
    "dev": "echo 'Dev mode for pkg-two'"
  }
}
EOF

# 创建 pkg-two 的主文件
echo "console.log('This is pkg-two');" > index.js

# 返回到项目根目录
cd ../../
```

#### 2.1 安装外部依赖

##### 2.1.1 在根目录安装

```bash
# 在根目录安装 VitePress 作为开发依赖
pnpm add vitepress -D -w

# 查看根目录的 package.json
cat package.json
```

执行后，根目录的 `package.json` 将包含：

```json
{
  "name": "my-workspace",
  "version": "1.0.0",
  "description": "PNPM workspace example",
  "private": true,
  "scripts": {
    "build": "pnpm -r run build",
    "test": "pnpm -r run test",
    "dev": "pnpm -r run dev"
  },
  "devDependencies": {
    "vitepress": "^1.0.0"
  }
}
```

##### 2.1.2 在特定子包安装

```bash
# 在 pkg-one 子包安装 VitePress 作为开发依赖
pnpm add vitepress -D --filter @my-workspace/pkg-one

# 查看子包的 package.json
cat packages/pkg-one/package.json
```

执行后，`packages/pkg-one/package.json` 将包含：

```json
{
  "name": "@my-workspace/pkg-one",
  "version": "1.0.0",
  "description": "First package in workspace",
  "main": "index.js",
  "scripts": {
    "build": "echo 'Building pkg-one'",
    "test": "echo 'Testing pkg-one'",
    "dev": "echo 'Dev mode for pkg-one'"
  },
  "devDependencies": {
    "vitepress": "^1.0.0"
  }
}
```

##### 2.1.3 在所有子包安装

```bash
# 在所有子包安装 VitePress 作为开发依赖
pnpm add vitepress -D -r

# 查看所有子包的 package.json
cat packages/pkg-one/package.json
cat packages/pkg-two/package.json
```

执行后，所有子包的 `package.json` 都将包含 VitePress 依赖。

##### 2.1.4 安装特定版本

```bash
# 在特定子包安装指定版本的 VitePress
pnpm add vitepress@1.0.0-beta.7 -D --filter @my-workspace/pkg-one

# 在根目录安装指定版本的 VitePress
pnpm add vitepress@1.0.0-beta.7 -D -w
```

#### 2.2 安装工作区内依赖

##### 2.2.1 子包间依赖

```bash
# 在 pkg-two 中安装 pkg-one 作为依赖
pnpm add @my-workspace/pkg-one --filter @my-workspace/pkg-two

# 查看 pkg-two 的 package.json
cat packages/pkg-two/package.json
```

执行后，`packages/pkg-two/package.json` 将包含：

```json
{
  "name": "@my-workspace/pkg-two",
  "version": "1.0.0",
  "description": "Second package in workspace",
  "main": "index.js",
  "scripts": {
    "build": "echo 'Building pkg-two'",
    "test": "echo 'Testing pkg-two'",
    "dev": "echo 'Dev mode for pkg-two'"
  },
  "dependencies": {
    "@my-workspace/pkg-one": "workspace:*"
  }
}
```

##### 2.2.2 根目录依赖

```bash
# 在根目录安装 pkg-one 作为依赖
pnpm add @my-workspace/pkg-one@workspace:* -w

# 查看根目录的 package.json
cat package.json
```

执行后，根目录的 `package.json` 将包含：

```json
{
  "name": "my-workspace",
  "version": "1.0.0",
  "description": "PNPM workspace example",
  "private": true,
  "scripts": {
    "build": "pnpm -r run build",
    "test": "pnpm -r run test",
    "dev": "pnpm -r run dev"
  },
  "dependencies": {
    "@my-workspace/pkg-one": "workspace:*"
  },
  "devDependencies": {
    "vitepress": "^1.0.0"
  }
}
```

#### 2.3 卸载依赖

##### 2.3.1 从根目录卸载

```bash
# 从根目录卸载 VitePress
pnpm remove vitepress -w

# 查看根目录的 package.json
cat package.json
```

##### 2.3.2 从特定子包卸载

```bash
# 从 pkg-one 子包卸载 VitePress
pnpm remove vitepress -D --filter @my-workspace/pkg-one

# 查看子包的 package.json
cat packages/pkg-one/package.json
```

##### 2.3.3 从所有子包卸载

```bash
# 从所有子包卸载 VitePress
pnpm remove vitepress -D -r

# 查看所有子包的 package.json
cat packages/pkg-one/package.json
cat packages/pkg-two/package.json
```

##### 2.3.4 卸载工作区内依赖

```bash
# 从 pkg-two 卸载 pkg-one 依赖
pnpm remove @my-workspace/pkg-one --filter @my-workspace/pkg-two

# 从根目录卸载 pkg-one 依赖
pnpm remove @my-workspace/pkg-one -w
```

#### 2.4 批量操作

##### 2.4.1 批量安装

```bash
# 在特定子包批量安装多个外部依赖
pnpm add vitepress vue typescript -D --filter @my-workspace/pkg-one

# 在根目录批量安装多个外部依赖
pnpm add vitepress vue typescript -D -w

# 在所有子包批量安装多个外部依赖
pnpm add vitepress vue typescript -D -r
```

##### 2.4.2 批量卸载

```bash
# 从特定子包批量卸载多个外部依赖
pnpm remove vitepress vue typescript -D --filter @my-workspace/pkg-one

# 从根目录批量卸载多个外部依赖
pnpm remove vitepress vue typescript -D -w

# 从所有子包批量卸载多个外部依赖
pnpm remove vitepress vue typescript -D -r
```

### 3. 运行与构建

#### 3.1 常用命令

```bash
# 安装所有工作区的依赖
pnpm install

# 在所有工作区中运行脚本
pnpm -r run <script-name>

# 在特定工作区中运行脚本
pnpm run <script-name> --filter <workspace-name>

# 查看工作区依赖关系图
pnpm list --depth=-1

# 更新所有工作区的依赖
pnpm update -r

# 清理所有工作区的 node_modules
pnpm -r prune
```

#### 3.2 发布相关命令

```bash
# 构建所有工作区
pnpm -r run build

# 发布所有工作区包
pnpm -r publish

# 打包所有工作区
pnpm -r pack

# 检查哪些包可以发布
pnpm whoami
```

### 4. 其他操作

#### 4.1 子包初始化

在工作区内创建和初始化新的子包：

```bash
# 创建子包目录
mkdir packages/new-package

# 初始化子包
cd packages/new-package
pnpm init

# 或者直接在根目录创建并初始化
mkdir packages/new-package && cd packages/new-package && pnpm init
```

子包的 `package.json` 示例：

```json
{
  "name": "@my-workspace/new-package",
  "version": "1.0.0",
  "description": "New package in workspace",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

#### 4.2 管理根工作区依赖

##### 4.2.1 安装工作区依赖

在工作区中，包可以相互依赖，使用 `workspace:` 协议：

```bash
# 在子包中安装另一个子包作为依赖
pnpm add @my-workspace/other-package --filter @my-workspace/new-package

# 这会自动在 package.json 中添加 workspace 协议
# "dependencies": {
#   "@my-workspace/other-package": "workspace:*"
# }
```

手动在 `package.json` 中添加工作区依赖：

```json
{
  "dependencies": {
    "@my-workspace/other-package": "workspace:*",
    "@my-workspace/utils": "workspace:~1.0.0",
    "@my-workspace/types": "workspace:^1.0.0"
  }
}
```

##### 4.2.2 卸载工作区依赖

```bash
# 从子包中卸载工作区依赖
pnpm remove @my-workspace/other-package --filter @my-workspace/new-package
```

##### 4.2.3 在根工作区中管理子包依赖

在工作区中，根工作区（根目录的 package.json）也可以依赖工作区内的子包。这在某些场景下很有用，例如根目录需要使用子包的功能或者需要在根目录运行子包的脚本。

###### 4.2.3.1 将子包添加到根工作区依赖中

**注意：** 直接使用 `pnpm add` 命令添加工作区内的子包可能会导致 404 错误，因为 pnpm 默认会尝试从 npm 注册表获取该包。以下是几种正确的方法：

- 方法一：使用 workspace 协议

```bash
# 在根工作区中添加子包作为依赖，使用 workspace 协议
pnpm add @my-workspace/sub-package@workspace:* -w

# 在根工作区中添加子包作为开发依赖
pnpm add @my-workspace/sub-package@workspace:* -D -w

# 在根工作区中添加子包作为可选依赖
pnpm add @my-workspace/sub-package@workspace:* -O -w
```

- 方法二：使用 `--filter` 选项

```bash
# 使用 --filter 选项指定工作区包
pnpm add @my-workspace/sub-package --filter @my-workspace/sub-package -w
```

- 方法三：手动编辑 package.json（推荐）

由于自动添加工作区依赖可能会遇到问题，最可靠的方法是手动编辑根目录的 `package.json` 文件：

```json
{
  "name": "my-workspace-root",
  "version": "1.0.0",
  "dependencies": {
    "@my-workspace/sub-package": "workspace:*"
  }
}
```

然后运行 `pnpm install` 来安装依赖。

###### 4.2.3.2 从根工作区依赖中移除子包

```bash
# 从根工作区中移除子包依赖
pnpm remove @my-workspace/sub-package -w

# 从根工作区中移除子包开发依赖
pnpm remove @my-workspace/sub-package -D -w

# 从根工作区中移除子包可选依赖
pnpm remove @my-workspace/sub-package -O -w
```

###### 4.2.3.3 手动编辑根工作区的 package.json

你也可以直接编辑根目录的 `package.json` 文件来添加或移除子包依赖：

```json
{
  "name": "my-workspace-root",
  "version": "1.0.0",
  "dependencies": {
    "@my-workspace/ui-components": "workspace:*",
    "@my-workspace/utils": "workspace:^1.0.0"
  },
  "devDependencies": {
    "@my-workspace/testing-tools": "workspace:*"
  }
}
```

编辑完成后，运行 `pnpm install` 来安装或更新依赖。

###### 4.2.3.4 常见错误及解决方案

**错误：** `ERR_PNPM_FETCH_404 GET https://registry.npmjs.org/@my-workspace%2Fsub-package: Not Found - 404`

**原因：** 当使用 `pnpm add @my-workspace/sub-package -w` 命令时，pnpm 会尝试从 npm 注册表而不是本地工作区中查找该包。

**解决方案：**

（1）使用 `workspace:` 协议：`pnpm add @my-workspace/sub-package@workspace:* -w`

（2）或者手动编辑 `package.json` 文件，添加 `"@my-workspace/sub-package": "workspace:*"`

（3）然后运行 `pnpm install` 来更新依赖

使用 `-w` 或 `--workspace-root` 标志可以指定在根工作区中安装依赖，而不是在某个特定的子包中。
