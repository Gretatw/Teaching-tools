const fs = require('fs');
const path = require('path');

// 設定專案根目錄
const rootDir = path.resolve(__dirname, '..');
const outputFilePath = path.join(rootDir, 'README.md');

// 排除不分析的資料夾
const excludeDirs = ['generate-docs', '.git', 'node_modules'];

function analyzeProjects() {
    const folders = fs.readdirSync(rootDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && !excludeDirs.includes(dirent.name))
        .map(dirent => dirent.name);

    let content = `# 教室教學工具組 (Classroom Teaching Tools)\n\n`;
    content += `## 1. 專案目的 (Project Purpose)\n`;
    content += `本專案旨在建立一套現代化、美觀且易於使用的教學輔助工具，協助老師在課堂上進行互動、計時與管理。\n\n`;

    content += `## 2. 實作步驟 (Implementation Steps)\n`;
    content += `1. **模組化開發**：針對不同教學需求（如分組、計時、公告）建立獨立專案資料夾。\n`;
    content += `2. **前端實作**：使用標準 HTML5、CSS3 (Vanilla CSS) 與原生 JavaScript 進行開發，確保相容性與流暢度。\n`;
    content += `3. **視覺優化**：採用現代化的設計美學，包含漸層背景、微動畫以及深色模式支援。\n`;
    content += `4. **自動化文件**：透過 \`generate-docs\` 工作流分析專案結構並生成說明文件。\n\n`;

    content += `## 3. 專案清單 (Project List)\n`;
    folders.forEach(folder => {
        content += `- **${folder}**: 點擊進入該工具目錄進行查看。\n`;
    });
    content += `\n`;

    content += `## 4. 注意事項 (Notes)\n`;
    content += `- **語系支援**：所有工具介面與說明均優先支援繁體中文 (zh-TW)。\n`;
    content += `- **行動裝置**：所有頁面均具備響應式設計，適合平板與手機操作。\n`;
    content += `- **效能考量**：避免使用笨重的框架，保持載入速度與運作效率。\n`;

    fs.writeFileSync(outputFilePath, content, 'utf8');
    console.log(`✅ 成功生成文件：${outputFilePath}`);
}

analyzeProjects();
