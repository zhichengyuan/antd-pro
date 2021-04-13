import React,{useState} from 'react'
import { Row,Col,Select ,Button} from 'antd'
import {connect} from 'dva'
const { Option } = Select;

 function StaffSearch(props) {
    function handleChange(value) {
        console.log(`selected ${value}`);
        value = value || "";
        props.onSearch && props.onSearch({status:value});
    }
    return (
        <div style={{
            marginBottom:'10px'
        }}>
            <Row gutter={10} type="flex" justify="start">
                <Col>
                <Select defaultValue={props.status} allowClear placeholder="用户状态" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="active">激活</Option>
                    <Option value="disactive">禁用</Option>
                </Select>
                </Col>
                {/* <input type="text" value={this.state.key} onChange={e => {
                    this.setState({
                        key:e.target.value
                    })
                }}></input> */}
                
                <Button type="primary" onClick={() => {
                    props.addStaff && props.addStaff(true)
                }}>新增</Button>
            </Row>
        </div>
    )
}

StaffSearch.defaultProps = {
    // status:''
}

const mapStateToProps = state => ({
    status:state.staff.req.status
})
const mapDispatchToProps = dispatch => ({
    onSearch(newCondition){
        console.log(newCondition);
        // //重新设置条件
        dispatch({
            type:'staff/changeCondition',
            payload:{
                ...newCondition,
                page:1
            }
        })
        // 重新查询
        dispatch({
            type:'staff/fetchUserList',
        })
    },
    addStaff(isShow){
        // console.log(newObj)
        //重新设置条件
        dispatch({
            type:'staff/setChangeIsShow',
            payload:isShow
        })
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(StaffSearch)
