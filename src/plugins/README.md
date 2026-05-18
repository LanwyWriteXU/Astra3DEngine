# Astra3D 插件系统

## 概述

Astra3D 插件系统允许开发者通过编写 JavaScript 模块来扩展编辑器功能。

## 插件目录结构

```
src/plugins/
├── index.js              # 插件系统入口
├── PluginManager.js      # 插件管理器
├── api.js                # 插件 API
├── README.md             # 本文档
└── plugins/              # 插件目录
    ├── example-plugin/   # 示例插件
    │   ├── manifest.json # 插件清单
    │   ├── index.js      # 插件入口脚本
    │   └── l10n/         # 国际化文件
    │       ├── en.json   # 英文
    │       └── zh-cn.json # 中文
    ├── auto-save/        # 自动保存插件
    ├── object-stats/     # 对象统计插件
    └── modern-dark-theme/ # 现代深色主题插件
```

## 创建插件

在 `src/plugins/plugins/` 目录下创建一个新文件夹，包含以下文件：

### manifest.json

```json
{
  "name": "我的插件",
  "description": "插件描述",
  "version": "1.0.0",
  "author": "作者名",
  "enabledByDefault": false,
  "userscript": "index.js"
}
```

### index.js

```javascript
const activate = async (ctx) => {
  ctx.log(ctx.msg('activated'));
  
  ctx.registerHook('onObjectAdd', (object) => {
    ctx.log(ctx.msg('objectAdded', object.name));
  });
  
  return {};
};

const deactivate = async (ctx, instance) => {
  ctx.log(ctx.msg('deactivated'));
};

export default {
  activate,
  deactivate,
};
```

### l10n/zh-cn.json

```json
{
  "activated": "插件已激活",
  "deactivated": "插件已停用",
  "objectAdded": "新对象被添加: {0}"
}
```

### l10n/en.json

```json
{
  "activated": "Plugin activated",
  "deactivated": "Plugin deactivated",
  "objectAdded": "Object added: {0}"
}
```

## manifest.json 字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 是 | 插件名称 |
| `description` | string | 是 | 插件描述 |
| `version` | string | 是 | 版本号 (如 "1.0.0") |
| `author` | string | 否 | 作者名 |
| `enabledByDefault` | boolean | 否 | 是否默认启用 (默认 false) |
| `userscript` | string | 否 | 入口脚本文件名 (默认 "index.js") |

## 国际化 (l10n)

插件支持多语言，在插件目录下创建 `l10n/` 文件夹，包含各语言的 JSON 文件。

### 文件命名

- `en.json` - 英文 (默认回退)
- `zh-cn.json` - 简体中文
- `zh-tw.json` - 繁体中文
- `ja.json` - 日语
- 等等...

### 使用方法

在插件代码中使用 `ctx.msg()` 获取翻译：

```javascript
ctx.msg('key');           // 获取翻译
ctx.msg('key', arg1);     // 带参数的翻译，使用 {0} 占位符
ctx.msg('key', arg1, arg2); // 多个参数，使用 {0}, {1} 占位符
```

## 插件上下文 (ctx)

### 属性

| 属性 | 说明 |
|------|------|
| `pluginId` | 插件 ID |
| `manifest` | 插件清单 |
| `api` | 插件 API 对象 |

### 方法

| 方法 | 说明 |
|------|------|
| `msg(key, ...args)` | 获取国际化文本 |
| `registerHook(name, callback)` | 注册钩子 |
| `unregisterHook(name, callback)` | 取消注册钩子 |
| `showNotification(message, type)` | 显示通知 (info/success/error) |
| `log(...args)` | 输出日志 |
| `error(...args)` | 输出错误 |
| `getSetting(key, default)` | 获取设置 |
| `setSetting(key, value)` | 保存设置 |

## 钩子列表

| 钩子名称 | 参数 | 说明 |
|----------|------|------|
| `onObjectAdd` | `(object)` | 对象被添加 |
| `onObjectDelete` | `(objectId)` | 对象被删除 |
| `onObjectUpdate` | `(object)` | 对象被更新 |
| `onSceneLoad` | `(sceneData)` | 场景被加载 |
| `onSceneSave` | `(sceneData)` | 场景被保存 |
| `onViewportRender` | `()` | 视口渲染 |
| `onToolbarRender` | `()` | 工具栏渲染 |
| `onPanelRender` | `()` | 面板渲染 |
| `onContextMenu` | `(event)` | 右键菜单 |
| `onKeyPress` | `(event)` | 按键事件 |
| `onMouseDown` | `(event)` | 鼠标按下 |
| `onMouseMove` | `(event)` | 鼠标移动 |
| `onMouseUp` | `(event)` | 鼠标释放 |
| `onAssetImport` | `(asset)` | 资源导入 |
| `onAssetDelete` | `(assetId)` | 资源删除 |

## 插件 API

### scene

```javascript
ctx.api.scene.getObjects()           // 获取所有对象
ctx.api.scene.setObjects(objects)    // 设置对象列表
ctx.api.scene.getSelectedId()        // 获取选中对象 ID
ctx.api.scene.setSelectedId(id)      // 设置选中对象
ctx.api.scene.addObject(object)      // 添加对象
ctx.api.scene.removeObject(id)       // 删除对象
ctx.api.scene.updateObject(id, updates) // 更新对象
ctx.api.scene.getObject(id)          // 获取对象
```

### assets

```javascript
ctx.api.assets.getAll()              // 获取所有资源
ctx.api.assets.setAll(assets)        // 设置资源列表
ctx.api.assets.add(asset)            // 添加资源
ctx.api.assets.remove(id)            // 删除资源
ctx.api.assets.get(id)               // 获取资源
```

### prefabs

```javascript
ctx.api.prefabs.getAll()             // 获取所有预制件
ctx.api.prefabs.setAll(prefabs)      // 设置预制件列表
ctx.api.prefabs.add(prefab)          // 添加预制件
ctx.api.prefabs.remove(id)           // 删除预制件
ctx.api.prefabs.get(id)              // 获取预制件
```

### ui

```javascript
ctx.api.ui.getTheme()                // 获取主题
ctx.api.ui.setTheme(theme)           // 设置主题
ctx.api.ui.getLocale()               // 获取语言
ctx.api.ui.setLocale(locale)         // 设置语言
ctx.api.ui.showNotification(msg, type) // 显示通知
```

### viewport

```javascript
ctx.api.viewport.getRef()            // 获取视口引用
ctx.api.viewport.getScene()          // 获取 Three.js 场景
ctx.api.viewport.getCamera()         // 获取相机
ctx.api.viewport.getRenderer()       // 获取渲染器
```

### utils

```javascript
ctx.api.utils.generateId()           // 生成唯一 ID
ctx.api.utils.deepClone(obj)         // 深拷贝
ctx.api.utils.debounce(fn, delay)    // 防抖
ctx.api.utils.throttle(fn, limit)    // 节流
```

## 示例：主题插件

```javascript
const THEME_ID = 'my-theme';

const themeDefinition = {
  id: THEME_ID,
  name: '我的主题',
  variables: {
    '--bg-dark': '#000000',
    '--bg-panel': '#111111',
    '--bg-toolbar': '#222222',
    '--accent': '#333333',
    '--text-primary': '#ffffff',
    '--text-secondary': '#aaaaaa',
    '--border': '#444444',
  }
};

const activate = async (ctx) => {
  const { registerTheme } = await import('../../../utils/themeManager.js');
  registerTheme(themeDefinition);
  return { themeId: THEME_ID };
};

const deactivate = async (ctx, instance) => {
  const { unregisterTheme } = await import('../../../utils/themeManager.js');
  unregisterTheme(instance.themeId);
};

export default { activate, deactivate };
```
