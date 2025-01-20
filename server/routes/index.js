var express = require('express');
var router = express.Router();
let connection = require('../db/sql');
let user = require('../db/userSql');
let jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/home', function (req, res, next) {
  res.json({
    code: 200,
    message: 'Welcom11e to the PI',
    data: { username: '1111111', email: 'johndoe@example.com' },
  });
});
// 查询商品数据
router.get('/api/goods/shopList', function (req, res, next) {
  connection.query('select * from showgoods', function (err, result) {
    if (err) throw err;
    res.send({
      code: 0,
      data: result,
    });
  });
});
// 搜索商品数据
router.post('/api/goods/search', function (req, res, next) {
  // 获取前端传递的搜索关键字
  console.log(req.body, 'req');

  const keyword = req.body.keyword;

  // 如果没有传递关键字，返回错误信息
  if (!keyword) {
    return res.send({
      code: 1,
      message: '请输入搜索关键字',
    });
  }

  // 构造 SQL 查询语句，使用 LIKE 进行模糊匹配
  const sql = `SELECT * FROM showgoods WHERE name LIKE ?`;
  const searchKeyword = `%${keyword}%`; // 添加 % 通配符以实现模糊匹配

  // 执行查询
  connection.query(sql, [searchKeyword], function (err, result) {
    if (err) {
      // 如果查询出错，返回错误信息
      return res.send({
        code: 1,
        message: '数据库查询失败',
        error: err.message,
      });
    }

    // 返回查询结果
    res.send({
      code: 0,
      data: result,
    });
  });
});

// 根据商品 ID 查询数据
router.get('/api/shopGoods/:id', function (req, res, next) {
  const productId = req.params.id; // 从路由参数中获取商品 ID
  const sql = `SELECT * FROM showgoods WHERE id = ?`;
  connection.query(sql, [productId], function (err, result) {
    if (err) throw err;
    res.send({
      code: 200,
      data: result,
    });
  });
});
//首页推荐的数据
router.get('/api/index_list/0/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      topBar: [
        { id: 0, label: '推荐' },
        { id: 1, label: '大红袍' },
        { id: 2, label: '铁观音' },
        { id: 3, label: '绿茶' },
        { id: 4, label: '普洱' },
        { id: 5, label: '茶具' },
        { id: 6, label: '花茶' },
      ],
      data: [
        //这是swiper
        {
          id: 0,
          type: 'swiperList',
          data: [
            { id: 0, imgUrl: './images/swiper1.jpeg' },
            { id: 1, imgUrl: './images/swiper2.jpeg' },
            { id: 3, imgUrl: './images/swiper3.jpeg' },
          ],
        },
        //这是icons
        {
          id: 1,
          type: 'iconsList',
          data: [
            {
              id: 1,
              title: '自饮茶',
              imgUrl: './images/icons1.png',
            },
            {
              id: 2,
              title: '茶具',
              imgUrl: './images/icons2.png',
            },
            {
              id: 3,
              title: '茶礼盒',
              imgUrl: './images/icons3.png',
            },
            {
              id: 4,
              title: '领福利',
              imgUrl: './images/icons4.png',
            },
            {
              id: 5,
              title: '官方验证',
              imgUrl: './images/icons5.png',
            },
          ],
        },
        //爆款推荐
        {
          id: 3,
          type: 'recommendList',
          data: [
            {
              id: 1,
              name: '龙井1號铁罐250g',
              content: '鲜爽甘醇 口粮首选',
              price: '68',
              imgUrl: './images/recommend.jpeg',
            },
            {
              id: 2,
              name: '龙井1號铁罐250g',
              content: '鲜爽甘醇 口粮首选',
              price: '68',
              imgUrl: './images/recommend.jpeg',
            },
          ],
        },
        //猜你喜欢
        {
          id: 4,
          type: 'likeList',
          data: [
            {
              id: 1,
              imgUrl: './images/like.jpeg',
              name: '建盏茶具套装 红色芝麻毫 12件套',
              price: 299,
            },
            {
              id: 2,
              imgUrl: './images/like.jpeg',
              name: '建盏茶具套装 红色芝麻毫 12件套',
              price: 299,
            },
            {
              id: 3,
              imgUrl: './images/like.jpeg',
              name: '建盏茶具套装 红色芝麻毫 12件套',
              price: 299,
            },
          ],
        },
      ],
    },
  });
});

//添加购物车数据
router.post('/api/addCart', function (req, res, next) {
  //后端接收前端的参数
  let goodsId = req.body.goodsId;

  //token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  let tokenObj = jwt.decode(token);

  //如果执行，就证明token过期了
  // if(  getTimeToken(tokenObj.exp) ){
  //     res.send({
  //         data:{
  //             code:1000
  //         }
  //     })
  // }

  //查询用户
  connection.query(
    `select * from user where userTel = ${tokenObj.tel}`,
    function (error, results) {
      //用户id

      let uId = results[0].id;

      //查询商品
      connection.query(
        `select * from showgoods where id=${goodsId}`,
        function (err, result) {
          let goodsName = result[0].name;
          let goodsPrice = result[0].price;
          let goodsImgUrl = result[0].url;
          //查询当前用户在之前是否添加过本商品
          connection.query(
            `select * from goods_cart where uId=${uId} and goods_id=${goodsId}`,
            function (e, r) {
              //用户之前是添加过商品到购物车
              if (r.length > 0) {
                console.log(r, 'r');
                
                let num = r[0].goods_num;
                console.log(num, 'num');
                
                connection.query(
                  `update goods_cart set goods_num = replace(goods_num,${num},${
                    parseInt(num) + 1
                  }) where id = ${r[0].id}`,
                  function (e, datas) {
                    res.send({
                      data: {
                        code: 200,
                        success: true,
                        msg: '添加成功',
                      },
                    });
                  }
                );
              } else {
                //没有
                connection.query(
                  `insert into goods_cart (uId,goods_id,goods_name,goods_price,goods_num,goods_imgUrl) values ("${uId}","${goodsId}","${goodsName}","${goodsPrice}","1","${goodsImgUrl}")`,
                  function () {
                    res.send({
                      data: {
                        code: 200,
                        success: true,
                        msg: '添加成功',
                      },
                    });
                  }
                );
              }
            }
          );
        }
      );
    }
  );
});
//查询购物车数据
router.post('/api/selectCart', function (req, res, next) {
  //token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let tokenObj = jwt.decode(token);
  console.log(tokenObj, 'tokenObj');

  //查询用户
  connection.query(
    `select * from user where userTel = ${tokenObj.tel}`,
    function (error, results) {
      //用户id
      let uId = results[0].id;
      //查询购物车
      connection.query(
        `select * from goods_cart where uId = ${uId}`,
        function (err, result) {
          res.send({
            data: {
              code: 200,
              success: true,
              data: result,
            },
          });
        }
      );
    }
  );
});
// 删除购物车数据
router.post('/api/deleteCart', function (req, res, next) {
  let arrId = req.body.arrId;
console.log(arrId,'arrId');


    connection.query(
      `delete from goods_cart where id = ${arrId}`,
      function (error, results) {
        res.send({
          data: {
            code: 200,
            success: true,
            msg: '删除成功',
          },
        });
      }
    );
  
});
//修改购物车数量
router.post('/api/updateNum',function(req,res,next){
    
    let id = req.body.id;
    let changeNum = req.body.num;
    
    connection.query(`select * from goods_cart where id = ${id}`,function(error,results){
        connection.query(
          `update goods_cart set goods_num = ${changeNum} where id = ${id}`,
          function (err, result) {
            res.send({
              data: {
                code: 200,
                success: true,
              },
            });
          }
        );
        
    })
    
})
// 登录
router.post('/api/login', function (req, res, next) {
  //后端要接收前端传递过来的值
  let params = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd,
  };
  connection.query(
    user.queryUserPhone(params.userTel),
    function (err, results) {
      if (results) {
        connection.query(
          user.queryUserPassword(params.userTel, params.userPwd),
          function (err, results) {
            if (results.length > 0) {
              res.send({
                code: 200,
                msg: '登录成功',
                data: results,
              });
            } else {
              res.send({
                code: 401,
                msg: '密码错误',
              });
            }
          }
        );
      } else {
        res.send({
          code: 401,
          data: '用户名不存在',
        });
      }
    }
  );
});

//注册
router.post('/api/register', function (req, res, next) {
  console.log(req.body, '注册');

  let params = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd,
  };
  //查询用户是否存在
  connection.query(
    user.queryUserPhone(params.userTel),
    function (error, results) {
      console.log(results, 'results');

      //用户存在
      if (results.length > 0) {
        res.send({
          code: 400,
          data: {
            success: true,
            msg: '账号已存在',
            data: results[0],
          },
        });
      } else {
        //不存在，新增一条数据
        connection.query(user.inserData(params), function (err, result) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '注册成功',
              code: 200,
            },
          });
        });
      }
    }
  );
});

module.exports = router;
