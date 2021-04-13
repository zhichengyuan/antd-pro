import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function queryUserList(data) {
  console.log(data);
  return await request({
      url: '/server/user/list',
      method: 'post',
      data
  })
}
