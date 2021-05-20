import {connect} from 'dva'
import TransForm from '../components/TransForm'

const mapStateToProps = state => ({
    isShow:state.trans.transForm.isShow,
    editObj:state.trans.transForm.editObj,
    cityResult:state.trans.cityResult,
    linResult:state.trans.linResult
})

const mapDispatchToProps = dispatch => ({
    onChange(newObj){
        // console.log(newObj)
        //重新设置条件
        let payload = {
          isShow: newObj,
          editObj:''
        }
        dispatch({
            type:'trans/setChangeIsShow',
            payload:payload
        })
    },
    getPointList(){
      dispatch({
        type:'trans/getPointList'
      })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(TransForm)
