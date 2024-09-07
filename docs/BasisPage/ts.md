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