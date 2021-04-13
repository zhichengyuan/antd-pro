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
        }
    },
    
    reducers:{
        changeCondition(state,{payload}) {
            console.log(payload);
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
        setResult(state,{payload}) {
            return {
                ...state,
                result:payload
            }
        }
    },
    effects:{
        // *setCondition(action,{put,select}) {
        //     //改变地址
        //     let condition = yield select(state => state.student.condition);
        //     condition = {
        //         ...condition,
        //         ...action.payload
        //     }
        //      yield put(routerRedux.push(`?key=${condition.key}&page=${condition.page}&limit=${condition.limit}&sex=${condition.sex}`))
        // },
        /**
         * 根据当前的条件，搜索学生
         */
        *fetchUserList(action,{put,select,call}) {
            //拿到当前的搜索条件 
            const req = yield select(state => state.staff.req);
            const paging = yield select(state => state.staff.paging)
            let data = {
                req,
                paging
            }
            // const result = yield call(searchStudents,condition);
            const result = yield call(queryUserList,data);
            console.log(result);
            // console.log('真结果',result)
            // yield put({
            //     type:'setResult',
            //     payload:{
            //         total:result.cont,
            //         datas:result.datas
            //     }
            // })
        }
    }
}

export default staffModel;