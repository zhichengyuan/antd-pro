import {connect} from 'dva'
import { Pagination } from 'antd';

const mapStateToProps = state => ({
    current:state.staff.paging.page,
    total:state.staff.result.total,
    pageSize:state.staff.paging.limit,
    showQuickJumper:true,
    showSizeChanger:false
})

const mapDispatchToProps = dispatch => ({
    onChange(newPage){
        //重新设置条件
        dispatch({
            type:'staff/setReqPage',
            payload:{
                page:newPage
            }
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Pagination)