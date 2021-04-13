import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'umi'
import { Table,Typography,Button } from 'antd';
const { Text } = Typography;

function StudentTable(props) {
    console.log(props);
    const columns = [
        {
            title:'姓名',
            dataIndex:'name',
            render:name => (
                <Text mark>{name}</Text>
            )
        },
        {
            title:'出生日期',
            dataIndex:'birth'
        },
        {
            title:'性别',
            dataIndex:'sex',
            render: sex => sex === 0 ? '男':'女',
        },
        {
            title:'住址',
            dataIndex:'address'
        },
        {
            title:'详情',
            dataIndex:'sNo',
            render(sNo) {
                return <Button type='link' onClick={() => {
                    props.history.push(`/student/${sNo}`)
                }}>详情</Button>
            }
        }
    ]
    
    return (
        <Table 
            columns={columns} 
            rowKey='id' 
            dataSource={props.stus} 
            pagination={{ position: ['none','none'] }}
            loading={props.loading}
        />   
    )
}

StudentTable.propTypes = {
    stus:PropTypes.array
}
StudentTable.defaultProps = {
    stus:[]
}

export default withRouter(StudentTable)
