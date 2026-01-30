<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { getNoteMeta, loadNoteContent } from '../notes-loader'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug

const meta = getNoteMeta(slug)
const html = ref('')
const loading = ref(true)
const error = ref('')

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true
})

onMounted(async () => {
  try {
    let raw = await loadNoteContent(slug)
    // 移除 Markdown 中的第一个 h1 标题（避免和页面标题重复）
    raw = raw.replace(/^#\s+.+$/m, '')
    html.value = md.render(raw)
  } catch (e) {
    error.value = e.message || '加载笔记失败'
  } finally {
    loading.value = false
  }
})

const pageTitle = computed(() => meta?.title ?? slug)

function goBack() {
  router.push({ name: 'home' })
}
</script>

<template>
  <main class="page-wrapper">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">
      ← 返回首页
    </button>

    <!-- 加载中 -->
    <section v-if="loading" class="note-container">
      <div class="loading">加载中...</div>
    </section>

    <!-- 错误提示 -->
    <section v-else-if="error" class="note-container">
      <div class="error">{{ error }}</div>
    </section>

    <!-- 正文内容 -->
    <section v-else class="note-container">
      <header class="note-header">
        <h1 class="note-title">{{ pageTitle }}</h1>
        <p class="note-meta">
          <span v-if="meta?.category" class="category">{{ meta.category }}</span>
          <span v-if="meta?.tags?.length" class="tags"># {{ meta.tags.join(' · ') }}</span>
          <span v-if="meta?.updatedAt" class="date">最后更新：{{ meta.updatedAt }}</span>
        </p>
      </header>

      <article class="note-content" v-html="html"></article>
    </section>
  </main>
</template>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  width: 100%;
  padding: 48px 16px;
  background: 
    linear-gradient(135deg, rgba(255, 250, 250, 0.98) 0%, rgba(255, 245, 248, 0.95) 100%),
    url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(231,76,60,0.02)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grid)"/%3E%3C/svg%3E');
  background-attachment: fixed;
  position: relative;
}

/* 细微的粉色光晕 */
.page-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 40%, rgba(255, 200, 200, 0.06), transparent 60%);
  pointer-events: none;
}

.back-btn {
  position: fixed;
  top: 24px;
  left: 24px;
  padding: 10px 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, #e74c3c 0%, #d63447 100%);
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.25);
}

.back-btn:hover {
  background: linear-gradient(135deg, #d63447 0%, #c0392b 100%);
  transform: translateX(-4px);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.35);
}

.note-container {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  padding: 40px 36px;
  border-radius: 16px;
  background: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 252, 253, 0.95) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(231, 76, 60, 0.08);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(231, 76, 60, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  position: relative;
  z-index: 1;
}

.note-header {
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(231, 76, 60, 0.12);
}

.note-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #d63447 0%, #e74c3c 40%, #ff6b6b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.3;
}

.note-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 13px;
  color: #7f8c8d;
}

.category {
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(231, 76, 60, 0.06);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.12);
  font-weight: 500;
}

.tags {
  color: #e74c3c;
  font-weight: 500;
}

.date {
  opacity: 0.8;
}

.loading,
.error {
  text-align: center;
  font-size: 16px;
  color: #7f8c8d;
  padding: 40px 0;
}

.error {
  color: #e74c3c;
}

/* Markdown 内容样式 */
.note-content {
  line-height: 1.8;
  font-size: 16px;
  color: #34495e;
  text-align: left;
}

.note-content :deep(h1) {
  font-size: 32px;
  font-weight: 700;
  margin: 32px 0 16px;
  color: #2c3e50;
}

.note-content :deep(h2) {
  font-size: 26px;
  font-weight: 600;
  margin: 28px 0 14px;
  color: #2c3e50;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(231, 76, 60, 0.12);
}

.note-content :deep(h3) {
  font-size: 22px;
  font-weight: 600;
  margin: 24px 0 12px;
  color: #34495e;
}

.note-content :deep(p) {
  margin: 16px 0;
  color: #555;
}

.note-content :deep(ul),
.note-content :deep(ol) {
  margin: 16px 0;
  padding-left: 28px;
}

.note-content :deep(li) {
  margin: 8px 0;
  color: #555;
}

.note-content :deep(code) {
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(231, 76, 60, 0.06);
  color: #d63447;
  font-family: 'Consolas', 'Monaco', 'SF Mono', monospace;
  font-size: 14px;
  border: 1px solid rgba(231, 76, 60, 0.1);
  font-weight: 500;
}

.note-content :deep(pre) {
  margin: 20px 0;
  padding: 20px;
  border-radius: 12px;
  background: rgba(248, 249, 250, 0.9);
  overflow-x: auto;
  border: 1px solid rgba(231, 76, 60, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.note-content :deep(pre code) {
  padding: 0;
  background: transparent;
  color: #2c3e50;
  font-size: 14px;
  line-height: 1.6;
  border: none;
  font-weight: 400;
}

.note-content :deep(blockquote) {
  margin: 20px 0;
  padding: 16px 20px;
  border-left: 3px solid #e74c3c;
  background: rgba(255, 250, 250, 0.6);
  border-radius: 0 8px 8px 0;
  color: #555;
  box-shadow: 0 1px 4px rgba(231, 76, 60, 0.05);
}

.note-content :deep(a) {
  color: #e74c3c;
  text-decoration: none;
  border-bottom: 1px solid rgba(231, 76, 60, 0.3);
  transition: all 0.2s ease;
  font-weight: 500;
}

.note-content :deep(a:hover) {
  color: #d63447;
  border-bottom-color: #d63447;
}

.note-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 20px 0;
  border: 1px solid rgba(231, 76, 60, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.note-content :deep(table) {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(231, 76, 60, 0.1);
}

.note-content :deep(th),
.note-content :deep(td) {
  padding: 12px 16px;
  border: 1px solid rgba(231, 76, 60, 0.08);
}

.note-content :deep(th) {
  background: rgba(231, 76, 60, 0.06);
  color: #2c3e50;
  font-weight: 600;
}

.note-content :deep(tr:hover) {
  background: rgba(255, 250, 250, 0.5);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .back-btn {
    top: 16px;
    left: 16px;
    padding: 8px 16px;
    font-size: 13px;
  }

  .note-container {
    padding: 24px 20px;
  }

  .note-title {
    font-size: 28px;
  }

  .note-content {
    font-size: 15px;
  }

  .note-content :deep(h1) {
    font-size: 26px;
  }

  .note-content :deep(h2) {
    font-size: 22px;
  }

  .note-content :deep(h3) {
    font-size: 18px;
  }
}
</style>
