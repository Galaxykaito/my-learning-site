// 自动加载 src/notes 下所有 md 文件（扁平化，不分目录）
const markdownFiles = import.meta.glob('./notes/*.md', {
  as: 'raw',
  eager: false
})

// 从文件路径解析笔记信息
function parseNoteFromPath(path) {
  // 路径格式: ./notes/filename.md
  const match = path.match(/\.\/notes\/([^\/]+)\.md$/)
  if (!match) return null
  
  const slug = match[1]
  
  // 生成默认标题（将 slug 转成可读格式）
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  return {
    slug,
    title,
    description: '',
    tags: [],
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  }
}

// 获取所有笔记列表（自动扫描）
export function getAllNotes() {
  const notes = []
  
  for (const path in markdownFiles) {
    const noteInfo = parseNoteFromPath(path)
    if (noteInfo) {
      notes.push(noteInfo)
    }
  }
  
  return notes
}

// 根据 slug 获取笔记元信息
export function getNoteMeta(slug) {
  const allNotes = getAllNotes()
  return allNotes.find(n => n.slug === slug)
}

// 加载笔记内容
export async function loadNoteContent(slug) {
  const key = `./notes/${slug}.md`
  const loader = markdownFiles[key]

  if (!loader) {
    throw new Error(`笔记未找到: ${slug}`)
  }
  
  return await loader()
}
