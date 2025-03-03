import request from '@/utils/request';

export function getGoodsList(params) {
  return request({
    url: '/api/goods/list',
    method: 'get',
    params,
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
    method: 'put',
    data,
  });
}

export function deleteGoods(id) {
  return request({
    url: `/api/goods/delete/${id}`,
    method: 'delete',
  });
}
