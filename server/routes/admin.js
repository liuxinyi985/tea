const express = require('express');
const router = express.Router();
const connection = require('../db/sql');

// 商品列表
router.get('/api/goods/list', async (req, res) => {
  const { page = 1, limit = 10, keyword = '' } = req.query;
  const offset = (page - 1) * limit;

  try {
    let sql = 'SELECT * FROM showgoods';
    let countSql = 'SELECT COUNT(*) as total FROM showgoods';

    if (keyword) {
      sql += ` WHERE name LIKE '%${keyword}%'`;
      countSql += ` WHERE name LIKE '%${keyword}%'`;
    }

    sql += ` LIMIT ${limit} OFFSET ${offset}`;

    const [rows, countResult] = await Promise.all([
      query(sql),
      query(countSql),
    ]);

    res.json({
      code: 200,
      data: {
        total: countResult[0].total,
        items: rows,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '服务器错误',
    });
  }
});

// 创建商品
router.post('/api/goods/create', async (req, res) => {
  const { goods_name, goods_price, goods_imgUrl } = req.body;

  try {
    const sql = `INSERT INTO showgoods (name, price, url) VALUES (?, ?, ?)`;
    await query(sql, [goods_name, goods_price, goods_imgUrl]);

    res.json({
      code: 200,
      message: '创建成功',
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '服务器错误',
    });
  }
});

// 更新商品
router.put('/api/goods/update', async (req, res) => {
  const { id, goods_name, goods_price, goods_imgUrl } = req.body;

  try {
    const sql = `UPDATE showgoods SET name = ?, price = ?, url = ? WHERE id = ?`;
    await query(sql, [goods_name, goods_price, goods_imgUrl, id]);

    res.json({
      code: 200,
      message: '更新成功',
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '服务器错误',
    });
  }
});

// 删除商品
router.delete('/api/goods/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `DELETE FROM showgoods WHERE id = ?`;
    await query(sql, [id]);

    res.json({
      code: 200,
      message: '删除成功',
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '服务器错误',
    });
  }
});

module.exports = router;
