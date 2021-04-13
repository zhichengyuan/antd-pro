import React from 'react'
import StaffSearch from './components/staffSearch'
import StaffTable from './components/StaffTable'
import StaffPage from './components/staffPage'
import StaffForm from './components/StaffForm'

export default function index() {
    return (
        <div>
           <StaffSearch/>
           <StaffTable/>
           <StaffPage/>
           <StaffForm/>
        </div>
    )
}
