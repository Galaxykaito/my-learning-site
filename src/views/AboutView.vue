<script setup>
</script>

<template>
  <main class="about-wrapper">
    <div class="about-container">
      <h1 class="about-title">关于我</h1>
      
      <section class="about-content">
        <p>
          这是一个用 Vue 3 + Vite 搭建的个人学习笔记站。
        </p>
        <p>
          在这里记录我的学习内容。
        </p>
        <p>
          如果你也对这些内容感兴趣，欢迎一起交流学习！
        </p>
      </section>

      <div class="back-link">
        <router-link to="/">← 返回首页</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
.about-wrapper {
  min-height: 100vh;
  padding: 48px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe4e9 50%, #fff0f3 100%);
  position: relative;
}

.about-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 40% 50%, rgba(255, 200, 200, 0.3), transparent 60%),
    radial-gradient(circle at 60% 60%, rgba(239, 48, 134, 0.15), transparent 60%);
  pointer-events: none;
}

.about-container {
  width: 100%;
  max-width: 700px;
  padding: 40px 32px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(231, 76, 60, 0.1);
  box-shadow: 0 4px 20px rgba(231, 76, 60, 0.15);
  position: relative;
  z-index: 1;
}

.about-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 32px;
  letter-spacing: 0.03em;
  background: linear-gradient(135deg, #e74c3c 0%, #ff6b9d 50%, #e74c3c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.about-content {
  color: #555;
  line-height: 1.8;
  font-size: 16px;
}

.about-content p {
  margin: 16px 0;
}

.back-link {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(231, 76, 60, 0.2);
}

.back-link a {
  color: #e74c3c;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(231, 76, 60, 0.3);
}

.back-link a:hover {
  color: #c0392b;
  border-bottom-color: #c0392b;
}
</style>
