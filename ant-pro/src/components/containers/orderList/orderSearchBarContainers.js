import {connect} from 'dva'
import OrderSearchBar from '../../../pages/order/components/OrderSearchBar'

const mapStateToProps = state => ({
    defaultValue:{
        orderId:state.orderList.condition.orderId,
        sTime:state.orderList.condition.sTime,
        eTime:state.orderList.condition.eTime
    }
})
const mapDispatchToProps = dispatch => ({
    onSearch(newCondition){
        console.log(newCondition);
        //重新设置条件
        dispatch({
            type:'orderList/setCondition',
            payload:{
                ...newCondition,
                page:1
            }
        })
        //重新查询
        // dispatch({
        //     type:'students/fetchStudents',
        // })
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(OrderSearchBar)
