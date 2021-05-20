import React,{useState,useEffect} from 'react'
import {connect} from 'dva'
import { Modal,Button,Form,Spin, Input,message,Radio ,Select } from 'antd';
import {saveUser} from '../../../services/user'



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
    const rolesOptionsList =[
      {value: 'O',label:'员工'},
      {value: 'ZZC',label:'中转仓库'},
      {value: 't',label:'物流管理员'},
      {value: 'QG',label:'仓库清关'},
      {value: 'ZT',label:'自提点'},
    ];
    return rolesOptionsList.map((e,i) => (<Select.Option key={i} value={e.value}>{e.label}</Select.Option>))
  };

function StaffForm(props) {

    const [userObj, setUserObj] = useState({
      address: "",
      enable: "",
      nickname: "",
      password: "Hfhj@2020",
      remark: "",
      roles: ["ZT"],
      status: "",
      storename: "admin",
      tel: "",
      username: "",
    })

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
         
          if(props.editObj != '') {
            setIsLoading(true);
            setUserObj(props.editObj);
            form.setFieldsValue(props.editObj);
            setIsLoading(false)
          }else {
            form.setFieldsValue({
              address: "",
              enable: "",
              nickname: "",
              password: "Hfhj@2020",
              remark: "",
              roles: '',
              status: "disactive",
              storename: "admin",
              tel: "",
              username: "",

            });
            // setUser()
            setIsLoading(false)
          }
          
    }
    
    //提交
    const  onFinish = async (values) => {
     
        console.log(values);
        setIsLoading(true)
        add1(values);
    };
    //添加用户
    async function add1(stuObj) {
      let newObj = Object.assign({},userObj,stuObj);
      
      newObj.nickname = newObj.username;
      if(!Array.isArray(newObj.roles)){
        newObj.roles = [newObj.roles];
      }
      
      // console.log('顶的',newObj);
      // return
      const resp = await saveUser(newObj);
      // console.log(resp);
      if(resp.code == '0') {
        message.success('保存成功',1).then(() => {
          // props.history.push('/student');
          handleOk();
          props.getUserList && props.getUserList();
          setIsLoading(false)
        });
        
      }else {
        message.error(resp.msg,2).then(() => {
          // props.history.push('/student');
          setIsLoading(false)
        });
      }
      
    }


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <>
          <Modal title="用户信息" visible={props.isShow} footer={null} onOk={handleOk} onCancel={handleCancel}>
            <Spin tip="提交中，请稍后...." spinning={isLoading}>
              <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
              >
                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="角色" name='roles'
                    rules={[
                      {
                        required: true,
                        message: '请选择角色!',
                      },
                    ]}
                  >
                  <Select>
                  {createOptions()}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="住址"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: '请填写正确的住址!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="手机号"
                  name="tel"
                  rules={[
                    {
                      required: true,
                      message: '请填写手机号',
                    },
                    {
                      pattern:/1\d{10}/,message:'请填写正确的手机号！'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="备注"
                  name="remark"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="状态"
                  name="status"
                >
                  <Radio.Group >
                    <Radio.Button value={'active'}>激活</Radio.Button>
                    <Radio.Button value={'disactive'}>禁用</Radio.Button>
                  </Radio.Group>
                </Form.Item>
          
          
                <Form.Item {...tailLayout}>
                  <Button style={{
                    marginRight:'10px'
                  }} onClick={() => {
                      handleOk()
                    }}>
                      取消
                  </Button>
                  <Button type="primary" htmlType="submit">
                    确定
                  </Button>
                  
                </Form.Item>
              </Form>
            </Spin>
      
          </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    isShow:state.staff.staffForm.isShow,
    editObj:state.staff.staffForm.editObj
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
            type:'staff/setChangeIsShow',
            payload:payload
        })
    },
    getUserList(){
      dispatch({
        type:'staff/fetchUserList'
      })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(StaffForm)
