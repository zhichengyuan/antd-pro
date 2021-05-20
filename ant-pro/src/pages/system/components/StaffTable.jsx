import React from 'react'
import PropTypes from 'prop-types'
// import { withRouter } from 'umi'
import {connect} from 'dva'
import { Table,Typography,Button } from 'antd';
const { Text } = Typography;

function StaffTable(props) {
    // console.log(props);
    const contentText = (roles) => {
        // console.log(roles);
        switch (roles) {
            case roles.indexOf('admin') != -1:
                return '管理员';
            case roles.indexOf('CKY') != -1:
                return '仓库一';
            case roles.indexOf('ZZC') != -1:
                return '中转仓库';
            case roles.indexOf('QG') != -1:
                return '仓库清关';
            case roles.indexOf('XLFP') != -1:
                return '线路分配';
            case roles.indexOf('ZT') != -1:
                return '自提点';
            case roles.indexOf('t') != -1:
                return '物流管理员';
            default:
                return '员工'
        }
    }
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
            dataIndex:'roles',
            render:roles => (
                <Text mark>{contentText(roles)}</Text>
            )

        },
        {
            title:'是否启用',
            dataIndex:'address'
        },
        {
            title:'操作',
            dataIndex:'address'
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
const mapDispatchToProps = dispatch => ({
    onChange(item){
        // console.log(item);
        let payload = {
            isShow:true,
            editObj:item
        }
        //重新设置条件
        dispatch({
            type:'staff/setChangeIsShow',
            payload:payload
        })
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(StaffTable)
// export default withRouter()
