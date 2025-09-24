---
lang: zh-CN
title: TypeScript
description: TypeScript
---

## type和interface的区别

**type**:类型别名，用来给一个类型起新名字，使用 type 创建类型别名。**类型别名不仅可以用来表示基本类型，还可以用来表示对象类型、联合类型、元组和交集。**

```ts
type userName = string;//可以用在基本数据类型
type userMsg = string | number;//可以用在联合类型
type Data = [number, string];//可以用在元组
type myType = typeof someObj;//可以使用typeof定义
type Person {
	name: string
}
```

**interface**:接口，**命名数据结构**（例如对象）的另一种方式；与 type 不同，interface 仅限于描述对象类型。接口的声明语法也不同于类型别名的声明语法。

```ts
//interface 可以声明合并。
interface test {
	name: string
}
interface test {
	age: number
}
//实际test
interface test {
    name: string
	age: number
}
```

多次声明同名接口，ts会做声明合并

```ts
interface Person { name: string }
interface Person { age: number }
let user: Person = {
    name: "Tolu",
    age: 0,
};
```

而使用type，则会报错

```ts
type Person { name: string };  
// Error: 标识符“Person”重复。ts(2300)
type Person { age: number }
```

### 总结

1.type允许重命名基本类型，对象，元组，联合类型，而interface只允许定义对象类型

2.interface会做声明合并，type同名报错

3.都支持继承，对type的继承使用&类型联合

## any、unknown、never的区别

### any

any表示可以是任何类型，被any修饰的变量可以被赋予任何类型的值；同时，它也可以赋值给其它类型的变量，造成**类型污染**

```ts
let a:any = "abcd";
let b:number = 1;
b = a;//不报错
```

### unknown

unknown表示类型不确定，与any一样可以是任何类型，但是多了一些限制，可以说是升级版的any。unknown类型的变量可以被赋予任何类型的值，但**unknown变量不允许赋值给其它类型的变量，避免了类型污染**

```ts
let v: unknown = 123;
let v1: boolean = v; // 报错
let v2: number = v; // 报错
```

`unknown`类型变量能够进行的运算是有限的，只能进行比较运算（运算符`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof`运算符和`instanceof`运算符这几种，其他运算都会报错。

```ts
let a: unknown = 1;

a + 1; // 报错
a === 1; // 正确
```

通过**类型缩小**来使用unknown变量

```ts
let a: unknown = 1;

if (typeof a === "number") {
  let r = a + 10; // 正确
}
```

### never

表示不可能存在的值，表示ts类型中的空集，称为ts的底层类型

可用于联合类型的剩余情况

```ts
function fn(x: string | number) {
  if (typeof x === "string") {
    // ...
  } else if (typeof x === "number") {
    // ...
  } else {
    x; // never 类型
  }
}
```

never类型可以赋值给任何变量

```ts
function f(): never {
  throw new Error("Error");
}

let v1: number = f(); // 不报错
let v2: string = f(); // 不报错
let v3: boolean = f(); // 不报错
```

