import request from '@/utils/request';
import axios from 'axios';

export function getHomeTab() {
  return request({
    url: '/index_list/0/data/1',
    method: 'get',
  });
}

export function getShowGoods(data) {
  return request({
    url: '/goods/list',
    method: 'post',
    data,
  });
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
}

export function addUser(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  });
}

export function getGoodsSearch(data) {
  return request({
    url: `/goods/search`,
    method: 'post',
    data,
  });
}

export function getGoodsDetail(id) {
  return request({
    url: `/goods/${id}`,
    method: 'get',
  });
}

export function addGoodsCart(data) {
  return request({
    url: `/cart/add`,
    method: 'post',
    data,
  });
}

export function getGoodsCart() {
  return request({
    url: `/cart/list`,
    method: 'get',
  });
}

export function deleteGoodsCart(data) {
  return request({
    url: `/cart/delete`,
    method: 'post',
    data,
  });
}

export function updateGoodsCart(data) {
  return request({
    url: `/updateNum`,
    method: 'post',
    data,
  });
}
// 新增收货地址
export function addAddress(data) {
  return request({
    url: `/address/add`,
    method: 'post',
    data,
  });
}

// 查询收货地址
export function selectAddress() {
  return request({
    url: `/address/list`,
    method: 'get',
  });
}
// 编辑收货地址
export function updateAddress(data) {
  return request({
    url: `/updateAddress`,
    method: 'post',
    data,
  });
}

// 获取地址详情
export const getAddressById = (params) => {
  return axios.post('/api/getAddressById', params);
};

//新增订单
export const addOrder = (data) => {
  return request({
    url: `/order/create`,
    method: 'post',
    data,
  });
};
//修改订单状态
export function updateOrderStatus(data) {
  return request({
    url: '/order/status',
    method: 'post',
    data,
  });
}

// 获取订单列表
export function getOrderList(data) {
  return request({
    url: `/order/list`,
    method: 'post',
    data,
  });
}

// 获取分类列表
export function getCategoryList() {
  return request({
    url: `/goods/c_list`,
    method: 'post',
  });
}