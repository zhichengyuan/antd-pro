import React from 'react'
// import StudentSearchBarContainers from '../../../components/containers/StudentSearchBarContainers'
// import StudentTableContainers from '../../../components/containers/StudentTable'
// import StudentPagerContainers from '../../../components/containers/StudentPager'
import OrderSearchBarContainers from '../../../components/containers/orderList/orderSearchBarContainers'
import OrderTableContainer from '../../../components/containers/orderList/OrderTableContainer'
import OrderPagerContainer from '../../../components/containers/orderList/OrderPagerContainer'


export default function orderlist() {
    return (
        <div>
            <OrderSearchBarContainers/>
            <OrderTableContainer></OrderTableContainer>
            <OrderPagerContainer></OrderPagerContainer>
            {/* <StudentSearchBarContainers></StudentSearchBarContainers>
            <StudentTableContainers></StudentTableContainers>
            <StudentPagerContainers></StudentPagerContainers> */}
            
        </div>
    )
}
