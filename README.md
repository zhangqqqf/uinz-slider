# simple react images slider component

`npm install uinz-slider`

```
import Slider from 'uinz-slider'

const demo = props => {
  const images = [
    'http://static.bootcss.com/www/assets/img/opencdn.png',
    'http://static.bootcss.com/www/assets/img/gulpjs.png',
    'http://static.bootcss.com/www/assets/img/flat-ui.png',
  ]
  return (
    <Slider images={images} auto={ture} autoTime={1000}/>
  )
}
```


| props    | 效果              |   default  |
|:--------:|:----------------:|:----------:|
| auto     | 自动轮播          | false     |
| autoTime | 自动轮播间隔       | 3000      |
| rate     | 势能比,越小越容易滑动| 0.5      |


[demo](http://uinz.github.io/uinz-slider/)

## TODO
 - 相关自定义参数