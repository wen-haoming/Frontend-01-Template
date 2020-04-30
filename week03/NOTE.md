## 问题

```javascript
Math.abs(1.3 + 1.1 - 2.4) <= Number.EPSILON // false

Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON // true
```

## 一. 表达式

> 从词法部分进入到语法部分。

### 1.1 语法

#### 1.1.1 语法树和优先级

优先级最高的运算符：`Member` 和 `New`

##### 1> `Member`

> 返回 Reference 类型。

1. a.b
2. a[b]
3. foo\`string\`

   ```javascript
   let name = 'World'

   function foo() {
     console.log(arguments)
   }

   foo`Hello ${name}`
   ```

4. super.b

   ```javascript
   class Parent {
     constructor(){
       this.a = 1
     }
   }

   class Child extends Parent{
     constructor(){
       super()
       console.log(this.a)
     }
   }

   Parent.a = 1
   new Child // 1
   ```

5. super['b']
6. new.target

   ```javascript
   function foo() {
     console.log(new.target)
   }
   foo() // undefined

   new foo() // f foo() {...}

   function bar() {
     console.log(this)
   }

   let fackObject = {}
   Object.setPrototypeOf(fackObject, bar.prototype)
   fackObject.constructor = bar
   bar.apply(fackObject)
   ```

7. new Foo()

##### 2> `New`

- `new Foo`

  ```javascript
  new a()()
  new new a()()
  ```

  ```javascript
  function cls1(s) {
    console.log(s)
  }

  function cls2(s) {
    console.log('2', s)
    return cls1
  }

  new new cls2('good')()
  // new (new cls2('good'));
  ```

##### 3> `Call`

1. foo()
2. super()
3. foo()[b]

   ```javascript
   class foo {
     constructor() {
       this.b = 1
     }
   }

   // 先 new 对象，再取属性，返回 `1`
   new foo()['b']
   ```

4. foo().b
5. foo()\`abc\`

#### 1.1.2 Left hand side & Right hand side

> **等号左边**和**等号右边**。

##### 1> Left Handside：赋值操作的目标

运行时必须是 `Reference`

##### 2> Right Handside ：赋值操作的来源

- update(`11.9.1`)
  - `a++`、`a--`、`--a`、`++a`

- Unary（单目）
  - delete a.b
  - void foo()

    > void 后面跟任何值都返回 `undefined`，[IIFE](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F) 推荐用 `void` 而不是 `()`，以避免加分号的问题。
  
    ```javascript
    for (var i = 0; i < 10; i++) {
      var button = document.createElement('button')

      document.body.appendChild(button)
      button.innerHTML = i

      void function(i){
        button.onClick = function() {
          console.log(i)
        }  
      }(i)
    }
    ```
  
  - typeof a

    ```javascript
    typeof null  // object
    typeof function() {} // function
    ```

  - `+a`、`-a`、`~a`、`!a`
  - await a

- Exponental
  - `**` （右结合）
  
- Multiplicative
  - `*`、`/`、`%`
  
- Additive
  - `+`、`-`
  
- Shift（位移)
  - `<<`、`>>`、`<<<`
  
- Relationship
  - `<`、`>`、`<=`、`>=`、`instanceof`、`in`
  
- Equality
  - `==`、`!=`、`===`、`!==`
  
- Bitwise
  - `&`、`^`、`|`
  
- Logical
  - `&&`、`||`

  > 短路原则

  ```javascript
  function foo1() {
    console.log(1)
    return false
  }

  function foo2() {
    console.log(2)
  }

  foo1() && foo2() // 1  false
  foo1() || foo2() // 1  2  undefined
  ```

- Conditional（三目）
  - `? :`

  > JavaScript 的三目运算会根据条件执行不同的语句，三目支持连用。

  ```javascript
  function foo1() {
    console.log(1)
    return false
  }

  function foo2() {
    console.log(2)
  }

  true ? foo1() : foo2()  // 1  false
  false ? foo1() : foo2() // 2  undefined
  ```

- Comma  
  - `,`

### 1.2 运行时

#### 1.2.1 类型转换

|               | Number               | String           | Boolean     | Undefined | Null | Object | Symbol |
| ------------- | -------------------- | ---------------- | ----------- | --------- | ---- | ------ | ------ |
| **Number**    | -                    | NumberTo String  | 0 => false  | ×         | ×    | Boxing | ×      |
| **String**    | StringTo Number      | -                | "" => false | ×         | ×    | Boxing | ×      |
| **Boolean**   | true => 1 false => 0 | 'true' 、'false' | -           | ×         | ×    | Boxing | ×      |
| **Undefined** | NaN                  | 'undefined'      | false       | -         | ×    | ×      | ×      |
| **Null**      | 0                    | 'null'           | false       | ×         | -    | ×      | ×      |
| **Object**    | valueOf              | valueOf toString | true        | ×         | ×    | -      | ×      |
| **Symbol**    | ×                    | ×                | ×           | ×         | ×    | Boxing | -      |

#### 1.2.2 Boxing（装箱）

```javascript
new Number(1) // Number {1}
new String('hello') // String {"hello"}

new String('hello').length // 5
'hello'.length // 5

!new String("") // false
!"" // true

// 强制类型转换
Number('1') // 1
String(1) // '1'
Boolean(1) // true

Object(1) // Number {1}
Object("hello")
Object(true)
Object(Symbol('x')) // Symbol 不能 new，其他与构造器一样

Object(Symbol('x')) instanceof Symbol // true
Object.getPrototypeOf(Object(Symbol('x'))) === Symbol.prototype // true

(function(){return this}).apply(Symbol('x')) // boxing Symbol {Symbol(x)}
```

#### 1.2.3 Unboxing（拆箱）

- `toPrimitive` 的优先级最高。
- 没有 `toPrimitive`，默认的 `toPrimitive` 会先调 `valueOf` 再调 `toString`。

```javascript

1 + {} // '1[object Object]'
1 + { valueOf(){ return 1 } } // 2
1 + { toString(){ return 1 } } // 2
1 + { toString(){ return '1' } } // '11'
1 + { valueOf() { return 1 }, toString() { return '2' } } // 2
'1' + { valueOf() { return 1 }, toString() { return '2' } } // '11'

1 + {
  [Symbol.toPrimitive](){ return 5 },
  valueOf(){ return 1 },
  toString(){ return '2' }
}  // 6

1 + {
  [Symbol.toPrimitive](){ return {} },
  valueOf(){ return 1 },
  toString(){ return '2' }
}  // TypeError:Cannot convert object to primitive value

1 + { valueOf() { return  }, toString() { return '2' } } // '1undefined'
1 + { valueOf() { return {} }, toString() { return '2' } } // '12'
```

## 三. 练习

- StringToNumber
- NumberToString
