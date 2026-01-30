# TypeScript 实用技巧

## 类型推断

TypeScript 有强大的类型推断能力，很多时候不需要显式声明类型。

```typescript
// TS 会自动推断 x 为 number 类型
let x = 10

// 自动推断返回类型为 number
function add(a: number, b: number) {
  return a + b
}
```

## 联合类型与类型守卫

使用联合类型处理多种可能的类型：

```typescript
type Status = 'pending' | 'success' | 'error'

function handleStatus(status: Status) {
  switch (status) {
    case 'pending':
      console.log('加载中...')
      break
    case 'success':
      console.log('成功！')
      break
    case 'error':
      console.log('出错了')
      break
  }
}
```

## 泛型的妙用

泛型让代码更加灵活和可复用：

```typescript
function identity<T>(arg: T): T {
  return arg
}

const result = identity<string>('hello')
const num = identity(42) // TS 自动推断为 number
```

## 实用工具类型

TypeScript 内置了很多实用的工具类型：

```typescript
interface User {
  id: number
  name: string
  email: string
  age?: number
}

// Partial - 所有属性变为可选
type PartialUser = Partial<User>

// Required - 所有属性变为必选
type RequiredUser = Required<User>

// Pick - 挑选部分属性
type UserBasic = Pick<User, 'id' | 'name'>

// Omit - 排除部分属性
type UserWithoutEmail = Omit<User, 'email'>
```

## 总结

掌握这些 TypeScript 技巧，可以让你的代码更加类型安全、易于维护！
