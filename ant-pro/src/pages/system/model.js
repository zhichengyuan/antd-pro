import {queryUserList} from '../../services/user'
const staffModel = {
    namespace: 'staff',   
    state :{
        req:{//搜索条件
            status:''
        },
        paging:{
            page:1,
            limit:10,
        },
        result:{
            total:0,//总数据量
            datas:[]//学生数据
        },
        staffForm:{
            isShow:false
        }
        
    },
    subscriptions:{
        listenUrl({dispatch}) {
            dispatch({
                type:'fetchUserList'
            })
            
        }
    },
    reducers:{
        changeCondition(state,{payload}) {
            return {
                ...state,
                req:{
                    ...state.req,
                    status:payload.status
                },
                paging:{
                    ...state.paging,
                    page:payload.page
                }
            }
        },
        changeReqPage(state,{payload}){
            return {
                ...state,
                paging:{
                    ...state.paging,
                    page:payload.page
                }
            }
        },
        setChangeIsShow(state,{payload}) {
            return {
                ...state,
                staffForm:{
                    ...state.staffForm,
                    isShow:payload
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
        *setReqPage(action,{put,select}) {
            //改变地址
            let paging = yield select(state => state.staff.paging);
            console.log(action,paging);
            yield put({
                type:'changeReqPage',
                payload:{
                    page:action.payload.page
                }
            })
            yield put({
                type:'fetchUserList'
            })
        },
        /**
         * 根据当前的条件，搜索学生
         */
        *fetchUserList(action,{put,select,call}) {
            //拿到当前的搜索条件 
            const req = yield select(state => state.staff.req);
            if(req.status == '') {
                delete req.status
            }
            const paging = yield select(state => state.staff.paging)
            let data = {
                req,
                paging
            }
            // const result = yield call(searchStudents,condition);
            const result = yield call(queryUserList,data);
            
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

export default staffModel;