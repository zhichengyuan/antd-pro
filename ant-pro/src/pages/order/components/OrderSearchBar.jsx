import React,{useState} from 'react'
import { DatePicker, Space,Row,Col,Input ,Button } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
export default function OrderSearchBar(props) {
    // console.log(props);
    const [value, setValue] = useState(null);
    const [orderId, setOrderId] = useState(props.defaultValue.orderId);
    const [sTime, setSTime] = useState(props.defaultValue.sTime);
    const [eTime, setETime] = useState(props.defaultValue.eTime);
    function handleSearch () {
        let data = {};
        if(value) {
            data.sTime = sTime;
            data.eTime = eTime;
        }
            data.orderId = orderId
        // console.log(data);
        props.onSearch && props.onSearch(data)
    }
    return (
        <div style = {{
            marginBottom:'10px'
        }}>
            <Row gutter={10} type="flex" justify="start">
                <Col>
                    <Space direction="vertical" size={12}>
                        <RangePicker
                        value={value} 
                        format='YYYY-MM-DD'
                        onChange={(date) => {
                            console.log(date);
                            // moment(date[0])
                            if(date) {
                                setSTime(moment(date[0]).format('YYYY-MM-DD'));
                                setETime(moment(date[0]).format('YYYY-MM-DD'));
                                setValue(date)
                            }else{
                                setSTime('');
                                setETime('');
                                setValue(date)
                            }
                            
                        }}/>
                    </Space>
                </Col>
                <Col>
                        <Input addonBefore="运单号：" value={orderId} onChange={e => {
                            // console.log(e.target.value);
                            setOrderId(e.target.value)
                        }}/>
                </Col>
                <Button type="primary" onClick={handleSearch}>查询</Button>
            </Row>
            
        </div>
    )
}

OrderSearchBar.defaultProps = {
    defaultValue:{
        orderId:'',
        sTime:'',
        eTime:''
    }
    
}
