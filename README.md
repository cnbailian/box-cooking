# box
> 一个chrome extension , 目的是方便快捷的存储信息
> 技术栈 cooking-cli weback2 Vue2 ElementUI

## 目录说明
```
-leancloud // 使用leancloud 云存储
  -leancloud.js // leancloud配置
  -type.js // 存储类型
-src // 内容主目录
  -components // 管理页面目录
  -popup // popup目录
-chrome.js // 生成dist目录时迁移chrome扩展配置文件
-cooking.conf.js // cooking配置文件
```

## 使用
```
npm install
npm run dist
```
而后将生成的dlist文件夹加入扩展即可

MIT
