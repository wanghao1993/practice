# 列的属性

上一篇中我们讲诉了一些数据库数据表的基本操作，这节讲诉一下列的属性，比如：PRIMARY KEY


## 默认值
很多时候，我们创建一个表的是列属性的时候需要给一个默认值，例如默认头像，默认年龄；默认值的属性是**default**

```
# 语法
列名 类型 default 默认值
CREATE TABLE demo1(id INT, name VARCHAR(80), age INT default 18);
Query OK, 0 rows affected (0.01 sec)

mysql> DESC demo1;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int         | YES  |     | NULL    |       |
| name  | varchar(80) | YES  |     | NULL    |       |
| age   | int         | YES  |     | 18      |       |
+-------+-------------+------+-----+---------+-------+

INSERT INTO demo1(id, name) VALUES (1, 'hmm'), (2, 'xhh');
Query OK, 2 rows affected (0.00 sec)
Records: 2  Duplicates: 0  Warnings: 0

mysql> SELECT * FROM demo1;
+------+------+------+
| id   | name | age  |
+------+------+------+
|    1 | hmm  |   18 |
|    2 | xhh  |   18 |
+------+------+------+
```
通过上面的例子可以看出，我并没有插入年纪，但是查询出来的表有age=18;这就是默认值。


## NOT NULL属性
有时候我们需要固定某属性，不能为空，是必填项，这时候就需要用到**not null**属性。
```
# 语法：列名 类型 NOT NULL
ALTER TABLE demo1 ADD COLUMN gende INT NOT NULL;
Query OK, 0 rows affected (0.04 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> DESC demo1;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| id    | int         | YES  |     | NULL    |       |
| name  | varchar(80) | YES  |     | NULL    |       |
| age   | int         | YES  |     | 18      |       |
| gende | int         | NO   |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
可以看到 gende 这个列属性的NUll 变成了NO，我们可以尝试插入一条数据，且gende不设置，
看看结果怎么样，在尝试插入一条正确的数据，可以自行尝试。
```

## 主键
很多时候一个表中的数据，我们不希望每条数据的某一列属性重复，这时候就需要设置一个主键，比如：身份证号码。
```
# 语法：列名 类型 PRIMARY KEY / PRIMARY KEY（列名）
# 设置已有的字段为主键：ALTER TABLE 表名 ADD primary key(列名);
我们设置id为主键
alter table demo1 add primary key(id);

INSERT INTO demo1(id, name, gende) VALUES(1, 'hh', 1);
ERROR 1062 (23000): Duplicate entry '1' for key 'demo1.PRIMARY'
当我们插入id为'1'的数据的时候，就会报错；

重新插入没有重复id的数据就ok了；
INSERT INTO demo1(id, name, gende) VALUES(6, 'hh', 1);

INSERT INTO demo1(id, name, gende) VALUES(7, 'hh', 1);
Query OK, 1 row affected (0.01 sec)

mysql> select * from demo1;
+----+--------+------+-------+
| id | name   | age  | gende |
+----+--------+------+-------+
|  1 | hmm    |   18 |     0 |
|  2 | xhh    |   18 |     0 |
|  4 | 小白   |   18 |     1 |
|  6 | hh     |   18 |     1 |
|  7 | hh     |   18 |     1 |
+----+--------+------+-------+

```
需要说明的是，添加的主键后会自动设置 **NOT NULL**，且一个表只能有一个主键。 属性，所以不能没有值，否则会报错。

## UIQUE属性
上面提到了一个表只能有一个主键，但是我有多个信息是不能有重复的那该怎么办呢？这时候UNIQUE属性就诞生了。

```
# 语法
1.创建表的时候单个列： 列名 类型 UNIUQUE;
2.如果是多个列需要单独提取出：UNIQUE KEY 约束名 (列1，列2，列3)
=> UNIQUE KEY group_unique (id, name, ...)
3.对于已经存在的表：ALTER TABLE  表名 ADD unique(列1，列2);

## 设置name为unique key
ALTER TABLE demo1 ADD unique(name);
mysql> select * from demo1;
+----+-----------+------+-------+
| id | name      | age  | gende |
+----+-----------+------+-------+
|  1 | hmm       |   18 |     0 |
|  2 | xhh       |   18 |     0 |
|  4 | 小白      |   18 |     1 |
|  6 | xiaohuang |   18 |     2 |
+----+-----------+------+-------+
4 rows in set (0.00 sec)

mysql> insert into demo1(id, name, gende) values(7, 'xhh', 2);
// 在插入name=xhh的数据 就会报错了
ERROR 1062 (23000): Duplicate entry 'xhh' for key 'demo1.name'

注意：id没有连续，是因为如果报错了，也会生成一个浪费一个自增值，下次正确的从错误的开始自增
```

## AUTO_INCREMENT自增
自增的意思就是会自动增长，当初始值为null或者0的时候，每次插入一条数据，设置为自增的字段，都会自动增长1；

```
# 语法
1.创建表的时候单个列： 列名 类型 AUTO_INCREMENT自增;
2.对于已经存在的表：ALTER TABLE 表名 modify id INT AUTO_INCREMENT;

// 增加一个num2的列，设置自增和唯一，必须设置一个key，否则无法设置自增；
ALter table demo1 add column num2 INT AUTO_INCREMENT UNIQUE;
Query OK, 0 rows affected (0.14 sec)

+-------+-------------+------+-----+---------+----------------+
| Field | Type        | Null | Key | Default | Extra          |
+-------+-------------+------+-----+---------+----------------+
| id    | int         | NO   | PRI | NULL    |                |
| name  | varchar(80) | YES  | UNI | NULL    |                |
| age   | int         | YES  |     | 18      |                |
| gende | int         | NO   |     | NULL    |                |
| num   | int         | YES  |     | NULL    |                |
| num2  | int         | NO   | UNI | NULL    | auto_increment |
+-------+-------------+------+-----+---------+----------------+

查询结果可以看到num2自增了，可以自己试一试插入一条数据，看看num2的变化：
mysql> select * from demo1;
+----+-----------+------+-------+------+------+
| id | name      | age  | gende | num  | num2 |
+----+-----------+------+-------+------+------+
|  1 | hmm       |   18 |     0 | NULL |    1 |
|  2 | xhh       |   18 |     0 | NULL |    2 |
|  4 | 小白      |   18 |     1 | NULL |    3 |
|  6 | xiaohuang |   18 |     2 | NULL |    4 |
+----+-----------+------+-------+------+------+
4 rows in set (0.00 sec)

```

# 简单查询
在此之前，我们复习一下前面的所学内容；
```
1.创建一个库表，表中包含字段，id, name，gender, address, age
2.其中id为主键，自增，name为字符串，gender有默认值，默认值为1，
并且有评论，1为男，2为女，address唯一，age默认为18
3.插入若干条数据
4.发现漏了一个字段，字段为class,类型在字符串限定，10个字符，不能为空，插入在name的右边
5.修改第五个的名字
```
做完上面的内容得到以下表结构：

```
mysql> desc demo3;
+---------+--------------+------+-----+---------+----------------+
| Field   | Type         | Null | Key | Default | Extra          |
+---------+--------------+------+-----+---------+----------------+
| id      | int          | NO   | PRI | NULL    | auto_increment |
| name    | varchar(20)  | NO   |     | 18      |                |
| class   | varchar(10)  | NO   |     | NULL    |                |
| gender  | int          | YES  |     | 1       |                |
| address | varchar(200) | YES  | UNI | NULL    |                |
| age     | int          | YES  |     | 18      |                |
+---------+--------------+------+-----+---------+----------------+

数据内容如下：
mysql> select * from demo3;
+----+-----------------+-----------+--------+---------+------+
| id | name            | class     | gender | address | age  |
+----+-----------------+-----------+--------+---------+------+
|  1 | 小明            |           |      1 | xxxxx   |   17 |
|  3 | 小红            |           |      1 | xxxxx1  |   18 |
|  5 | 小红2           | 一年级    |      1 | xxxxx3  |   17 |
|  6 | 小红3           | 一年级    |      1 | xxxx53  |   17 |
|  8 | 修改的名字      | 一年级    |      1 | xxx43   |   17 |
| 10 | 小红6           | 二年级    |      2 | xxx8    |   17 |
| 11 | 小红7           | 二年级    |      2 | xxx81   |   19 |
+----+-----------------+-----------+--------+---------+------+
```

<!--<font color="#ff502c" bgcolor="#444444">浅红色文字：</font>-->

## 查询所有列内容
```
select * from 表名 不多诉说
```
## 查询单/多列内容
```
select 列名 from 表名 =》 select id from demo3;

select 列名1, 列名2 from 表名 =》select id, name from demo3;

## 添加别名
select 列名1 as 别名, 列名2 as 别名2 from 表名 =》
select id as 唯一号码, name as 名字 from demo3;

mysql> select id as 唯一号码, name as 名字 from demo3;
+--------------+-----------------+
| 唯一号码     | 名字            |
+--------------+-----------------+
|            1 | 小明            |
|            3 | 小红            |
|            5 | 小红2           |
|            6 | 小红3           |
|            8 | 修改的名字      |
|           10 | 小红6           |
|           11 | 小红7           |
+--------------+-----------------+
```

## 查询结果去重
```
语法：SELECT DISTINCT 列名 FROM 表名;
SELECT DISTINCT class from demo3;

mysql> SELECT DISTINCT class from demo3;
+-----------+
| class     |
+-----------+
|           |
| 一年级    |
| 二年级    |
+-----------+
可以看到class只剩下一年级二年级了

```
## 限制查询条数
这也是我们经常做分页用到的。比如每次只查询20条;

```
语法：LIMIT 开始行, 限制条数;
mysql> select * from demo3 limit 0,2;
+----+--------+-------+--------+---------+------+
| id | name   | class | gender | address | age  |
+----+--------+-------+--------+---------+------+
|  1 | 小明   |       |      1 | xxxxx   |   17 |
|  3 | 小红   |       |      1 | xxxxx1  |   18 |
+----+--------+-------+--------+---------+------+
```

## 按照单个列的值进行排序

```
## ASC是升序 DESC是降序
语法：ORDER BY 列名 ASC|DESC

mysql> select * from demo3 order by age asc;
+----+-----------------+-----------+--------+---------+------+
| id | name            | class     | gender | address | age  |
+----+-----------------+-----------+--------+---------+------+
|  1 | 小明            |           |      1 | xxxxx   |   17 |
|  5 | 小红2           | 一年级    |      1 | xxxxx3  |   17 |
|  6 | 小红3           | 一年级    |      1 | xxxx53  |   17 |
|  8 | 修改的名字      | 一年级    |      1 | xxx43   |   17 |
| 10 | 小红6           | 二年级    |      2 | xxx8    |   17 |
|  3 | 小红            |           |      1 | xxxxx1  |   18 |
| 11 | 小红7           | 二年级    |      2 | xxx81   |   19 |
+----+-----------------+-----------+--------+---------+------+
```

## 按照多个列的值进行排序
```
## ASC是升序 DESC是降序
语法：ORDER BY 列名1 ASC|DESC, 列名2 ASC|DESC....


mysql> select * from demo3 order by age asc, address asc;
+----+-----------------+-----------+--------+---------+------+
| id | name            | class     | gender | address | age  |
+----+-----------------+-----------+--------+---------+------+
|  8 | 修改的名字      | 一年级    |      1 | xxx43   |   17 |
| 10 | 小红6           | 二年级    |      2 | xxx8    |   17 |
|  6 | 小红3           | 一年级    |      1 | xxxx53  |   17 |
|  1 | 小明            |           |      1 | xxxxx   |   17 |
|  5 | 小红2           | 一年级    |      1 | xxxxx3  |   17 |
|  3 | 小红            |           |      1 | xxxxx1  |   18 |
| 11 | 小红7           | 二年级    |      2 | xxx81   |   19 |
+----+-----------------+-----------+--------+---------+------+
```
根据以上可以查询出最小和最大
