# webpack 4.x 脚手架配置

- 本地服务器基于express搭建
- 支持开发环境/生产环境
- 支持react、babel、sass，css3自动添加前缀，BASE64，字体图标，视频文件，音频文件，代码调试，提取公共代码等常用依赖配置

```
+projectName
    |-build             #构建后生成的生产环境下 / 开发环境文件夹
    |   |-dist
    |   |   |-chunk
    |   |   |-media
    |   |   |-css
    |   |   |-fonts
    |   |   |-img
    |   |   |-js
    |   |-index.html
    |
    |-node_modules
    |
    |-src
    |   |-index.html
    |   |-assets
    |   |   |-audio
    |   |   |-fonts
    |   |   |-img
    |   |   |-style
    |   |   |-video
    |   |-pages
    |   |   |-index.css
    |   |   |-index.js
    |   |   |-reducers
    |   |   |-router
    |   |   |-view
    |   |   |   |-home
    |   |   |   |   |-index.js
    |
    |-package.json      #npm管理项目依赖的文件
    |
    |-README.md         #项目介绍
    |
    |-config
    |   |-express.config.js
    |   |-webpack.base.config.js
    |   |-webpack.build.config.js
    |   |-webpack.dev.config.js

```

