# Hooks 自定义 Hooks 目录

本目录包含 Astra 3D Engine 编辑器的自定义 React Hooks。

## Hooks 列表

| Hook | 文件 | 功能描述 |
|------|------|----------|
| **useHistory** | `useHistory.jsx` | Undo/Redo 历史记录管理 |
| **useToast** | `useToast.jsx` | Toast 通知管理 |
| **useDialog** | `useDialog.jsx` | Dialog 对话框管理 |
| **useAutoSave** | `useAutoSave.js` | 自动保存功能 |
| **useRecentProjects** | `useRecentProjects.js` | 最近项目列表管理 |

## 详细说明

### useHistory

Undo/Redo 历史记录管理 Hook。

```javascript
const {
  state,           // 当前状态
  setState,        // 设置状态（记录历史）
  undo,            // 撤销
  redo,            // 重做
  canUndo,         // 是否可撤销
  canRedo          // 是否可重做
} = useHistory(initialState);
```

**使用场景**：
- 场景对象变更历史
- 属性编辑历史
- 支持批量操作合并

### useToast

Toast 通知管理 Hook。

```javascript
const {
  toasts,          // Toast 列表
  addToast,        // 添加 Toast
  removeToast      // 移除 Toast
} = useToast();
```

**使用场景**：
- 操作成功/失败提示
- 加载状态提示
- 自动消失的通知

### useDialog

Dialog 对话框管理 Hook。

```javascript
const {
  dialog,          // 当前对话框配置
  showDialog,      // 显示对话框
  hideDialog,      // 隐藏对话框
  confirm,         // 确认对话框
  alert            // 警示对话框
} = useDialog();
```

**使用场景**：
- 删除确认
- 保存提示
- 自定义对话框

### useAutoSave

自动保存功能 Hook。

```javascript
const {
  lastSaveTime,    // 上次保存时间
  saveNow          // 立即保存
} = useAutoSave({
  data,            // 要保存的数据
  interval,        // 保存间隔（毫秒）
  onSave           // 保存回调
});
```

**使用场景**：
- 场景自动保存
- 设置持久化

### useRecentProjects

最近项目列表管理 Hook。

```javascript
const {
  recentProjects,  // 最近项目列表
  addProject,      // 添加项目
  removeProject,   // 移除项目
  clearProjects    // 清空列表
} = useRecentProjects();
```

**使用场景**：
- 文件菜单最近项目列表
- 启动页最近项目

## 使用示例

### 在组件中使用 useHistory

```jsx
import { useHistory } from '../hooks/useHistory';

function MyComponent() {
  const { state, setState, undo, redo, canUndo, canRedo } = useHistory([]);
  
  const handleAdd = () => {
    setState([...state, newItem]);
  };
  
  return (
    <div>
      <button onClick={undo} disabled={!canUndo}>撤销</button>
      <button onClick={redo} disabled={!canRedo}>重做</button>
      <button onClick={handleAdd}>添加</button>
    </div>
  );
}
```

### 在组件中使用 useToast

```jsx
import { useToast } from '../hooks/useToast';

function MyComponent() {
  const { addToast } = useToast();
  
  const handleSave = async () => {
    try {
      await saveData();
      addToast('保存成功', 'success');
    } catch (err) {
      addToast('保存失败: ' + err.message, 'error');
    }
  };
  
  return <button onClick={handleSave}>保存</button>;
}
```
