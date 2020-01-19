# d-xn-umeditor
基于百度umeditor 富文本编辑的xn-umeditor 插件的深度魔改

因项目需要，一直在寻找一个简单易用的富文本插件。

众所周知，百度的ueditor 插件虽然功能强大，但是过于臃肿，不太适合在网页端使用。百度自家的轻量产品 umeditor 虽然足够简洁，但是界面太丑，且在图片处理上不够完善。

但是xiuno 轻博客里集成的 xn-umedit 完美解觉了上诉问题，但是仍然尚有缺陷，即缺少一个上传附件的功能。因此，博主花费整整一个下午，从xiuno 中抠出了核心js 文件并压缩打包，同时优化了夜琉璃同学的原版插件的文件结构，然后借鉴 sm图床的文件上传功能重新打造了一个上传界面，并相应的写了php 的后端文件。在此公开自己写的demo ，希望能够帮助到更多的同学。

此demo 开箱即用，无需配置。（需要 PHP7.0 + 执行环境）

下载地址:  <a href="https://github.com/sang8052/d-xn-umeditor">github</a> <a href="https://blog.szhcloud.cn/blog/wp-content/uploads/2020/01/demo-xn-umeditor-iw3c.zip">点此从本站下载</a>

<strong><span style="color: #ff0000;">警告:此demo 文件中 php 后端未对上传文件的类型做严格限制，存在严重安全隐患，仅供测试使用。请勿用于生产环境！</span></strong>

&nbsp;

鸣谢:
百度ueditor 开发团队 http://ueditor.baidu.com/website/
xiuno bbs umeditor 插件              https://bbs.xiuno.com/thread-150897.htm
百度umeditor富文本编辑器插件扩展-喻平勇      https://www.bbsmax.com/A/MyJx9OYV5n/
SM.MS 免费图床 https://sm.ms/
IW3C 前端镜像站 https://cdn.iw3c.top