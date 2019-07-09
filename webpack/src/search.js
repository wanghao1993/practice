import React from 'react'
import ReactDom from 'react-dom'
import './search.scss'
import logo from './../logo.jpg'
class Search extends React.Component {
    render() {
        return <div>Search tsswwws222ext <img src={ logo } alt=""/></div>
    }
}
console.log(111)
ReactDom.render(<Search />,
    document.getElementById('root'))
