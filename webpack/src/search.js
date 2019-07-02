import React from 'react'
import ReactDom from 'react-dom'
import './search.scss'
import logo from './../logo.jpg'
class Search extends React.Component {
    render() {
        return <div>Search text <img src={ logo } alt=""/></div>
    }
}
ReactDom.render(<Search />,
    document.getElementById('root'))
