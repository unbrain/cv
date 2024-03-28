<!-- ---
title: Git简单操作
date: 2017/9/10 20:46:25
tags: 
	- Git
	- 编程
reward: true
toc: true
--- -->

# Git简单操作

> [学习于廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

## 创建

```
git init命令把这个目录变成Git可以管理的仓库

git add <file>告诉Git，把文件添加到仓库

git commit -m <file>告诉Git，把文件提交到仓库
```

<!--more-->
## 回溯

```
git status 命令可以让我们时刻掌握仓库当前的状态,修改后是否commit等

git diff 可以查看修改的不同地方

git log显示从最近到最远的提交日志

git reset --hard HEAD^上一版本…^^上两版本

cat <file>查看内容

HEAD指向的就是当前版本

git checkout -- file可以丢弃工作区的修改

git reset HEAD file可以把暂存区的修改撤销掉（unstage）

rm <file>命令删除
```

## 远程操作

```
git push origin master  push到服务器

git clone git@github.com:michaelliao/gitskills.git 克隆还可以用

https://github.com/michaelliao/gitskills.git这样的地址
```



## 分支操作

```
git checkout -b dev	创建一个dev分支

git branch	查看当前分支 会列出所有分支，当前分支前面会标一个*号

git merge dev	把dev分支的工作成果合并到master分支上

切换分支：git checkout <name>

创建+切换分支：git checkout -b <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>
```
