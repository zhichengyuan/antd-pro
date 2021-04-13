import {connect} from 'dva'
import { Pagination } from 'antd';

const mapStateToProps = state => ({
    current:state.student.condition.page,
    total:state.student.result.total,
    pageSize:state.student.condition.limit,
    showQuickJumper:true,
    showSizeChanger:false
})

const mapDispatchToProps = dispatch => ({
    onChange(newPage){
        //重新设置条件
        dispatch({
            type:'student/setCondition',
            payload:{
                page:newPage
            }
        })
        //重新查询
        // dispatch({
        //     type:'students/fetchStudents',
        // })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Pagination)