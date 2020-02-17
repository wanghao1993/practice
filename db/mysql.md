# 开头

    1.2020的开头很不好，肺炎肆虐着我们国家，但是我相信我们政府会权利解决这个问题的，湖北加油，
    中国加油，同时作为理科生，应当理性的从科学的角度看待谣言，不要过度的恐慌；于此同事过完生日我就被
    前女友"优化"了，痛定思痛，决定学点东西，学什么好呢?想了想决定学点数据库的知识，因为目前所在的
    项目组是大数据团队，很多的业务都和数据强相关。

    2.最近也在招聘，发现很多前端都是半路出家的，各种各样的专业，比如是学机械的，家里来自山沟沟，
    父母不懂，我也不懂，只听说机械好就业，就选了机械。

    3.以前学习前端的时候学了一点mysql，所以这次打算温习一下。

### 为什么我们需要数据库

##### 以下观点纯属个人看法
在没有计算机的时候，人们记账通常使用小本本，记账，从古时候的账本，到小时候父母们记录电话号码，或者我们写的日记都是记在小本本上的。

但是这样子存在一个问题，如果数据量巨大怎么办？或者我需要从大量数据中检索我想要的信息咋办呢？

所以人们发明了一种专门的软件来管理存储的数据，这些数据依照一定格式保存，通过这个软件可以方便的对数据进行增删改查操作，从而极大的提升了数据管理效率，人们就把这个管理数据的软件叫做数据库管理系统（英文：Database Management System，简称：DBMS）

### 第一步 开机混底薪

1.打开 https://dev.mysql.com/downloads/file/?id=492745 下载安装包，本人是mac的，所一下的时候选择合适自己的安装包；

2.【MySQL安装（Mac版】https://juejin.im/post/5cc2a52ce51d456e7079f27f
这篇文章有介绍mac安装的两种方式～

### 第二步 初识mysql —— 数据类型
1.在我们学习js的时候通常会先学习数据类型

    mysql中有以下几类数据类型。
    1.数值类型
    2.字符类型
    3.时间类型

2.1 数值类型
| 类型     | 无符号范围 | 有符号范围 |    用途  |
|----------|------------|------------|----------|
| TINYINT  | (-128，127)| (0，255)   | 小整数
| TINYINT	|	0 ~ 2⁸-1|	-2⁷ ~ 2⁷-1|	非常小的整数
|SMALLINT	|	0 ~ 2¹⁶-1|	-2¹⁵ ~ 2¹⁵-1|	小的整数
|MEDIUMINT	|	0 ~ 2²⁴-1|	-2²³ ~ 2²³-1|	中等大小的整数
|INT（别名：INTEGER）	4|	0 ~ 2³²-1	|-2³¹ ~ 2³¹-1	|标准的整数
|BIGINT	|	0 ~ 2⁶⁴-1|	-2⁶³ ~ 2⁶³-1	|大整数
|FLOAT	|	±1.175494351E-38|	±3.402823466E+38|	单精度浮点数
|DOUBLE	|	±2.2250738585072014E-308|	±1.7976931348623157E+308|	双精度浮点数

2.2字符类型

|类型	|大小	|用途 |
|-------|-------|-----|
|CHAR|	0-255字节	|定长字符串
|VARCHAR	|0-65535 字节|	变长字符串
|TINYBLOB	|0-255字节	|不超过 255 个字符的二进制字符串
|TINYTEXT	|0-255字节	|短文本字符串
|BLOB|	0-65 535字节|	二进制形式的长文本数据
|TEXT|	0-65 535字节|	长文本数据
|MEDIUMBLOB	|0-16 777 215字节|	二进制形式的中等长度文本数据
|MEDIUMTEXT	|0-16 777 215字节|	中等长度文本数据
|LONGBLOB|	0-4 294 967 295字节	|二进制形式的极大文本数据
|LONGTEXT|	0-4 294 967 295字节|	极大文本数据

2.3 时间类型
|类型|	大小(字节)|	范围	|格式|	用途|
|----|------------|---------|----|------|
|DATE	|3|	1000-01-01/9999-12-31|	YYYY-MM-DD	|日期值
|TIME	|3|	'-838:59:59'/'838:59:59'|	HH:MM:SS|	时间值或持续时间
|YEAR	|1|	1901/2155|	YYYY|	年份值
|DATETIME|	8|	1000-01-01 00:00:00/9999-12-31| 23:59:59	YYYY-MM-DD HH:MM:SS	|混合日期和时间值
|TIMESTAMP|	4|	|1970-01-01 00:00:00/2038|结束时间是第 2147483647 秒，北京时间 2038-1-19 11:14:07，格林尼治时间 2038年1月19日 凌晨 03:14:07|YYYYMMDD HHMMSS	混合日期和时间值，时间戳

## 第三步骤基本操作

### 3.1 数据库操作
#### 3.1.1 查询数据库;

    # 语法：SHOW DATABASES; 别忘记分号结尾;
    mysql> SHOW DATABASES;
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | koa                |
    | mysql              |
    | performance_schema |
    | sys                |
    +--------------------+
    5 rows in set (0.01 sec)

#### 3.1.2 创建数据库

    # 语法：CREATE DATABASE 库名;
    mysql> CREATE DATABASE test;
    Query OK, 1 row affected (0.01 sec)

    mysql> show databases;
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | koa                |
    | mysql              |
    | performance_schema |
    | sys                |
    | test               |
    +--------------------+
    6 rows in set (0.00 sec)

#### 3.1.3 删除数据库

     # 语法：DROP DATABASE 库名;
     mysql> DROP DATABASE test;
    Query OK, 0 rows affected (0.01 sec)

    mysql> show databases;
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | koa                |
    | mysql              |
    | performance_schema |
    | sys                |
    +--------------------+

    iv. 使用数据库
    # 语法：USE 库名;


当我们创建和删除的时候可能会需要判断是否存在，再进行操作可以使用**IF NOT EXISTS** 和**IF EXISTS**，否则会报错

    例如：
    // 不存再的时候才创建
    CREATE DATABASE IF NOT EXISTS test
    // 存在才删除
    DROP DATABASE IF EXISTS test


### 3.2 数据表操作

#### 3.2.1 查看表

    # 语法：SHOW TABLES;
    使用刚刚创建的test，空的;
    mysql> use test;
        Database changed
    mysql> show tables;
        Empty set (0.00 sec)

#### 3.2.2 创建表
    创建表需要三部：
        1.给表起名字
        2.至少有一列，并且有数据类型
        3.如果有必要设置一些属性，比如不能为空等等

        下面我们创建一个简单的用户表；
        CREATE TABLE users (
            id INT NOT NULL,
            name VARCHAR(50)
        )
#### 3.2.3 查看表结构
        # 语法：DESC 表名；
        mysql> desc user;
        +-------+-------------+------+-----+---------+-------+
        | Field | Type        | Null | Key | Default | Extra |
        +-------+-------------+------+-----+---------+-------+
        | id    | int         | NO   |     | NULL    |       |
        | name  | varchar(50) | YES  |     | NULL    |       |
        +-------+-------------+------+-----+---------+-------+
        2 rows in set (0.01 sec)
#### 3.2.4 插入一条数据
        # 语法：分属性插入，INSERT INTO 表名 (field1, field2...) VALUES (1, 2, n...);
        全属性插入，INSERT INTO 表名 VALUES (1, 2, n...);
        mysql> INSERT INTO user (id, name) VALUES(1, '名字');
        Query OK, 1 row affected (0.00 sec)
#### 3.2.5 查看插入的数据
        # 语法：SELECT * FROM 表名;
        mysql> select * from user;
        +----+--------+
        | id | name   |
        +----+--------+
        |  1 | 章三   |
        |  1 | 名字   |
        +----+--------+
#### 3.2.6 插入多条数据
        # 语法：INSERT INTO 表名 (field1, field2...) VALUES (1, 2, n...)，(3, 4, 2n...);
        mysql> INSERT INTO user (id, name) VALUES(1, '名字'), (2, '武松打虎');

#### 3.2.7 修改数据
        # 语法：UPDATE 表名 SET 属性 = 新值 WHERE 属性 = 值
        mysql> UPDATE user SET name = '姓名' WHERE name = '名字';
        mysql> select * from user;
        +----+--------+
        | id | name   |
        +----+--------+
        |  1 | 章三   |
        |  1 | 姓名   |
        +----+--------+


#### 3.2.8 删除数据
        # 语法：DELETE FROM 表名 [WHERE 表达式];
        mysql> DELETE FROM user WHERE name = '姓名';
        Query OK, 1 row affected (0.00 sec)

        mysql> select * from user;
        +----+--------+
        | id | name   |
        +----+--------+
        |  1 | 章三   |
        +----+--------+

#### 3.2.9 修改表名
    # 语法ALTER: 单表修改 ALTER TABLE 旧表名 RENAME TO 新表名;
    多表修改 RENAME TABLE 旧表名1 TO 新表名1, 旧表名2 TO 新表名2, ... 旧表名n TO 新表名n;
    mysql> ALTER TABLE user RENAME TO users;
    mysql> show tables;
    +----------------+
    | Tables_in_test |
    +----------------+
    | users          |
    +----------------+

#### 3.2.10 增加列
    # 语法ALTER: ALTER TABLE 表名 ADD COLUMN 列名 数据类型 [列的属性];
    mysql> ALTER TABLE users ADD COLUMN age INT;

    mysql> desc users;
    +-------+-------------+------+-----+---------+-------+
    | Field | Type        | Null | Key | Default | Extra |
    +-------+-------------+------+-----+---------+-------+
    | id    | int         | NO   |     | NULL    |       |
    | name  | varchar(50) | YES  |     | NULL    |       |
    | age   | int         | YES  |     | NULL    |       |
    +-------+-------------+------+-----+---------+-------+
