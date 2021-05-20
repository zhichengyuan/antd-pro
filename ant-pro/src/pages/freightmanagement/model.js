import {queryCity,queryTransPrice,getline} from '../../services/transPrice'
const transModel = {
    namespace: 'trans',   
    state :{
        req:{//搜索条件
            type:'point',
            cityCode:'',
            provinceCode:''
        },
        paging:{
            page:1,
            limit:10,
        },
        result:{
            total:0,//总数据量
            datas:[]//学生数据
        },
        transForm:{
            isShow:false,
            editObj:''
        },
        cityResult:[],
        linResult:[],
        
    },
    subscriptions:{
        listenUrl({dispatch}) {
            dispatch({
                type:'getCtiy'
            });
            dispatch({
                type:'getPointList'
            })
            dispatch({
                type:'getLineList'
            })
        }
    },
    reducers:{
        setList(state,{payload}) {
            return {
                ...state,
                linResult:payload
            }
        },
        setCityResult(state,{payload}) {
            return {
                ...state,
                cityResult:payload
            }
        },
        changeCondition(state,{payload}) {
            return {
                ...state,
                req:{
                    ...state.req,
                    cityCode:payload.cityCode,
                    provinceCode:payload.provinceCode
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
                transForm:{
                    ...state.transForm,
                    isShow:payload.isShow,
                    editObj:payload.editObj
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
         * 获取运费列表
         * @param {*} action 
         * @param {*} param1 
         */
        *getPointList(action,{put,select,call}) {
            const req = yield select(state => state.trans.req);
            const paging = yield select(state => state.trans.paging)
            if(req.cityCode == '') {
                delete req.cityCode
            }
            if(req.provinceCode == '') {
                delete req.provinceCode
            }
            let data = {
                req,
                paging
            }
            const res = yield call(queryTransPrice,data);
            yield put({
                type:'setResult',
                payload:{
                    total:res.data.total,
                    datas:res.data.items
                }
            })
        },
        /**
         * 获取路线
         * @param {*} action 
         * @param {*} param1 
         */
        *getLineList(action,{put,call}){
            const res = yield call(getline);
            console.log(res);
            yield put({
                type:'setList',
                payload:res.data
            })
        },
        /**
         * 请求自提点城市
         */
        *getCtiy(action,{put,call}) {
            const req = yield call(queryCity);
            // console.log(req);
            yield put({
                type:'setCityResult',
                payload:req.data
            })
        }
    }
}

export default transModel;