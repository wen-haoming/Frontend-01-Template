# javascript Syntax(语法) (703页)

- Atom
- Express
- Statement
- Structure
- Program/Module

## Atom

### unicode

> js本身能够完美处理 U+0000 - U+FFFF 的字符,使用formCodeAt能够完美解析,但是emoji的出现就不够了, 后续的需要使用codePointAt来解析.

>  为什么不用ascii以外的字符放在源码里？
>  因为如果超出ascii以外的的编码就涉及到文件字符编码编码的问题,不同的环境会造成不同的效果
> - 最佳实践
>   - \ u去转译 (手动改或者自动)

- 基本原理
  - 字符集(字符的集合)(码点)(最广泛的)

  - js中**变量名**和**字符串**中能使用
- Block [unicode](https://www.fileformat.info/info/unicode/block/basic_latin/images.htm)
  - Basic Latin(asci)
    - LINE FEED (LF)
    - SPACE
  - CJK(CJK Unified Ideographs) 中文
    - 1
  - 查 如果超出asci的字符需要用codePointAt 平时查asci用charCodeAt
  
### InputElement

- **whitespace**(js中的空格)

  - \<TAB> | \t | U+0009  => 仅次于空格的制表符（tab对js不产生实际作用）
    - \<VT>  | \v | U+0011  => 纵向制表符
    - \<FF>  | \n | U+000A  => 回车
    - \<NBSP>  | \v | U+00A0  => NO-BREAK SPACE(分词的效果,避免解析单词之间换行主要是用来处理分词的)
    - \<SP>  | U+0008 SPACE => 普通的空格
    - \<ZWNBSP>  | \v | U+0011  => 纵向制表符
      - BOM
      - Zero width no break space
    - \<USP>  Any other Unicode “Space_Separator” code point

  - **Line Terminators**(js中的换行符)

    - U+000A LINE FEED (LF) \<LF>
    - U+000D CARRIAGE RETURN (CR) \<CR>
    - U+2028 LINE SEPARATOR \<LS>
    - U+2029 PARAGRAPH SEPARATOR \<PS>

    最好不要超出asci

  - **comment**

    - /* 里面的  *不能用unicode替代  */

  - **Token**

    - Punctuator(符号.*'/%$ 等等)
    - Keywords 
    - IdentifierName (标识符)
      - Keywords
      - Identifier 属性名(可以和关键字重合)
      - undefined 比较特殊是一个全局变量且不能改变, 但是放到一个作用域能改变,null则都不行
      - Future reserved Keywords : enum
    - **Literal**(types)
      - Number
        - IEEE 754 Double Float
        - Sign(1)
        - Exponent(11)科学计数法
        - Fraction(52)
        - Grammer
          - 0b  2进制
          - 0x 16进制
          - 0o  8进制
          - 数字0开头通常表示8进制
         - parsInt的使用 & toString
        - Safe Integer
          - Number.MAX_SAFE_INTEGER.toString(16)
          - Math.abs(0.1+0.2-0.3) <= Number.EPSILON 如果小于这个数就证明是相同的,但是多数js比较大小都是整数对比
      - String

        ```js
            97 .toString() // 为什么97后面有空格
            // 空格能调整语法结构和文本美观
            // 并且有时候空格能使js的语法成立
        ```
        - ascii
        - unicode(早期也是和ucs这么多)
        - ucs U+0000 - U+FFFF
        - gb
          - gb2312
          - gbk(gb13000)
          - gb18030
        - Character
        - Code Point
        - Encoding
          - utf8
          - uft16
        - Grammar(支持的三种语法)
          - "a"
          - 'a'
          - \`a\`
          - Escape Sequence(字符串的转译关系)
            - \b 0x0008  BACKSPACE <BS>
            - \t 0x0009  CHARACTER TABULATION <HT>
            - \n 0x000A LINE FEED (LF) <LF>
            - \v 0x000B LINE TABULATION <VT>
            - \f 0x000C FORM FEED (FF) <FF>
            - \r 0x000D CARRIAGE RETURN (CR) <CR>
            - \\" 0x0022 QUOTATION MARK  "
            - \\' 0x0027 APOSTROPHE '
            - \\ 0x005C REVERSE SOLIDUS \
      - Boolean
      - Object
      - Null
      - Undefined
      - Symbol
