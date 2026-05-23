# Utils 工具函数目录

本目录包含 Astra 3D Engine 编辑器的工具函数。

## 工具列表

| 工具 | 文件 | 功能描述 |
|------|------|----------|
| **themeManager** | `themeManager.js` | 主题管理器，处理主题切换和持久化 |
| **projectExporter** | `projectExporter.js` | 项目导出工具，导出为 .astra 文件 |
| **recentProjectsDB** | `recentProjectsDB.js` | 最近项目数据库，管理最近打开的项目列表 |

## 详细说明

### themeManager.js

主题管理器，处理主题切换和持久化。

```javascript
import { 
  getTheme,        // 获取当前主题
  setTheme,        // 设置主题
  onThemeChange    // 监听主题变化
} from '../utils/themeManager';

// 获取当前主题
const theme = getTheme(); // 'dark' | 'light'

// 设置主题
setTheme('dark');

// 监听主题变化
onThemeChange((newTheme) => {
  console.log('主题切换为:', newTheme);
});
```

**功能**：
- 从 LocalStorage 读取保存的主题
- 设置 `data-theme` 属性
- 持久化主题选择
- 触发主题变化事件

### projectExporter.js

项目导出工具，导出为 .astra 压缩包。

```javascript
import { 
  exportProject,   // 导出项目
  importProject    // 导入项目
} from '../utils/projectExporter';

// 导出项目
await exportProject({
  name: 'MyProject',
  scene: sceneData,
  assets: assetList
});

// 导入项目
const project = await importProject(file);
```

**功能**：
- 收集项目数据（场景、资源、设置）
- 创建 JSON 结构
- 使用 JSZip 压缩为 .astra 文件
- 触发下载

### recentProjectsDB.js

最近项目数据库，管理最近打开的项目列表。

```javascript
import { 
  getRecentProjects,   // 获取最近项目列表
  addRecentProject,    // 添加项目
  removeRecentProject, // 移除项目
  clearRecentProjects  // 清空列表
} from '../utils/recentProjectsDB';

// 获取最近项目列表
const projects = await getRecentProjects();

// 添加项目
await addRecentProject({
  name: 'MyProject',
  path: '/path/to/project.astra',
  lastOpened: Date.now()
});

// 移除项目
await removeRecentProject(projectId);

// 清空列表
await clearRecentProjects();
```

**功能**：
- 使用 IndexedDB 存储项目列表
- 按打开时间排序
- 限制最大数量（如 10 个）
- 提供增删改查接口

## 使用场景

### themeManager

在 Toolbar 或设置面板中切换主题：

```jsx
import { setTheme, getTheme } from '../utils/themeManager';

function ThemeToggle() {
  const [theme, setThemeState] = useState(getTheme());
  
  const toggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setThemeState(newTheme);
  };
  
  return <button onClick={toggle}>切换主题</button>;
}
```

### projectExporter

在文件菜单中导出项目：

```jsx
import { exportProject } from '../utils/projectExporter';

function FileMenu() {
  const handleExport = async () => {
    try {
      await exportProject(currentProject);
      addToast('导出成功', 'success');
    } catch (err) {
      addToast('导出失败: ' + err.message, 'error');
    }
  };
  
  return <button onClick={handleExport}>导出项目</button>;
}
```

### recentProjectsDB

在文件菜单中显示最近项目：

```jsx
import { getRecentProjects } from '../utils/recentProjectsDB';

function RecentProjectsMenu() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    getRecentProjects().then(setProjects);
  }, []);
  
  return (
    <ul>
      {projects.map(p => (
        <li key={p.id} onClick={() => openProject(p)}>
          {p.name}
        </li>
      ))}
    </ul>
  );
}
```

## 扩展工具

添加新工具函数时：

1. 创建新文件（如 `newUtil.js`）
2. 导出函数
3. 在使用处导入
4. 更新本 README

## 工具函数规范

1. **纯函数**：尽量使用纯函数，无副作用
2. **错误处理**：抛出有意义的错误
3. **类型安全**：使用 JSDoc 或 TypeScript
4. **文档注释**：添加函数说明和参数说明
