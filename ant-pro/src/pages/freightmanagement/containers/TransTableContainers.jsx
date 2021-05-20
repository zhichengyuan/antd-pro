import {connect} from 'dva'
import TransTable from '../components/TransTable'

const mapStateToProps = state => {
    // console.log('state',state.trans)
    return {
        transList:state.trans.result.datas,
        loading:state.loading.effects['trans/getPointList']
}}
const mapDispatchToProps = dispatch => ({
    onChange(item){
        // console.log(item);
        let payload = {
            isShow:true,
            editObj:item
        }
        //重新设置条件
        dispatch({
            type:'trans/setChangeIsShow',
            payload:payload
        })
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(TransTable)
