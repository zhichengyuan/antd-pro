import React, { Component } from 'react'
import { Row,Col,Input,Radio ,Button} from 'antd'
import { connect } from 'umi';
const { Search } = Input;
class StudentSearchBar extends Component {
    
    constructor(props) {
        super(props);
        const def = {
            key:"",
            sex:-1
        };
        this.state = Object.assign({},def,this.props.defaultValue)
    }
    handleRadioChange = e => {
        this.setState({
            sex:+e.target.value
        })
    }
    handleSearch = () => {
        //抛出事件
        if(this.props.onSearch) {
            console.log(this.state)
            this.props.onSearch(this.state);
        }
    }
    render() {
        console.log(this.props)
        // return (
        //     <div>
        //         测试
        //     </div>
        // )
        return (
            <div style={{
                marginBottom:'10px'
            }}>
                <Row gutter={10} type="flex" justify="start">
                
                    <Col>
                        <Search onSearch={this.handleSearch} addonBefore="关键字：" value={this.state.key} onChange={e => {
                            this.setState({
                                key:e.target.value
                            })
                        }}/>
                    </Col>
                    <Col>
                    <Radio.Group onChange={this.handleRadioChange} value={this.state.sex}>
                        <Radio.Button value={-1}>不限</Radio.Button>
                        <Radio.Button value={0}>男</Radio.Button>
                        <Radio.Button value={1}>女</Radio.Button>
                    </Radio.Group>
                    </Col>
                    {/* <input type="text" value={this.state.key} onChange={e => {
                        this.setState({
                            key:e.target.value
                        })
                    }}></input> */}
                    
                    <Button type="primary" onClick={this.handleSearch}>查询</Button>
                </Row>
            </div>
            
        )
    }
}

export default connect(({ student, loading }) => {
    console.log('student',student)
    return {
        defaultValue: student.condition,
    //   submitting: loading.effects['login/login'],
    }
  })(StudentSearchBar);
