import request from '@/utils/request';

//获取订单列表
export async function getTransList({orderId,page,limit,eTime,sTime}) {
    let data = {
        paging:{},
        req:{},
        sort:'+id'
    };
    if(orderId !== '') {
        data.req.orderId = orderId
    }
    // if(eTime !=='') {
    //     data.req.eTime = eTime;
    // }
    // if(sTime !=='') {
    //     data.req.sTime = sTime;
    // }
    data.paging.page = page;
    data.paging.limit = limit;
    console.log(data);
    return await request('/server/trans/list',{
        method: 'POST',
        data
    })
}

