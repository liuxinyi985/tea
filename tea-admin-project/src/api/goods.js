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
