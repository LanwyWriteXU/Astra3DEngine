# Icons 图标目录

本目录包含 Astra 3D Engine 编辑器的所有 SVG 图标。

## 图标规范

- **格式**：SVG
- **尺寸**：16×16（viewBox="0 0 24 24"）
- **样式**：现代扁平风格
- **颜色**：使用 `currentColor` 继承父元素颜色
- **描边**：`stroke-width="2"`，圆角连接

## 图标分类

### 基础对象图标

| 图标 | 文件 | 用途 |
|------|------|------|
| 🧊 | `cube.svg` | 立方体对象 |
| 🔵 | `sphere.svg` | 球体对象 |
| 📄 | `plane.svg` | 平面对象 |
| 📦 | `model.svg` | 导入模型 |

### 变换工具图标

| 图标 | 文件 | 用途 |
|------|------|------|
| ✥ | `move.svg` | 移动工具 |
| ↻ | `rotate.svg` | 旋转工具 |
| ⤢ | `scale.svg` | 缩放工具 |
| ⬡ | `uniform-scale.svg` | 等比缩放 |
| ⊡ | `select.svg` | 选择工具 |

### 文件操作图标

| 图标 | 文件 | 用途 |
|------|------|------|
| 📁 | `folder.svg` | 文件夹 |
| 📄 | `file.svg` | 文件 |
| ➕ | `plus.svg` | 添加 |
| 📥 | `import.svg` | 导入 |
| 📤 | `export.svg` | 导出 |
| 💾 | `save.svg` | 保存 |
| 📋 | `save-as.svg` | 另存为 |
| 🆕 | `new-project.svg` | 新建项目 |
| 📂 | `open-project.svg` | 打开项目 |
| 🕐 | `recent.svg` | 最近项目 |

### 编辑操作图标

| 图标 | 文件 | 用途 |
|------|------|------|
| 📋 | `copy.svg` | 复制 |
| 📥 | `paste.svg` | 粘贴 |
| 📑 | `duplicate.svg` | 复制对象 |
| ✏️ | `rename.svg` | 重命名 |
| 🗑️ | `delete.svg` | 删除 |
| ↩️ | `undo.svg` | 撤销 |
| ↪️ | `redo.svg` | 重做 |
| ✏️ | `edit.svg` | 编辑 |

### 播放控制图标

| 图标 | 文件 | 用途 |
|------|------|------|
| ▶️ | `play.svg` | 播放 |
| ⏹️ | `stop.svg` | 停止 |

### 预制件图标

| 图标 | 文件 | 用途 |
|------|------|------|
| 🧩 | `prefab.svg` | 预制件 |
| 🔗 | `prefab-instance.svg` | 预制件实例 |
| 🧩 | `puzzle.svg` | 插件 |

### 视图布局图标

| 图标 | 文件 | 用途 |
|------|------|------|
| □ | `layout-single.svg` | 单视图 |
| ⬜ | `layout-quad.svg` | 四视图 |

### UI 控件图标

| 图标 | 文件 | 用途 |
|------|------|------|
| ✕ | `close.svg` | 关闭 |
| 🔍 | `search.svg` | 搜索 |
| ⚙️ | `settings.svg` | 设置 |
| 🌐 | `language.svg` | 语言 |
| 🎨 | `theme.svg` | 主题 |
| 📷 | `snapshot.svg` | 快照 |
| 🖼️ | `image.svg` | 图片 |

### 展开折叠图标

| 图标 | 文件 | 用途 |
|------|------|------|
| ▶ | `chevron-collapsed.svg` | 折叠状态（向右箭头） |
| ▼ | `chevron-down.svg` | 向下箭头 |
| ▶ | `chevron-right.svg` | 向右箭头 |

### 窗口控制图标（Electron）

| 图标 | 文件 | 用途 |
|------|------|------|
| ➖ | `window-minimize.svg` | 最小化 |
| ⬜ | `window-maximize.svg` | 最大化 |
| ❐ | `window-restore.svg` | 还原 |
| ✕ | `window-close.svg` | 关闭 |

### 标签图标

| 图标 | 文件 | 用途 |
|------|------|------|
| 🏷️ | `tag-all.svg` | 全部标签 |
| ⚠️ | `tag-danger.svg` | 危险标签 |
| 🐛 | `tag-debug.svg` | 调试标签 |
| 🆕 | `tag-new.svg` | 新建标签 |
| ⭐ | `tag-recommended.svg` | 推荐标签 |
| 🎨 | `tag-theme.svg` | 主题标签 |

### 快捷键提示图标

| 图标 | 文件 | 用途 |
|------|------|------|
| A | `key-a.svg` | A 键 |
| D | `key-d.svg` | D 键 |
| E | `key-e.svg` | E 键 |
| Q | `key-q.svg` | Q 键 |
| S | `key-s.svg` | S 键 |
| W | `key-w.svg` | W 键 |
| ⇧ | `key-shift.svg` | Shift 键 |

### 鼠标提示图标

| 图标 | 文件 | 用途 |
|------|------|------|
| 🖱️ | `mouse-left.svg` | 左键 |
| 🖱️ | `mouse-right.svg` | 右键 |

## 使用方法

### 在 React 组件中使用

使用 Vite 的 `?react` 后缀导入 SVG 为 React 组件：

```jsx
import IconCube from '../icons/cube.svg?react';
import IconDelete from '../icons/delete.svg?react';

function MyComponent() {
  return (
    <div>
      <IconCube className="icon" />
      <button>
        <IconDelete className="btn-icon" />
        删除
      </button>
    </div>
  );
}
```

### 样式控制

图标颜色通过 CSS `color` 属性控制：

```css
.icon {
  width: 16px;
  height: 16px;
  color: var(--text-primary);
}

.icon:hover {
  color: var(--accent-active);
}
```

## 添加新图标

1. 创建 SVG 文件，遵循图标规范
2. 使用 `currentColor` 作为颜色
3. 设置 `viewBox="0 0 24 24"`
4. 在组件中导入使用

## SVG 模板

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- 图标路径 -->
</svg>
```
