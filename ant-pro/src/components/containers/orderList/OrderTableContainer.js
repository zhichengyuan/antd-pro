import {connect} from 'dva'
import OrderTable from '../../../pages/order/components/OrderTable'

const mapStateToProps = state => ({
    datas:state.orderList.result.datas,
    loading:state.loading.effects['orderList/getTrans']
})
export default connect(mapStateToProps)(OrderTable)