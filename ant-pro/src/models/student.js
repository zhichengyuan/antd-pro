// import {searchStudents} from '../services/student'
import { routerRedux } from 'dva'
 
const StudentModel = {
    namespace: 'student',
    state :{
        condition:{//搜索条件
            page:1,
            limit:10,
            key:'',
            sex:-1
        },
        result:{
            total:0,//总数据量
            datas:[]//学生数据
        }
    },
    subscriptions:{
        listenUrl({history,dispatch}) {
            history.listen((newLocation) => {
                if(newLocation.pathname !== '/student') {
                    return;
                }
                let query = newLocation.query;
                query.limit && (query.limit = +query.limit)
                query.page && (query.page = +query.page)
                query.sex && (query.sex = +query.sex)
                dispatch({
                    type:'changeCondition',
                    payload:query
                })
                dispatch({
                    type:'fetchStudents'
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
            let condition = yield select(state => state.students.condition);
            condition = {
                ...condition,
                ...action.payload
            }
            yield put(routerRedux.push(`?page=${condition.page}&limit=${condition.limit}&sex=${condition.sex}&key=${condition.key}`))
        },
        /**
         * 根据当前的条件，搜索学生
         */
        *fetchStudents(action,{put,select,call}) {
            //拿到当前的搜索条件 
            const condition = yield select(state => state.students.condition);
            const result = yield call(searchStudents,condition);
            yield put({
                type:'setResult',
                payload:{
                    total:result.cont,
                    datas:result.datas
                }
            })
        }
    }
}

export default StudentModel