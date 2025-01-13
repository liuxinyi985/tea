import request from '@/utils/request'

export function getHomeTab() {
  return request({
    url: '/index_list/0/data/1',
    method: 'get'
  })
}

export function getShowGoods() {
  return request({
    url: '/goods/shopList',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function getGoodsSearch(data) {
  return request({
    url: `/goods/search`,
    method: 'post',
    data
  });
}

export function getGoodsDetail(id) {
  return request({
    url: `/api/shopGoods/${id}`,
    method: 'get',
  });
}