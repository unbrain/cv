<!-- ---
title:
tags: 
	- 编程
date: 2018/9/1
--- -->

#  前端 Linux 重装


前不久升级 deepin 然后 GG 了，所以写下来以免以后不用再去搜索

## 科学上网

```shell
sudo apt-get install python-pip; sudo pip install shadowsocks;
```


<!--more-->
### 配置 `~/.ssconf.json`

```json
 {
     "server":"",
     "server_port":,
     "local_address": "127.0.0.1",
     "local_port":1080,
     "password":"",
     "timeout":300,
     "method":"aes-256-cfb",
     "fast_open": false
 }
```

```shell
sudo sed -i 's/_cleanup/_reset/g' /usr/local/lib/python2.7/dist-packages/shadowsocks/crypto/openssl.py
```



使用 `sslocal -c ~/.ssconf.json` 开启代理，其中 ~/.ssconf.json 是配置文件的路径。嫌长的话使用 `alias`

### 命令行代理

命令行也走代理，你需要安装 [proxychians-ng](https://github.com/rofl0r/proxychains-ng)

 ```shell\
sudo apt install git
git clone https://github.com/rofl0r/proxychains-ng.git  //克隆到本地计算机
cd proxychains-ng   
sudo ./configure             
sudo make 
sudo make install
sudo cp ./src/proxychains.conf /etc/proxychians.conf 
cd ..   
sudo rm -rf proxychains-ng  
 ```

创建 proxychains-ng 的配置文件，如果你不知道创建在哪，就创建在 ~/.proxychains.conf（用 `touch ~/.proxychains.conf` 即可创建文件），内容如下

```
 strict_chain
 quiet_mode
 proxy_dns 

 remote_dns_subnet 224
 tcp_read_time_out 15000
 tcp_connect_time_out 8000
 [ProxyList]
 socks5     127.0.0.1 1080
```

在 ~/.bashrc 里添加一句 alias pc='proxychains4 -f ~/.proxychains.conf'，保存

## oh my shell

```shell
sudo apt-get install zsh
chsh -s /bin/zsh
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```

## node

nvm 安装

```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.nvm/nvm.sh
nvm install node 
nvm use node
```

### 更改 `.zshrc`

```shell
export NVM_DIR="/home/YOURUSERNAME/.nvm"#改成你的用户名
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

```
