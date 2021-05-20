import {connect} from 'dva'
import TransSearch from '../components/TransSearch'

const mapStateToProps = state => {
    // console.log('state',state.trans)
    return {
    options:state.trans.cityResult,
    req:{
        cityCode:state.trans.req.cityCode,
        provinceCode:state.trans.req.provinceCode,
    }
}}
const mapDispatchToProps = dispatch => ({
    onSearch(newCondition){
        console.log(newCondition);
        // //重新设置条件
        dispatch({
            type:'trans/changeCondition',
            payload:{
                ...newCondition,
                page:1
            }
        })
        
        //重新查询
        dispatch({
            type:'trans/getPointList',
        })
    },
    addPoint(newShow) {
        console.log(newShow);
        let payload = {
            isShow: newShow,
            editObj:''
        }
        dispatch({
            type:'trans/setChangeIsShow',
            payload:payload
        })
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(TransSearch)
