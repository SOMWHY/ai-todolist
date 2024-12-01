# Todo List 应用

一个基于 React 的现代化待办事项管理应用，支持暗黑模式、任务排序、撤销/重做等功能。

## 使用说明

1. 添加任务：在顶部输入框中输入任务内容，按回车提交
2. 清空任务：点击红色垃圾桶按钮，有弹窗确认
3. 删除任务：点击任务右上角删除键
4. 编辑任务：双击任务内容进行编辑，按回车键确认并退出编辑
5. 勾选任务为完成：单击圆形勾选框以切换任务的完成状态
6. 标记任务为重要：单击星星勾选框以切换任务的重要状态
7. 设置任务截止日期：默认为添加任务时的日期
8. 统计待办事项数：展示在最上面，被删除的和标记为完成的任务不计入
9. 任务排序：使用顶部的排序选项进行排序，六种排序模式是默认（从上到下由旧至新），反向（默认的反向），按截止日期（越急的任务在越上面），按完成（完成的任务在下面），按重要（重要的任务在上面），以及拖动排序
10. 拖动排序：在任何排序模式下都能进行拖动排序，但只有拖动排序模式下刷新会保留更改（注意要拖到相应区域）
11. 暗黑模式：切换两套配色方案，保护眼睛
12. ai助力你生成待办事项的标题：将上级烦人啰嗦的表述复制过来，让ai帮你改写
13. 撤销/重做：使用撤销重做按钮或者快捷键Ctrl+Z和Ctrl+Y，对输入框的内容进行撤销重做操作，默认最大步骤数为5

### 环境变量配置（重要！）

项目使用了以下环境变量：

| 变量名 | 描述 | 必需 |
|--------|------|------|
| VITE_OPENAI_API_KEY | OpenAI API 密钥 | 是 |

### 获取 OpenAI API Key

1. 访问 [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. 登录或注册 OpenAI 账号
3. 点击 "Create new secret key"
4. 复制生成的 API key
5. 在项目的根目录创建`.env`文件
6. 文件内容如下：
```javascript
OPENAI_API_KEY=your_api_key_here//替换为你自己的APIKEY
```

如果无法通过官网获取APIKEY，可以通过[国内中转渠道](https://github.com/chatanywhere/GPT_API_free?tab=readme-ov-file)获取


⚠️ 注意：永远不要直接分享或提交你的 API key 到代码仓库中！


## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情
