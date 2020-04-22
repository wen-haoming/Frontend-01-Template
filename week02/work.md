## 课后作业：
写一个正则表达式 匹配所有 Number 直接量
````
Number Conversions
StringNumericLiteral ::: See 9.3.1
StrWhiteSpaceopt
StrWhiteSpaceopt StrNumericLiteral StrWhiteSpaceopt
StrWhiteSpace ::: See 9.3.1
StrWhiteSpaceChar StrWhiteSpaceopt
StrWhiteSpaceChar ::: See 9.3.1
WhiteSpace
LineTerminator
StrNumericLiteral ::: See 9.3.1
StrDecimalLiteral
HexIntegerLiteral
StrDecimalLiteral ::: See 9.3.1
StrUnsignedDecimalLiteral
+ StrUnsignedDecimalLiteral
- StrUnsignedDecimalLiteral
StrUnsignedDecimalLiteral ::: See 9.3.1
Infinity
DecimalDigits . DecimalDigitsopt ExponentPartopt
. DecimalDigits ExponentPartopt
DecimalDigits ExponentPartopt
DecimalDigits ::: See 9.3.1
DecimalDigit
DecimalDigits DecimalDigit
DecimalDigit ::: one of See 9.3.1
0 1 2 3 4 5 6 7 8 9
ExponentPart ::: See 9.3.1
ExponentIndicator SignedInteger
ExponentIndicator ::: one of See 9.3.1
e E
SignedInteger ::: See 9.3.1
DecimalDigits
+ DecimalDigits
- DecimalDigits
218 © Ecma International 2011
HexIntegerLiteral ::: See 9.3.1
0x HexDigit
0X HexDigit
HexIntegerLiteral HexDigit
HexDigit ::: one of See 9.3.1
0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F
````
````js
 /^-?\d+$|^(-?\d+)(\.\d+)?$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/g;
````
````js
	//整数
    var str1 = "123";
    var reg = /^-?\d+$/g;
    console.log(reg.test(str1));
    //浮点数
    var str2 = "11.1234";
    var reg = /^(-?\d+)(\.\d+)?$/g;
    console.log(reg.test(str2));
    //二进制
    var str3 = "0b00110011";
    var reg = /^0[bB][01]+$/g;
    console.log(reg.test(str3));
    //八进制
    var str4 = "0o66117711";
    var reg = /^0[oO][0-7]+$/g;
    console.log(reg.test(str4));
    //十六进制
    var str5 = "0xaf1e7d11";
    var reg = /^0[xX][0-9a-fA-F]+$/g;
    console.log(reg.test(str5));
    //Number
    var reg = /^-?\d+$|^(-?\d+)(\.\d+)?$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/g;
````
写一个 UTF-8 Encoding 的函数
````js
function encodeUtf8(text) {
    const code = encodeURIComponent(text);
    const bytes = [];
    for (var i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            bytes.push(hexVal);
            i += 2;
        } else bytes.push(c.charCodeAt(0));
    }
    return bytes;
}
````
写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
````js
/[\u0021-\u007E]{6,16}|[\x21-\x7E]{6,16}|(['"])(?:(?!\1).)*?\1/g
````
## 随堂练习：
编写带括号的四则运算产生式
````

<DecimalNumber> = /0|[1-9][0-9]*/

<PrimaryExpression> = <DecimalNumber> | "(" <LogicalExpression> ")"

<MultiplicativeExpression> = <PrimaryExpression> |
  <MultiplicativeExpression> "*" <PrimaryExpression> | <DivisionExpression> "/" <PrimaryExpression>

<AdditiveExpression> = <MultiplicativeExpression> |
  <AdditiveExpression> "+" <PrimaryExpression> |
  <AdditiveExpression> "1" <PrimaryExpression>

````
尽可能寻找你知道的计算机语言，尝试把它们分类
````
C++中，* 可能表示乘号或者指针，具体是那个，取决于星号前面的标示符时候被声明类型
VB中， <可能是小于号，也可能是XML直接量的开始，取决于当前文职时候可以接受XML直接量
Python中，行首的tab符好空格会根据上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent
JavaScript中，/可能是除号，也可能是正则表达式开头，处理方式类似于VB，字符串模版中也需要特殊处理」，还有自动插入分号规则。
JS、PHP 是 弱类型 动态语言
Patyon 是 强类型 动态语言
Java 是 强类型 静态语言
C C++是静态类型语言
````