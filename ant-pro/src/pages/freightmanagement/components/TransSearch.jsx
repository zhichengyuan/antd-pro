import React,{useState} from 'react'
import { Row,Col ,Button,Cascader} from 'antd'

 function TransSearch(props) {
    const [cityCode, setCityCode] = useState(props.req.cityCode)
    const [provinceCode, setProvinceCode] = useState(props.req.provinceCode)
    let dValue = [];
    if(props.req.cityCode){
       
        dValue = [provinceCode,cityCode]
    }
    function handleChange(value) {
        
        if(value.length == 0) {
            setCityCode('');
            setProvinceCode('');
        }else {
            setCityCode(value[1]);
            setProvinceCode(value[0]);
        }
        // value = value || "";
        
    }
    return (
        <div style={{
            marginBottom:'10px'
        }}>
            <Row gutter={10} type="flex" justify="start">
                <Col>
                <Cascader defaultValue={dValue} allowClear options={props.options} onChange={handleChange} placeholder="Please select" />
                </Col>
                {/* <input type="text" value={this.state.key} onChange={e => {
                    this.setState({
                        key:e.target.value
                    })
                }}></input> */}
                
                <Button style={{marginRight:'5px'}} onClick={() => {
                    props.onSearch && props.onSearch({cityCode,provinceCode});
                }}>查询</Button>
                <Button type="primary" onClick={() => {
                    props.addPoint && props.addPoint(true)
                }}>新增</Button>
            </Row>
        </div>
    )
}

TransSearch.defaultProps = {
    options:[],
    req:{
        cityCode:'',
        provinceCode:'',
    }
}

// export default connect(mapStateToProps,mapDispatchToProps)(TransSearch)
export default TransSearch;
