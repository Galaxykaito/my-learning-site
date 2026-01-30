<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getAllNotes } from '../notes-loader'

const router = useRouter()
const allNotes = computed(() => getAllNotes())

function goToNote(slug) {
  router.push({ name: 'note', params: { slug } })
}
</script>

<template>
  <main class="home-wrapper">
    <!-- 顶部标题区 -->
    <section class="hero">
      <div class="avatar-container">
        <img src="../assets/lunar_doctor.jpg" alt="烛黄" class="avatar" />
        <div class="avatar-glow"></div>
      </div>
      <h1 class="hero-title">烛黄</h1>
      <p class="hero-subtitle">
        烛黄的个人网站，会分享一些心得和自己做的好东西 b（￣▽￣）d
      </p>
    </section>

    <!-- 笔记列表 -->
    <section class="notes-container">
      <div
        v-for="note in allNotes"
        :key="note.slug"
        class="note-card"
        @click="goToNote(note.slug)"
      >
        <h2 class="note-card-title">{{ note.title }}</h2>
        <p v-if="note.description" class="note-card-desc">{{ note.description }}</p>
        <div class="note-card-meta">
          <span v-if="note.tags?.length" class="tags">
            {{ note.tags.join(' · ') }}
          </span>
          <span class="date">{{ note.updatedAt }}</span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: 
    linear-gradient(135deg, rgba(255, 250, 250, 0.98) 0%, rgba(255, 240, 245, 0.95) 100%),
    url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(231,76,60,0.02)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grid)"/%3E%3C/svg%3E');
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
}

/* 细微的粉色光晕 */
.home-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(255, 182, 193, 0.08), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(231, 76, 60, 0.05), transparent 50%);
  pointer-events: none;
}

/* 顶部标题区 - 固定不滚动 */
.hero {
  flex-shrink: 0;
  text-align: center;
  padding: 48px 24px 32px;
  position: relative;
  z-index: 1;
}

/* 头像容器 */
.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(231, 76, 60, 0.3);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 0 20px rgba(231, 76, 60, 0.2);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  border-color: rgba(231, 76, 60, 0.5);
  box-shadow: 
    0 6px 16px rgba(0, 0, 0, 0.2),
    0 0 30px rgba(231, 76, 60, 0.3);
}

/* 头像光晕 */
.avatar-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(231, 76, 60, 0.15), transparent 70%);
  animation: avatarPulse 3s ease-in-out infinite;
  z-index: 1;
}

@keyframes avatarPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.3;
  }
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #d63447 0%, #e74c3c 30%, #ff6b6b 70%, #d63447 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-transform: uppercase;
  position: relative;
  filter: drop-shadow(0 2px 4px rgba(231, 76, 60, 0.1));
}

.hero-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(231, 76, 60, 0.4), transparent);
  margin: 20px auto 0;
}

.hero-subtitle {
  font-size: 15px;
  color: #888;
  letter-spacing: 0.05em;
  font-weight: 400;
}

/* 笔记列表容器 - 可滚动区域 */
.notes-container {
  flex: 1;
  overflow-y: auto;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
}

/* 滚动条样式 */
.notes-container::-webkit-scrollbar {
  width: 8px;
}

.notes-container::-webkit-scrollbar-track {
  background: rgba(231, 76, 60, 0.05);
  border-radius: 4px;
}

.notes-container::-webkit-scrollbar-thumb {
  background: rgba(231, 76, 60, 0.3);
  border-radius: 4px;
  transition: background 0.3s;
}

.notes-container::-webkit-scrollbar-thumb:hover {
  background: rgba(231, 76, 60, 0.5);
}

/* 笔记卡片 */
.note-card {
  padding: 24px 28px;
  border-radius: 12px;
  background: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 250, 250, 0.9) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(231, 76, 60, 0.08);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(231, 76, 60, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  position: relative;
}

.note-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #e74c3c, #ff6b6b);
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 12px 0 0 12px;
}

.note-card:hover::before {
  opacity: 1;
}

.note-card:hover {
  transform: translateX(4px);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.06),
    0 12px 40px rgba(231, 76, 60, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 1);
  border-color: rgba(231, 76, 60, 0.15);
}

.note-card-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: 0.02em;
  margin-bottom: 12px;
  transition: color 0.3s;
}

.note-card:hover .note-card-title {
  color: #e74c3c;
}

.note-card-desc {
  font-size: 14px;
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 12px;
}

.note-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #95a5a6;
  padding-top: 12px;
  border-top: 1px solid rgba(231, 76, 60, 0.06);
}

.tags {
  color: #e74c3c;
  font-weight: 500;
}

.date {
  opacity: 0.8;
}

/* 入场动画 */
@keyframes noteEntrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.note-card {
  animation: noteEntrance 0.5s ease-out both;
}

.note-card:nth-child(1) { animation-delay: 0.05s; }
.note-card:nth-child(2) { animation-delay: 0.1s; }
.note-card:nth-child(3) { animation-delay: 0.15s; }
.note-card:nth-child(4) { animation-delay: 0.2s; }
.note-card:nth-child(5) { animation-delay: 0.25s; }

/* 响应式适配 */
@media (max-width: 768px) {
  .hero {
    padding: 32px 16px 24px;
  }

  .hero-title {
    font-size: 36px;
  }

  .avatar-container {
    width: 100px;
    height: 100px;
  }

  .notes-container {
    padding: 0 16px 32px;
  }

  .note-card {
    padding: 20px 20px;
  }
}
</style>
