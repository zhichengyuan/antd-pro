import React from 'react'
import TransSearchContainers from './containers/TransSearchContainers'
import TransTableContainers from './containers/TransTableContainers'
import TransPageContainer from './containers/TransPageContainer'
import TransFormContain from './containers/TransFormContain'

export default function index() {
    return (
        <div>
            <TransSearchContainers/>
            <TransTableContainers/>
            <TransPageContainer/>
            <TransFormContain/>
        </div>
    )
}
