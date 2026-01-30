# Vue 3 基础笔记

## 什么是 Vue 3？

Vue 3 是一个用于构建用户界面的渐进式 JavaScript 框架。它在 Vue 2 的基础上进行了重大升级，带来了更好的性能和更强大的功能。

## 核心特性

### 1. Composition API

Composition API 是 Vue 3 引入的最重要特性之一，它提供了一种更灵活的方式来组织组件逻辑。

```javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)
    
    function increment() {
      count.value++
    }
    
    return { count, double, increment }
  }
}
```

### 2. 响应式系统

Vue 3 使用 Proxy 重写了响应式系统，相比 Vue 2 的 `Object.defineProperty` 有以下优势：

- 可以检测到属性的添加和删除
- 可以监听数组索引和 length 的变化
- 性能更好

### 3. `<script setup>` 语法糖

这是一种更简洁的组件编写方式：

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
</template>
```

## 生命周期钩子

Vue 3 中的生命周期钩子：

- `onBeforeMount` - 挂载前
- `onMounted` - 挂载后
- `onBeforeUpdate` - 更新前
- `onUpdated` - 更新后
- `onBeforeUnmount` - 卸载前
- `onUnmounted` - 卸载后

## 总结

Vue 3 带来了很多改进，Composition API 让代码组织更加灵活，性能也有显著提升。对于新项目，强烈推荐使用 Vue 3！
