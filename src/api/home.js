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
    url: `/shopGoods/${id}`,
    method: 'get',
  });
}

export function addGoodsCart(data) {
  return request({
    url: `/addCart`,
    method: 'post',
    data
  })
}         

export function getGoodsCart() {
  return request({
    url: `/selectCart`,
    method: 'post',
  });
}

export function deleteGoodsCart(data) {
  return request({
    url: `/deleteCart`,
    method: 'post',
    data
  });
}

export function updateGoodsCart(data) {
  return request({
    url: `/updateNum`,
    method: 'post',
    data,
  });
}