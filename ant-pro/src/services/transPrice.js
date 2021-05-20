import request from '@/utils/request';
export async function queryTransPrice(data) {
  return await request('/server/point/info',{
      method: 'POST',
      data
  })
}
export async function queryCity() {
  return await request('/server/point/city',{
      method: 'Get'
  })
}
export async function getline() {
  return await request('/server/point/getline',{
      method: 'Get'
  })
}
export async function saveTransPrice(data) {
  console.log(data);
  return await request('/server/point/save',{
      method: 'POST',
      data
  })
}

