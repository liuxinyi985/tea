import request from '@/utils/request';

export function getGoodsList(data) {
  return request({
    url: 'api/goods/list',
    method: 'post',
    data
  });
}

export function createGoods(data) {
  return request({
    url: '/api/goods/create',
    method: 'post',
    data,
  });
}

export function updateGoods(data) {
  return request({
    url: '/api/goods/update',
    method: 'post',
    data,
  });
}

export function deleteGoods(id) {
  return request({
    url: `/api/goods/delete/${id}`,
    method: 'post',
  });
}

//数据统计
export function getStatistics(data) {
  return request({
    url: '/api/order/statistic',
    method: 'post',
    data
  });
}

//获取订单
export function getOrderList(data) {
  return request({
    url: '/api/order/list',
    method:'post',
    data
  });
}

//修改订单状态
export function updateOrderStatus(data) {
  return request({
    url: '/api/order/status',
    method: 'post',
    data,
  });
}