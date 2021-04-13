import React,{useState,useEffect} from 'react'
import {connect} from 'dva'
import { Modal,Button,Form,Spin, Input,message,Radio ,Select } from 'antd';

const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };
  const createOptions=() => {
    const options =[];
    for(var i = 1980 ;i<=2010;i++) {
      options.push(<Select.Option key={i} value={i}>{i}</Select.Option>)
    }
    return options
  };

function StaffForm(props) {

    const handleOk = () => {
      props.onChange && props.onChange(!props.isShow);
    };
  
    const handleCancel = () => {
      props.onChange && props.onChange(!props.isShow);
    };

    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setIntvalues()
    })
    //初始化数据
    const setIntvalues =() => {
      // console.log('props',props.updataMovie);
         
          if(props.sNo) {
            setIsLoading(true)
            getStudent(props.sNo)
            setIsLoading(false)
          }else {
            form.setFieldsValue({
              name:'',
              sNo:'',
              sex:0,
              isMonitor:false,
              birth:'',
              phone:'',
              address:'',
              email:'1798788388@qq.com',
            });
            // setUser()
            setIsLoading(false)
          }
          
      }
    
    return (
        <>
            <Modal title="Basic Modal" visible={props.isShow} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    isShow:state.staff.staffForm.isShow
})

const mapDispatchToProps = dispatch => ({
    onChange(newObj){
        // console.log(newObj)
        //重新设置条件
        dispatch({
            type:'staff/setChangeIsShow',
            payload:newObj
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(StaffForm)
