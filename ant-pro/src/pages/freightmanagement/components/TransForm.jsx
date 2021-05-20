import React,{useState,useEffect} from 'react'
import { Modal,Button,Form,Spin, Input,message ,Select,Cascader } from 'antd';
import {saveTransPrice} from '../../../services/transPrice'
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


function TransForm(props) {
    const [transObj, setTransObj] = useState({
              name: "",
              detail: "",
              eFreight: "",
              pointId: "",
              postCode: "",
              wFreight: '',
              city:'',
              bind:'',
              cityCode:'',
              provinceCode:'',
              city:'',
              province:'',
              cityArr:[]
    });
    let cityCode = '';
    let provinceCode = '';
    let province = '';
    let city = '';
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
            props.editObj.cityArr =[props.editObj.provinceCode,props.editObj.cityCode];
            cityCode =  props.editObj.cityCode;
            provinceCode =  props.editObj.provinceCode;
            province =  props.editObj.province;
            city  =  props.editObj.city;
            setTransObj(props.editObj)
            
            form.setFieldsValue(props.editObj);
            setIsLoading(false)
          }else {
            
            form.setFieldsValue({
              name: "",
              detail: "",
              eFreight: "",
              pointId: "",
              postCode: "",
              wFreight: '',
              city:'',
              bind:'',
              cityCode:'',
              provinceCode:'',
              city:'',
              province:'',
              cityArr:[]

            });
            // setUser()
            setIsLoading(false)
          }
          
    }
    const createOptions=() => {
      return props.linResult.map((e,i) => (<Select.Option key={i} value={e.code}>{e.name}</Select.Option>))
    };
    const handleChange = (value,selectedOptions) => {   
        console.log(value,selectedOptions);
         cityCode = value[1];
         provinceCode = value[0];
         province = selectedOptions[0].label;
         city  = selectedOptions[1].label;
    }
    //提交
    const  onFinish = async (values) => {
        setIsLoading(true)
        add1(values);
    };
    //添加用户
    async function add1(obj) {
      // console.log(obj);
      let newObj = Object.assign({},transObj,obj);
      newObj.city=city;
      newObj.province=province;
      newObj.provinceCode=provinceCode;
      newObj.cityCode=cityCode;
      delete newObj.cityArr;
      console.log(newObj);
      const resp = await saveTransPrice(newObj);
      // console.log(resp);
      if(resp.code == '0') {
        message.success('保存成功',1).then(() => {
          // props.history.push('/student');
          handleOk();
          props.getPointList && props.getPointList();
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
          <Modal title="自提点信息" visible={props.isShow} footer={null} onOk={handleOk} onCancel={handleCancel}>
            <Spin tip="提交中，请稍后...." spinning={isLoading}>
              <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
              >
                <Form.Item
                  label="名称"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="编号"
                  name="pointId"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="线路" name='bind'
                    rules={[
                      {
                        required: true,
                        message: '请选择线路!',
                      },
                    ]}
                  >
                  <Select>
                  {createOptions()}
                  </Select>
                </Form.Item>
                <Form.Item label="省/市" name='cityArr'
                    rules={[
                      {
                        required: true,
                        message: '请选择省市!',
                      },
                    ]}
                  >
                  <Cascader allowClear options={props.cityResult} onChange={handleChange} placeholder="Please select" />
                </Form.Item>
                <Form.Item
                  label="详细地址"
                  name="detail"
                  rules={[
                    {
                      required: true,
                      message: '请填写正确的详细地址!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="邮编"
                  name="postCode"
                  rules={[
                    {
                      required: true,
                      message: '请填写正确的邮编!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="东线价格"
                  name="eFreight"
                  rules={[
                    {
                      required: true,
                      message: '请填写正确的东线价格!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="西线价格"
                  name="wFreight"
                  rules={[
                    {
                      required: true,
                      message: '请填写正确的西线价格!',
                    },
                  ]}
                >
                  <Input />
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
export default TransForm
