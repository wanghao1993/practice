# 正则表达式

## 什么是正则表达式

正则表达式是用于匹配字符串中字符组合的模式。在 JavaScript中，正则表达式也是对象。这些模式被用于 RegExp 的 exec 和 test 方法, 以及 String 的 match、matchAll、replace、search 和 split 方法。

## 创建方法

1.构造函数
2.字面量

构造函数的参数有两种情况
第一种：参数是字符串，第二个参数是正则表达式的修饰符

第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。

```js
const reg = new RegExp('abc', 'i')

const reg1 = new RegExp(/abc/i)

两种方式创建的方式是等价的。

```

在es5之前，第二种方法是不能添加修饰符的，但是在es6之后改变了，可以添加修饰符，但是会取代默认的修饰符。

```js
const reg2 = new RegExp(/abc/ig, 'i')

// /abc/i
此时的ig会被取代
```

## 正则表达式中的特殊字符

为了方便编写正则表达式，官方提供了一些特殊字符来代表一些通用的规则。
字符|说明
---|--|
\  | 依照下列规则匹配：在非特殊字符之前的反斜杠表示下一个字符是特殊字符，不能按照字理解。例如，前面没有  \  的 "b" 通常匹配小写字母 "b"，即字符会被作为字面理解，无论它出现在哪里。但如果前面加了 \，它将不再匹配任何字符，而是表示一个字符边界。在特殊字符之前的反斜杠表示下一个字符不是特殊字符，应该按照字面理解。例如：\n 表示换行符号，而不是'n'。
^ | 匹配输入字符串的开始位置。如果设置了 RegExp 对象的 Multiline 属性，^ 也匹配 '\n' 或 '\r' 之后的位置。例如：^a 会匹配到 'abc'中的a
$ | 匹配输入字符串的结束位置。如果设置了 RegExp 对象的 Multiline 属性 \$ 也匹配 '\n' 或 '\r' 之后的位置。例如：d$ 会匹配到 'abcd'中的d
\* | 匹配前一个表达式 0 次或多次。等价于 {0,}。例如，/bo*/ 会匹配 "A ghost boooooed" 中的 'booooo' 和 "A bird warbled" 中的 'b'，但是在 "A goat grunted" 中不会匹配任何内容。
+ | 匹配前一个表达式 0 次或多次。等价于 {1,}。例如，/bo+/ 会匹配 "A ghost boooooed" 中的 'booooo' ,不能匹配 "A bird warbled" 中的 'b'
？| 匹配前面一个表达式 0 次或者 1 次。等价于 {0,1}。例如，/e?le?/ 匹配 "angel" 中的 'el'、"angle" 中的 'le' 以及 "oslo' 中的 'l'。
. | （小数点）默认匹配除换行符之外的任何单个字符。例如，/.n/ 将会匹配 "nay, an apple is on the tree" 中的 'an' 和 'on'，但是不会匹配 'nay'。如果 s ("dotAll") 标志位被设为 true，它也会匹配换行符.
{n} | n 是一个正整数，匹配了前面一个字符刚好出现了 n 次。比如， /a{2}/ 不会匹配“candy”中的'a',但是会匹配“caandy”中所有的 a，以及“caaandy”中的前两个'a'。
{n,} | n是一个正整数，匹配前一个字符至少出现了n次。例如, /a{2,}/ 匹配 "aa", "aaaa" 和 "aaaaa" 但是不匹配 "a"。
{n,m} | n 和 m 都是整数。匹配前面的字符至少n次，最多m次。如果 n 或者 m 的值是0， 这个值被忽略.例如，/a{1, 3}/ 并不匹配“cndy”中的任意字符，匹配“candy”中的a，匹配“caandy”中的前两个a，也匹配“caaaaaaandy”中的前三个a。注意，当匹配”caaaaaaandy“时，匹配的值是“aaa”，即使原始的字符串中有更多的a。
[xyz] | 一个字符的集合，会匹配到其中的任一字符，也可以用破折号‘-’表示,[abc], [a-c]是相等的。
[^xyz] | 一个反向字符的集合，不会匹配到其中的任一字符，也可以用破折号‘-’表示,[^abc], [^a-c]是相等的。
\b   | 匹配一个单词边界，也就是指单词和空格间的位置。例如， 'lo\b' 可以匹配"helolo" 中的 后面的'lo'，但不能匹配 前面的'lo'。
\B | 匹配一个非单词边界，也就是指单词和空格间的位置。例如， 'lo\b' 可以匹配"helolo" 中的 前面的'lo'，但不能匹配 后面的'lo'。
\cX | 当X是处于A到Z之间的字符的时候，匹配字符串中的一个控制符。例如，/\cM/ 匹配字符串中的 control-M (U+000D)。例如：浏览器控制台：alert(/\cM/.test("回车符\r"))你就会明是什么意思了。
\d | 匹配数字，等于[0-9]。
\D | 匹配非数字数字，不等于[0-9]。
\f | 匹配一个换页符。
\n | 匹配一个换行符。
\r | 匹配一个回车符。
\s | 匹配一个空白字符，包括空格、制表符、换页符和换行符。
\S | 匹配一个非空白字符。
\t | 匹配一个水平制表符 (U+0009)。
\v | 匹配一个垂直制表符 (U+000B)。
\w|匹配一个单字字符（字母、数字或者下划线）。等价于 [A-Za-z0-9_]。例如, /\w/ 匹配 "apple," 中的 'a'，"$5.28,"中的 '5' 和 "3D." 中的 '3'。
\W | 匹配一个非单字字符。等价于 [^A-Za-z0-9_]。例如, /\W/ 或者 /[^A-Za-z0-9_]/ 匹配 "50%." 中的 '%'。

## 转义

在写正则的时候有些特殊符号，需要经过转义处理，否则会被错误解析。例如：当我需要匹配'a/b'中的/b这时候需要把/转义，在斜杠的前面写‘\’，‘\/b’才能正确的匹配，还有*等。

## 正则表达式的方法

方法|说明
---|--|
exec | 一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回 null）
test | 校验一个字符串是否符合某个正则，返回true或者false
match| 字符串中查找符合正则的字符串，匹配到返回数组，没有则为null
matchAll | 字符串中查找符合正则的所有字符串，返回一个迭代器，可以用for...of 遍历出结果, 使用matchAll需要加上g标志
search | 一个在字符串中测试匹配的String方法，它返回匹配到的位置索引，或者在失败时返回-1。
replace | 一个在字符串中执行查找匹配的String方法，并且使用替换字符串替换掉匹配到的子字符串。
split |一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的 String 方法。

## 标志

标志 | 描述
---|--|
g | 全局搜索。
i | 不区分大小写搜索。
m | 多行搜索。
s | 允许 . 匹配换行符。
u | 使用unicode码的模式进行匹配。
y | 执行“粘性”搜索,匹配从目标字符串的当前位置开始，可以使用y标志。

## 模式

贪婪模式: 贪婪模式，就是在整个表达式匹配成功的前提下，尽可能多的匹配，也就是所谓的“贪婪”，通俗点讲，就是看到想要的，有多少就捡多少，除非再也没有想要的了。

非贪婪模式: 非贪婪模式，就是在整个表达式匹配成功的前提下，尽可能少的匹配，也就是所谓的“非贪婪”，通俗点讲，就是找到一个想要的捡起来就行了，至于还有没有没捡的就不管了。

这里有一篇文章讲的不错：[贪婪模式和非贪婪模式](https://www.jianshu.com/p/8c40951c563a)

## 练习

1.匹配所有中文，电话号码，身份证号？

```js
[\u4e00-\u9fa5]
 ^1[3-9]\d{9}
 ^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$
```

2.过滤一行英文中的空字符串, 包括换行符，制表符等。

```js
str.replace(/\s/g, '')
```

3.按照一个空格分割一串英文短句。

my name is hanmeimie    , what's your name?    

最终结果为['my ', 'name ', 'is ', 'hanmeimie ', 'what's ', 'your ', 'name? ']

```js
str.match(/(\w+|\w+'\w)\??\s/g)
```

4.将来10223684035235添加千分位

```js
function transform(num, unit = 3) {
    if (!num) {
        throw new Error('请输入数字')
        return
    }

    if (unit < 0) {
        throw new Error('unit需要大于0')
        return
    }
    const reg = new RegExp(`(\\d{${unit}})`, 'g')
    return res = num.toString().split('').reverse().join('').replace(reg, '$1,').split('').reverse().join('').replace(/^,/, '')
}
```

以上是我的解法，和网上搜索到的不一样，还有以为就是不需要翻转，在前面补0
