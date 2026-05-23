# i18n 国际化目录

本目录包含 Astra 3D Engine 编辑器的国际化翻译文件。

## 目录结构

```
src/i18n/
├── index.js           # 国际化核心模块
├── zh.json            # 中文翻译
├── en.json            # 英文翻译
├── ja.json            # 日文翻译
├── ru.json            # 俄文翻译
├── la.json            # 拉丁文翻译
└── plugin-settings/   # 插件设置界面翻译
    ├── zh.json
    └── en.json
```

## 支持的语言

| 语言 | 代码 | 文件 |
|------|------|------|
| 中文 | `zh` | `zh.json` |
| 英文 | `en` | `en.json` |
| 日文 | `ja` | `ja.json` |
| 俄文 | `ru` | `ru.json` |
| 拉丁文 | `la` | `la.json` |

## 使用方法

### 基本用法

```javascript
import { msg, setLanguage, getCurrentLanguage } from '../i18n/index.js';

// 获取翻译文本
const text = msg('key.subkey');

// 切换语言
setLanguage('zh');

// 获取当前语言
const lang = getCurrentLanguage();
```

### 在组件中使用

```jsx
import { msg } from '../i18n/index.js';

function MyComponent() {
  return (
    <div>
      <h1>{msg('menu.file')}</h1>
      <button>{msg('button.save')}</button>
    </div>
  );
}
```

## 翻译键结构

翻译文件使用嵌套结构，通过点号访问：

```json
{
  "menu": {
    "file": "文件",
    "edit": "编辑",
    "view": "视图"
  },
  "button": {
    "save": "保存",
    "cancel": "取消"
  }
}
```

访问方式：`msg('menu.file')` → `"文件"`

## 主要翻译键分类

### 菜单 (menu.*)
- `menu.file` - 文件
- `menu.edit` - 编辑
- `menu.view` - 视图
- `menu.help` - 帮助

### 工具 (tool.*)
- `tool.translate` - 移动
- `tool.rotate` - 旋转
- `tool.scale` - 缩放

### 层级面板 (hierarchy.*)
- `hierarchy.title` - 层级
- `hierarchy.empty` - 场景为空
- `hierarchy.delete` - 删除

### 属性面板 (inspector.*)
- `inspector.title` - 属性
- `inspector.position` - 位置
- `inspector.rotation` - 旋转
- `inspector.scale` - 缩放
- `inspector.parent` - 父对象

### 预制件 (prefab.*)
- `prefab.title` - 预制件
- `prefab.create` - 创建预制件
- `prefab.apply` - 应用到预制件

### 资源 (assets.*)
- `assets.title` - 资源
- `assets.import` - 导入
- `assets.model` - 模型
- `assets.texture` - 纹理

## 插件翻译

插件有两套翻译系统：

### 1. 插件设置界面翻译

位置：`src/i18n/plugin-settings/`

用于插件管理界面的 UI 文本，所有插件共用。

```javascript
import { msg } from '../i18n/index.js';
msg('pluginSettings.enabled'); // "启用"
```

### 2. 插件内部翻译

位置：`src/plugins/plugins/[plugin-id]/l10n/`

用于插件自己的名称、描述和内部文本。

```javascript
// 在插件内部使用 ctx.msg
ctx.msg('name'); // 插件名称
```

## 添加新语言

1. 创建新的翻译文件（如 `ko.json`）
2. 复制 `en.json` 内容并翻译
3. 在 `index.js` 中导入并注册新语言
4. 在语言菜单中添加选项

## 翻译原则

1. **简洁明了**：UI 文本尽量简短
2. **一致性**：相同功能使用相同翻译
3. **上下文**：考虑使用场景，避免歧义
4. **格式化**：数字、日期等使用本地化格式
