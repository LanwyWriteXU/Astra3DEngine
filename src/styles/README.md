# Styles 样式目录

本目录包含 Astra 3D Engine 编辑器的所有 CSS 样式文件。

## 目录结构

```
src/styles/
├── main.css           # 主入口，导入所有样式
├── variables.css      # CSS 变量定义
├── base.css           # 基础样式和重置
├── buttons.css        # 按钮样式
├── scrollbar.css      # 滚动条样式
├── dropdown.css       # 下拉菜单样式
├── modal.css          # 弹窗样式
├── panel.css          # 面板容器样式
├── toolbar.css        # 工具栏样式
├── hierarchy.css      # 层级面板样式
├── inspector.css      # 属性面板样式
├── assets.css         # 资源面板样式
├── viewport.css       # 视口样式
├── status-bar.css     # 状态栏样式
└── plugin-settings.css # 插件设置样式
```

## CSS 变量 (variables.css)

### 颜色变量

```css
:root {
  --bg-primary: #1e1e1e;        /* 主背景色 */
  --bg-secondary: #252526;      /* 次背景色 */
  --bg-tertiary: #2d2d30;       /* 三级背景色 */
  
  --text-primary: #cccccc;      /* 主文本色 */
  --text-secondary: #808080;    /* 次文本色 */
  --text-disabled: #5a5a5a;     /* 禁用文本色 */
  
  --accent-active: #007fd4;     /* 激活色 */
  --accent-hover: #264f78;      /* 悬停色 */
  
  --border-color: #3c3c3c;      /* 边框色 */
  --separator-color: #454545;   /* 分隔线色 */
  
  --danger-color: #f14c4c;      /* 危险色 */
  --success-color: #4ec9b0;     /* 成功色 */
  --warning-color: #dcdcaa;     /* 警告色 */
}
```

### 尺寸变量

```css
:root {
  --toolbar-height: 32px;       /* 工具栏高度 */
  --panel-header-height: 24px;  /* 面板标题高度 */
  --panel-min-width: 200px;     /* 面板最小宽度 */
  --panel-max-width: 400px;     /* 面板最大宽度 */
}
```

## 样式文件说明

### main.css

主入口文件，按顺序导入所有样式：

1. `variables.css` - 变量定义
2. `base.css` - 基础样式
3. `scrollbar.css` - 滚动条
4. `buttons.css` - 按钮
5. 各组件样式...

### base.css

基础样式和 CSS 重置：

- 盒模型：`box-sizing: border-box`
- 字体：系统字体栈
- 颜色：继承变量
- 链接：默认样式
- 输入框：基础样式

### buttons.css

按钮样式：

- `.btn` - 基础按钮
- `.btn-primary` - 主要按钮
- `.btn-danger` - 危险按钮
- `.icon-btn` - 图标按钮
- `.icon-btn-danger` - 危险图标按钮

### scrollbar.css

自定义滚动条样式：

- 宽度：8px
- 轨道：透明
- 滑块：半透明灰色
- 悬停：高亮

### dropdown.css

下拉菜单样式：

- `.dropdown-menu` - 菜单容器
- `.dropdown-item` - 菜单项
- `.dropdown-separator` - 分隔线
- `.dropdown-submenu` - 子菜单

### modal.css

弹窗样式：

- `.modal-overlay` - 遮罩层
- `.modal` - 弹窗容器
- `.modal-header` - 标题栏
- `.modal-body` - 内容区
- `.modal-footer` - 底部按钮

### panel.css

面板容器样式：

- `.panel` - 面板容器
- `.panel-header` - 标题栏
- `.panel-content` - 内容区
- `.panel-collapsed` - 折叠状态

### hierarchy.css

层级面板样式：

- `.hierarchy-item` - 列表项
- `.hierarchy-item.selected` - 选中状态
- `.hierarchy-expand-icon` - 展开图标
- `.hierarchy-item.drop-before` - 拖拽到上方
- `.hierarchy-item.drop-after` - 拖拽到下方
- `.hierarchy-item.drop-inside` - 拖拽到内部

### inspector.css

属性面板样式：

- `.inspector-section` - 分组
- `.inspector-row` - 属性行
- `.inspector-label` - 标签
- `.inspector-input` - 输入框
- `.inspector-vector` - 向量输入组

### viewport.css

视口样式：

- `.viewport-container` - 视口容器
- `.viewport-canvas` - 画布
- `.viewport-overlay` - 覆盖层（定向球、工具栏）
- `.viewport-gizmo` - 定向球

## 主题切换

通过修改 `data-theme` 属性切换主题：

```html
<body data-theme="dark">
<body data-theme="light">
```

在 `variables.css` 中定义不同主题的变量：

```css
:root[data-theme="dark"] {
  --bg-primary: #1e1e1e;
  --text-primary: #cccccc;
}

:root[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #333333;
}
```

## 响应式设计

使用媒体查询适配不同屏幕：

```css
@media (max-width: 1200px) {
  .panel {
    min-width: 180px;
  }
}

@media (max-width: 768px) {
  .panel {
    display: none;
  }
}
```

## 样式规范

1. **使用 CSS 变量**：颜色、尺寸等使用变量，便于主题切换
2. **BEM 命名**：块__元素--修饰符
3. **避免嵌套**：最多嵌套 3 层
4. **性能优化**：避免昂贵的选择器
5. **可访问性**：确保对比度足够
