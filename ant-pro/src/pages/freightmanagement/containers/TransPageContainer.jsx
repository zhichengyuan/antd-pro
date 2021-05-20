import {connect} from 'dva'
import { Pagination } from 'antd';

const mapStateToProps = state => ({
    current:state.trans.paging.page,
    total:state.trans.result.total,
    pageSize:state.trans.paging.limit,
    showQuickJumper:true,
    showSizeChanger:false
})

const mapDispatchToProps = dispatch => ({
    onChange(newPage){
        //重新设置条件
        dispatch({
            type:'trans/changeReqPage',
            payload:{
                page:newPage
            }
        })
        //重新查询
        dispatch({
            type:'trans/getPointList',
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Pagination)
