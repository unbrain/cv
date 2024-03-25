<!-- ---
title: linux 下 python 版本管理
date: 2019/01/15
tags:
	- 编程
--- -->
# linux 下 python 版本管理
### [StartFragment  安装 Mac 包管理软件 brew](https://docs.brew.sh/Linuxbrew)：

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
```

bash 报错

```bash
Warning: /home/linuxbrew/.linuxbrew/bin is not in your PATH.
```

参看安装文档还需要

```bash
test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)
test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.bash_profile
echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile
```



<!-- ![1550561657989](/tmp/1550561657989.png) -->

