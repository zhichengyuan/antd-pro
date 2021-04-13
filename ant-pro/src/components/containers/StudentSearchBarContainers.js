import {connect} from 'dva'
import StudentSearchBar from '../../pages/order/components/StudentSearchBar'

const mapStateToProps = state => ({
    defaultValue:{
        key:state.student.condition.key,
        sex:state.student.condition.sex
    }
})
const mapDispatchToProps = dispatch => ({
    onSearch(newCondition){
        console.log(newCondition);
        // //重新设置条件
        dispatch({
            type:'student/setCondition',
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
export default connect(mapStateToProps,mapDispatchToProps)(StudentSearchBar)
// export default connect(({ student }) => {
//     console.log('student',student)
//     return {
//         defaultValue: student.condition,
//     //   submitting: loading.effects['login/login'],
//     }
//   })(StudentSearchBar);