
import React from 'react'
import PropTypes from 'prop-types'
import { Table,Button } from 'antd';

function TransTable(props) {
    // console.log(props);
    
    const columns = [
        {
            title:'名称',
            dataIndex:'name',
            // render:name => (
            //     <Text mark>{name}</Text>
            // )
        },
        {
            title:'编号',
            dataIndex:'pointId',
        },
        {
            title:'省',
            dataIndex:'province',
           

        },
        {
            title:'市',
            dataIndex:'city'
        },
        {
            title:'详细地址',
            dataIndex:'detail'
        },
        {
            title:'西线价格',
            dataIndex:'wFreight'
        },
        {
            title:'东线价格',
            dataIndex:'eFreight'
        },
        {
            title:'邮编',
            dataIndex:'postCode'
        },
        {
            title:'详情',
            dataIndex:'nickname',
            render(nickname,record) {
                // console.log(record);
                return <Button onClick={() => {
                    // props.history.push(`/student/${sNo}`)
                    // console.log(record);
                    props.onChange && props.onChange(record)
                }}>详情</Button>
            }
        }
    ]
    
    return (
        <Table 
            columns={columns} 
            rowKey='_id' 
            dataSource={props.transList} 
            pagination={{ position: ['none','none'] }}
            loading={props.loading}
        />   
    )
}

TransTable.propTypes = {
    transList:PropTypes.array
}
TransTable.defaultProps = {
    transList:[]
}

export default TransTable

