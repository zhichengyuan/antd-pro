import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'umi'
import { Table,Typography,Button } from 'antd';
const { Text } = Typography;

function OrderTable(props) {
    console.log(props);
   
    const colums1 = [
        {
            title:'商品名称',
            dataIndex:'name',
            // render: status => status == 0 ? '男':'那',
        },
        {
            title:'产品图片',
            dataIndex:'pic',
            render: pic => <img style={{width:'60px',height:'60px'}} src={`https://www.shopvill.com/api/avatar/img?id=${pic}`} alt=""/>,
        },
        {
            title:'编号',
            dataIndex:'productSn',
            // render: status => status == 0 ? '男':'那',
        },
        {
            title:'数量',
            dataIndex:'productNumber',
            // render: status => status == 0 ? '男':'那',
        },
        {
            title:'价格',
            dataIndex:'skuprice',
            // render: status => status == 0 ? '男':'那',
        },
        {
            title:'sku编号',
            dataIndex:'skucode',
            // render: status => status == 0 ? '男':'那',
        },
        {
            title:'商铺名称',
            dataIndex:'sid',
            // render: status => status == 0 ? '男':'那',
        },
    ]
    
    const columns = [
        {
            title:'运单编号',   
            dataIndex:'orderId',
            render:orderId => (
                <Text mark>{orderId}</Text>
            )
        },
        {
            title:'收货人姓名',
            dataIndex:'myAddress',
            render(myAddress) {
                // console.log(myAddress);
                return myAddress.name
            }
        },
        {
            title:'收货人地址',
            dataIndex:'myAddress',
            render(myAddress) {
                // console.log(myAddress);
                return myAddress.address
            }
        },
        {
            title:'自提点地址',
            dataIndex:'myAddress',
            render(myAddress) {
                // console.log(myAddress);
                return myAddress.pointAdd
            }
        },
        {
            title:'联系电话',
            dataIndex:'myAddress',
            render(myAddress) {
                // console.log(myAddress);
                return myAddress.tel
            }
        },
        {
            title:'总金额',
            dataIndex:'totalPrice',
            // render: status => status == 0 ? '男':'那',
        },
       
    ]

    const expandable={
        expandedRowRender: record => {
            // console.log(record);
            return <Table 
                columns={colums1}
                // childrenColumnName='productList'
                rowKey='productId' 
                bordered
                dataSource={record.productList} 
                pagination={{ position: ['none','none'] }}
            /> 
        },
        rowExpandable: record => record.name !== 'Not Expandable',
      }
    
    return (
        <Table 
            columns={columns}
            expandable={expandable}
            // childrenColumnName='productList'
            rowKey='orderId' 
            dataSource={props.datas} 
            pagination={{ position: ['none','none'] }}
            loading={props.loading}
        />   
    )
}

OrderTable.propTypes = {
    datas:PropTypes.array
}
OrderTable.defaultProps = {
    datas:[]
}

export default withRouter(OrderTable)
