import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Slider from './slider'

const images = [
  'http://static.bootcss.com/www/assets/img/opencdn.png',
  'http://static.bootcss.com/www/assets/img/gulpjs.png',
  'http://static.bootcss.com/www/assets/img/flat-ui.png',
]

ReactDOM.render(<Slider images={images} auto={true}/>, document.getElementById('app'))