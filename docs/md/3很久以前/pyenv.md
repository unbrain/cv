<!-- ---
title: linux 下 python 版本管理
date: 2019/01/15
tags:
	- 编程
--- -->

# linux 下 python 版本管理

![](/img/pyenv.jpg)

由于马上要做毕业设计，而我的毕设与 python 有关，然后我的 deepin 系统对于 python 的版本管理不够方便，于是使用了pyenv

<!--more-->

- 最好看官网的教程

```
curl https://pyenv.run | zsh

pyenv update

echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc
exec "$SHELL"
```

这样就算 OK 了

安装

```
pyenv install x.x.x
```

查看

```
pyenv versions
```

切换

```
pyenv global x.x.x
```

这是正常的过程，但是我中间还是出了些错误

- [ImportError: No module named ‘_ctypes’ when using Value from module multiprocessing](https://stackoverflow.com/questions/27022373/python3-importerror-no-module-named-ctypes-when-using-value-from-module-mul)

  ```
  sudo apt-get install libffi-dev
  ```

  解决，但再次安装报错

- [Common build problems](https://github.com/pyenv/pyenv/wiki/Common-build-problems)

  ```
  sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
  libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
  xz-utils tk-dev libffi-dev liblzma-dev python-openssl
  ```

  再次安装就不再报错可以完美使用了
