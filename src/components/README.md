# Components 组件目录

本目录包含 Astra 3D Engine 编辑器的所有 React 组件。

## 组件列表

### 面板组件

| 组件 | 文件 | 功能描述 |
|------|------|----------|
| **HierarchyPanel** | `HierarchyPanel.jsx` | 场景层级面板，显示场景对象树形结构，支持拖拽排序、父子关系、多选、右键菜单 |
| **InspectorPanel** | `InspectorPanel.jsx` | 属性检查器面板，编辑选中对象的位置、旋转、缩放、颜色等属性 |
| **AssetsPanel** | `AssetsPanel.jsx` | 资源管理面板，管理导入的模型、纹理等资源 |
| **PrefabsPanel** | `PrefabsPanel.jsx` | 预制件面板，管理和创建预制件 |
| **Viewport** | `Viewport.jsx` | 3D 视口组件，渲染场景、处理变换工具、相机控制 |
| **MultiViewport** | `MultiViewport.jsx` | 多视口布局组件，支持单视图/四视图切换 |

### UI 组件

| 组件 | 文件 | 功能描述 |
|------|------|----------|
| **Toolbar** | `Toolbar.jsx` | 顶部工具栏，包含菜单、变换工具、播放控制、主题切换等 |
| **CollapsiblePanel** | `CollapsiblePanel.jsx` | 可折叠面板容器，支持横向/纵向折叠 |
| **DropdownMenu** | `DropdownMenu.jsx` | 下拉菜单组件，用于菜单和添加对象按钮 |
| **Dialog** | `Dialog.jsx` | 自定义对话框组件，替代浏览器原生弹窗 |
| **Toast** | `Toast.jsx` | Toast 通知组件，显示操作反馈 |
| **InfoModal** | `InfoModal.jsx` | 信息弹窗组件，显示关于、隐私政策等信息 |

### 设置组件

| 组件 | 文件 | 功能描述 |
|------|------|----------|
| **PreferencesModal** | `PreferencesModal.jsx` | 偏好设置弹窗，编辑器全局设置 |
| **PluginSettingsModal** | `PluginSettingsModal.jsx` | 插件设置弹窗，管理插件启用/禁用 |
| **SnapshotsModal** | `SnapshotsModal.jsx` | 快照管理弹窗，管理场景快照 |

## 组件关系图

```
App.jsx
├── Toolbar
│   ├── DropdownMenu (文件、编辑、视图菜单)
│   └── 变换工具按钮
├── CollapsiblePanel (左侧面板)
│   ├── HierarchyPanel
│   └── PrefabsPanel
├── MultiViewport
│   └── Viewport × N
├── CollapsiblePanel (右侧面板)
│   ├── InspectorPanel
│   └── AssetsPanel
├── Dialog
├── Toast
├── PreferencesModal
├── PluginSettingsModal
└── InfoModal
```

## 关键功能实现

### HierarchyPanel 层级面板

- **拖拽排序**：通过 `dragstart`、`dragover`、`drop` 事件实现
- **父子关系**：拖拽到中间区域创建父子关系，通过 `parentId` 属性关联
- **展开/折叠**：单击箭头图标或双击父对象展开/折叠子对象
- **多选**：Ctrl+点击多选，Delete 键批量删除
- **右键菜单**：重命名、复制、粘贴、删除、创建预制件

### Viewport 视口

- **相机控制**：OrbitControls 实现视角旋转、平移、缩放
- **变换工具**：TransformControls 实现移动、旋转、缩放
- **多选同步变换**：围绕几何中心同步变换多个对象
- **场景拾取**：Raycaster 实现点击选择对象
- **定向球**：26面体截角截棱立方体，点击跳转视角

### InspectorPanel 属性面板

- **动态属性编辑**：根据选中对象类型显示不同属性
- **父对象选择**：下拉菜单选择父对象，自动展开父对象
- **预制件覆盖**：显示覆盖属性，支持断开预制件连接

## 样式文件

每个组件的样式在 `src/styles/` 目录下：

- `hierarchy.css` - HierarchyPanel 样式
- `inspector.css` - InspectorPanel 样式
- `assets.css` - AssetsPanel 样式
- `panel.css` - PrefabsPanel 样式
- `viewport.css` - Viewport 样式
- `toolbar.css` - Toolbar 样式
- `modal.css` - 弹窗样式
- `dropdown.css` - DropdownMenu 样式
