---
lang: zh-CN
title: React19新特性
description: React19新特性
---

## 并发渲染增强

### useDeferredValue

用于延迟非关键值的更新，避免昂贵渲染阻塞主线程。

useDeferredValue(value, initialValue?)

value参数是一个state值，在初始渲染期间，返回的延迟值是initialValue或者你提供的值。在更新期间，React 首先尝试使用旧值重新渲染（因此返回旧值），然后在后台尝试使用新值重新渲染（因此返回更新后的值）。

### useTransition

标记本次状态更新为低优先级，不阻塞其他状态更新与渲染，并提供isPending状态控制loading状态UI。

const [isPending, startTransition] = useTransition()

startTransition通过传递一个action函数，启动过渡更新，当执行startTransition时isPending为true，执行完毕自动切换为false。

## 新hook

### useActionState

可以根据某个表单动作的结果更新 state。

const [state, formAction, isPending] = useActionState(fn, initialState, permalink?)

在调用 useActionState 时在参数中传入现有的表单动作函数以及一个初始状态，无论 Action 是否在 pending 中，它都会返回一个新的 action 函数和一个 form state 以供在 form 中使用。这个新的 form state 也会作为参数传入提供的表单动作函数。

调用的fn函数会接收到表单的上一个 state（初始值为传入的 initialState 参数，否则为上一次执行完该函数的结果）作为函数的第一个参数，余下参数为普通表单动作接到的参数。

### useOptimistic

const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);

允许你在进行异步操作时显示不同 state。它接受 state 作为参数，并返回该 state 的副本，在异步操作（如网络请求）期间可以不同。你需要提供一个函数，该函数接受当前 state 和操作的输入，并返回在操作挂起期间要使用的乐观状态。

## 新API

### use

在渲染中读取资源，与Suspense结合使用，可以传递一个Promise，在组件渲染时暂停渲染，展示loading内容，知道Promise解析完成。

## 其他改动

### ref

1. 在React19中，可以在函数组件中将ref作为prop进行访问，不再需要forwardRef。
2. ref支持清理函数。

```tsx
<input
  ref={(ref) => {
    // ref 创建

    // 新特性: 当元素从 DOM 中被移除时
    // 返回一个清理函数来重置 ref
    return () => {
      // ref cleanup
    };
  }}
  />
```

1. 移除了字符串ref，采用回调的形式

```tsx
class MyComponent extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    return <input ref={input => this.input = input} />;
  }
  //render() {
  //return <input ref='input' />;
  //}
}
```

### Context

可以将 `<Context>` 作为上下文提供者，无需使用 `<Context.Provider>`


## 参考文档

https://juejin.cn/post/7457465059905880073