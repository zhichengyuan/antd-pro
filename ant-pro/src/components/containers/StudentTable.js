import {connect} from 'dva'
import StudentTable from '../../pages/order/components/StudentTable'

const mapStateToProps = state => ({
    stus:state.student.result.datas,
    loading:state.loading.effects['student/fetchStudents']
})
export default connect(mapStateToProps)(StudentTable)