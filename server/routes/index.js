var express = require('express');
var router = express.Router();
let connection = require('../db/sql')
let user = require('../db/userSql')
let jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/home', function(req, res, next) {
  res.json({
    code: 200,
    message: 'Welcom11e to the PI',
    data: {username: '1111111', email: 'johndoe@example.com'}}
     )
})
// 查询商品数据
router.get('/api/goods/shopList', function(req, res, next) {
  connection.query('select * from showgoods', function(err, result) {
    if (err) throw err;
    res.send({
		code:0,
		data:result
		})
  })
})
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
router.get('/api/shopGoods/:id', async (req, res, next) => {
  const productId = req.params.id; // 从路由参数中获取商品 ID

  try {
    // 查询数据库
    const [rows] = await pool.query('SELECT * FROM showgoods WHERE id = ?', [
      productId,
    ]);

    // 如果未找到商品
    if (rows.length === 0) {
      return res.status(404).json({
        code: 404,
        message: 'Product not found',
      });
    }

    // 返回商品数据
    res.json({
      code: 200,
      message: 'Product found',
      data: rows[0], // 返回查询到的第一条数据
    });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
});
//首页推荐的数据
router.get('/api/index_list/0/data/1', function(req, res, next) {
	res.send({
		code:0,
		data:{
			topBar:[
				{id:0,label:'推荐'},
				{id:1,label:'大红袍'},
				{id:2,label:'铁观音'},
				{id:3,label:'绿茶'},
				{id:4,label:'普洱'},
				{id:5,label:'茶具'},
				{id:6,label:'花茶'},
			],
			data:[
				//这是swiper
				{
					id:0,
					type:'swiperList',
					data:[
						{id:0,imgUrl:'./images/swiper1.jpeg'},
						{id:1,imgUrl:'./images/swiper2.jpeg'},
						{id:3,imgUrl:'./images/swiper3.jpeg'}
					]
				},
				//这是icons
				{
					id:1,
					type:'iconsList',
					data:[
						{
							id:1,
							title:'自饮茶',
							imgUrl:'./images/icons1.png'
						},
						{
							id:2,
							title:'茶具',
							imgUrl:'./images/icons2.png'
						},
						{
							id:3,
							title:'茶礼盒',
							imgUrl:'./images/icons3.png'
						},
						{
							id:4,
							title:'领福利',
							imgUrl:'./images/icons4.png'
						},
						{
							id:5,
							title:'官方验证',
							imgUrl:'./images/icons5.png'
						}
					]
				},
				//爆款推荐
				{
					id:3,
					type:'recommendList',
					data:[
						{
							id:1,
							name:'龙井1號铁罐250g',
							content:'鲜爽甘醇 口粮首选',
							price:'68',
							imgUrl:'./images/recommend.jpeg'
						},
						{
							id:2,
							name:'龙井1號铁罐250g',
							content:'鲜爽甘醇 口粮首选',
							price:'68',
							imgUrl:'./images/recommend.jpeg'
						}
					]
				},
				//猜你喜欢
				{
					id:4,
					type:'likeList',
					data:[
						{
							id:1,
							imgUrl:'./images/like.jpeg',
							name:'建盏茶具套装 红色芝麻毫 12件套',
							price:299
						},
						{
							id:2,
							imgUrl:'./images/like.jpeg',
							name:'建盏茶具套装 红色芝麻毫 12件套',
							price:299
						},
						{
							id:3,
							imgUrl:'./images/like.jpeg',
							name:'建盏茶具套装 红色芝麻毫 12件套',
							price:299
						}
					]
				}
				
			]
		}
	})
});

// 登录
router.post('/api/login', function(req, res, next) {
    //后端要接收前端传递过来的值
	let params = {
		userTel : req.body.userTel,
		userPwd : req.body.userPwd
	};
	connection.query( user.queryUserPhone(params.userTel), function(err, results){
		if(results) {
			console.log(results,'results');
			
			connection.query( user.queryUserPassword(params.userTel,params.userPwd), function(err, results){
			    if(results.length > 0) {
                  	res.send({
				     code:200,
					 msg:'登录成功',
				     data:results
			        })
				}else{
					res.send({
						code:401,
						msg:'密码错误'
					})
				}
			})
		
		}else {
			res.send({
				code:401,
				data:'用户名不存在'
			})
		}
	})
})

//注册
router.post('/api/register',function(req,res,next){
	console.log(req.body,'注册');
	
	let params = {
		userTel : req.body.userTel,
		userPwd : req.body.userPwd
	};
	//查询用户是否存在
	connection.query( user.queryUserPhone( params.userTel ) ,function(error,results){
		console.log(results,'results');
		
		//用户存在
		if( results.length > 0 ){
			res.send({
				code:400,
				data:{
					success:true,
					msg:'账号已存在',
					data:results[0]
				}
			})
		}else{
			//不存在，新增一条数据
			connection.query( user.inserData ( params ),function(err,result){
				
					res.send({
						code:200,
						data:{
							success:true,
							msg:'注册成功',
							code:200,
						}
					})
				
			})
		}
	})
})

module.exports = router;
