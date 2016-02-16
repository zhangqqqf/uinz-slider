import React, {Component} from 'react'

const containerStyle = {
  overflow: 'hidden',
  position: 'relative',
}

const navStyle = {
  position: 'absolute',
  bottom: '10%',
  textAlign: 'center',
  zIndex: '3',
  width: '100%',
}

const navDotStyle = {
  display: 'inline-block',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, .5)',
  margin: '3px',
  transition: 'all .5s',
  WebkitTransition: 'all .5s',
}

const rowStyle = {
  fontSize: 0,
  letterSpacing: '-3px',
  whiteSpace: 'nowrap',
  willChange: 'transform',
}

const imgStyle = {
  display: 'inline-block',
  width: '100%',
}


/* 
  @parmas images arrary
  @parmas autoTime number
  @parmas auto bool
*/

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {index: 0}
    this.index = 0
    this.preTranslateX = 0
  }

  componentDidMount() {
    const {auto, autoTime} = this.props

    if (auto) {
      this.interval = setInterval(() => {
        const {images} = this.props

        const index = this.state.index + 2 > images.length ? 0 : this.state.index + 1
        this.setState({index})
        this.index = -index

        this.preTranslateX = this.index * this.refs.container.offsetWidth
        this.refs.row.style.transition = 'all .5s'
        this.refs.row.style.webkitTransition = 'all .5s'

        this.refs.row.style.transform = `translateX(${this.preTranslateX}px)`
        this.refs.row.style.webkitTransform = `translateX(${this.preTranslateX}px)`

      }, autoTime)
    }
  }

  componentWillUnMount() {
    clearInterval(this.interval)
  }

  onTouchStart(e) {
    e.preventDefault()
    clearInterval(this.interval)

    this.containerWidth = this.refs.container.offsetWidth
    this.rowWidth = (this.props.images.length - 1) * this.containerWidth
    this.refs.row.style.transition = ''
    this.refs.row.style.webkitTransition = ''
    this.startX = e.touches[0].pageX
  }

  onTouchMove(e) {
    const {edgeWidth} = this.props
    const leftEdge = edgeWidth
    const rightEdge = -(this.rowWidth + edgeWidth)
    const diffX = e.touches[0].pageX - this.startX

    this.translateX = this.preTranslateX + diffX
    this.translateX = this.translateX > leftEdge ? edgeWidth : this.translateX
    this.translateX = this.translateX < rightEdge ? rightEdge : this.translateX

    this.refs.row.style.transform = `translateX(${this.translateX}px)`
    this.refs.row.style.webkitTransform = `translateX(${this.translateX}px)`
  }

  onTouchEnd() {
    this.index = (this.translateX / this.containerWidth).toFixed(0)
    this.setState({index: Math.abs(this.index)})

    this.preTranslateX = this.index * this.containerWidth

    this.refs.row.style.transition = 'all .5s'
    this.refs.row.style.webkitTransition = 'all .5s'

    this.refs.row.style.transform = `translateX(${this.preTranslateX}px)`
    this.refs.row.style.webkitTransform = `translateX(${this.preTranslateX}px)`

    this.componentDidMount()
  }

  render() {
    const {images} = this.props

    return (
      <div
        className="slider-container"
        style={containerStyle}
        ref="container"
        onTouchStart={this.onTouchStart.bind(this)}
        onTouchMove={this.onTouchMove.bind(this)}
        onTouchEnd={this.onTouchEnd.bind(this)}
      >
        <div style={navStyle}>
          {images.map((_, index) =>
            <span key={`uinz-${index}`} style={index == this.state.index ? Object.assign({}, navDotStyle, {backgroundColor: '#FFF'}) : navDotStyle}/>
          )}
        </div>
        <div
          className="slider-row"
          ref="row"
          style={rowStyle}>
          {images.map((url, index) =>
            <img key={`slider-image-${index}`} src={url} style={imgStyle}/>
          )}
        </div>
      </div>
    )
  }
}

Slider.defaultProps = {
  images: [],
  auto: false,
  autoTime: 3000,
  edgeWidth: 50,
}

// onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
// onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
// onMouseMove onMouseOut onMouseOver onMouseUp