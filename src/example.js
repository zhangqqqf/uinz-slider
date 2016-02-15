import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Slider from './slider'

const images = [
  'http://static.bootcss.com/www/assets/img/opencdn.png',
  'http://static.bootcss.com/www/assets/img/gulpjs.png',
  'http://static.bootcss.com/www/assets/img/flat-ui.png',
]

class Example extends Component {
  render() {
    return (
      <Slider images={images} auto={true}/>
    )
  }
}

ReactDOM.render(<Example/>, document.getElementById('app'))