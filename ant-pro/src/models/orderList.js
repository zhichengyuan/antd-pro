import {getTransList} from '../services/order'
import { routerRedux } from 'dva/router'

const OrderListModel = {
    namespace: 'orderList',
    state :{
        condition:{//搜索条件
            page:1,
            limit:10,
            orderId:'',
            sTime:'',
            eTime:''
        },
        result:{
            total:0,//总数据量
            datas:[]//学生数据
        }
    },
    subscriptions:{
        listenUrl({history,dispatch}) {
            console.log('我懂你')
            history.listen((newLocation) => {
                console.log(newLocation);
                if(newLocation.pathname !== '/home/order/orderlist') {
                    return;
                }
                let query = newLocation.query;
                query.limit && (query.limit = +query.limit)
                query.page && (query.page = +query.page)
                dispatch({
                    type:'changeCondition',
                    payload:query
                })
                dispatch({
                    type:'getTrans'
                })
            })
        }
    },
    reducers:{
        changeCondition(state,{payload}) {
            return {
                ...state,
                condition:{
                    ...state.condition,
                    ...payload
                }
            }
        },
        setResult(state,{payload}) {
            return {
                ...state,
                result:payload
            }
        }
    },
    effects:{
        *setCondition(action,{put,select}) {
            //改变地址
            let condition = yield select(state => state.orderList.condition);
            condition = {
                ...condition,
                ...action.payload
            }
            console.log('新条件',condition);
            yield put({
                type:'changeCondition',
                payload:condition
            })
            yield put(routerRedux.push(`?orderId=${condition.orderId}&page=${condition.page}&limit=${condition.limit}&sTime=${condition.sTime}&eTime=${condition.eTime}`))
        },
        /**
         * 根据当前的条件，搜索学生
         */
        *getTrans(action,{put,select,call}) {
            //拿到当前的搜索条件 
            const condition = yield select(state => state.orderList.condition);
            const result = yield call(getTransList,condition);
            console.log('真结果',result)
            yield put({
                type:'setResult',
                payload:{
                    total:result.data.total,
                    datas:result.data.items
                }
            })
        }
    }
}

export default OrderListModel