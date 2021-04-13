import React from 'react'
import PropTypes from 'prop-types'
// import { withRouter } from 'umi'
import {connect} from 'dva'
import { Table,Typography,Button } from 'antd';
const { Text } = Typography;

function StaffTable(props) {
    console.log(props);
    const columns = [
        {
            title:'昵称',
            dataIndex:'nickname',
            // render:name => (
            //     <Text mark>{name}</Text>
            // )
        },
        {
            title:'密码',
            dataIndex:'password'
        },
        {
            title:'电话',
            dataIndex:'tel',
        },
        {
            title:'角色',
            dataIndex:'address'
        },
        {
            title:'是否启用',
            dataIndex:'address'
        },
        {
            title:'操作',
            dataIndex:'address'
        },
        // {
        //     title:'详情',
        //     dataIndex:'sNo',
        //     render(sNo) {
        //         return <Button type='link' onClick={() => {
        //             props.history.push(`/student/${sNo}`)
        //         }}>详情</Button>
        //     }
        // }
    ]
    
    return (
        <Table 
            columns={columns} 
            rowKey='_id' 
            dataSource={props.staffs} 
            pagination={{ position: ['none','none'] }}
            loading={props.loading}
        />   
    )
}

StaffTable.propTypes = {
    staffs:PropTypes.array
}
StaffTable.defaultProps = {
    staffs:[]
}

const mapStateToProps = state => ({
    staffs:state.staff.result.datas,
    loading:state.loading.effects['staff/fetchUserList']
})
export default connect(mapStateToProps)(StaffTable)
// export default withRouter()
