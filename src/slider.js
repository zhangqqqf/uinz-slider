/* 
 * @parmas images arrary
 * @parmas autoTime picNumber
 * @parmas auto bool
 */

import React, { Component } from 'react'

export default class Slider extends Component {
    static defaultProps = {
        index: 0,
        auto: false,
        images: [],
    }
    style = {
        container: {
            position: 'relative',
            overflow: 'hidden',
            cursor: '-webkit-grab',
        },
        indicateBox: {
            position: 'absolute',
            width: '100%',
            bottom: '0',
            textAlign: 'center'
        },
        indicateDot: {
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,.5)',
            margin: '10px 5px'
        },
        scroller: {
            whiteSpace: 'nowrap',
        },
        img: {
            width: '100%',
            display: 'inline-block',
        }
    }
    positionInfo = {
        active: false,
        startX: 0,
        diffX: 0,
        translateX: 0,
        endX: 0,
        startTime: 0,
        endTime: 0,
        max: 0,
        min: 0,
    }

    constructor(props) {
        super(props)
        this.state = { index: 0 }
    }

    componentDidMount() {
        const { container, scroller } = this.refs
        this.positionInfo.containerWidth = container.offsetWidth
        this.positionInfo.picNum = this.props.images.length
        // 可能需要自定义
        this.positionInfo.maxX = -(this.positionInfo.containerWidth * (this.positionInfo.picNum - 1) + 20)
        this.positionInfo.minX = 20

        // touch
        container.addEventListener('touchstart', e => {
            const { pageX: x, pageY: y } = e.touches[0]
            this.onMoveStart(x, y)
        })
        container.addEventListener('touchmove', e => {
            const { pageX: x, pageY: y } = e.touches[0]
            this.onMove(x, y)
        })
        container.addEventListener('touchend', this.onMoveEnd)

        // mouse
        container.addEventListener('mousedown', e => {
            e.preventDefault()
            this.onMoveStart(e.pageX, e.pageY)
        })
        container.addEventListener('mousemove', e => {
            e.preventDefault()
            this.onMove(e.pageX, e.pageY)
        })
        container.addEventListener('mouseleave', e => {
            this.onMoveEnd(e.pageX, e.pageY)
        })
        container.addEventListener('mouseup', e => {
            this.onMoveEnd(e.pageX, e.pageY)
        })
    }

    onMoveStart = (x, y) => {
        const { container, scroller } = this.refs

        this.positionInfo.startX = x
        this.positionInfo.active = true
        this.positionInfo.startTime = Date.now()

        container.style.cursor = '-webkit-grabbing'
        scroller.style.transition = 'none'
        scroller.style.webkitTransition = 'none'
    }

    onMove = (x, y) => {
        const { container, scroller } = this.refs
        const { startX, endX, translateX, minX, maxX, active } = this.positionInfo

        if (!active) return

        this.positionInfo.diffX = startX - x

        let _translateX = endX - this.positionInfo.diffX
        _translateX = _translateX > minX ? minX : (_translateX < maxX ? maxX : _translateX)

        this.positionInfo.translateX = _translateX
        scroller.style.transform = `translate(${_translateX}px)`
        scroller.style.webkitTransform = `translate(${_translateX}px)`
    }

    onMoveEnd = (e) => {
        const { container, scroller } = this.refs
        container.style.cursor = '-webkit-grab'

        const { index } = this.state
        const { translateX, startTime, picNum, diffX, minX, maxX, containerWidth } = this.positionInfo

        this.positionInfo.active = false

        const diffTime = Date.now() - startTime
        const rate = Math.abs(diffX / diffTime)

        let _index

        if (rate > 0.5 && translateX < minX && translateX > maxX) {
            if (diffX > 0) {
                if (index != picNum - 1) {
                    _index = index + 1
                }
            } else {
                if (index !== 0) {
                    _index = index - 1
                }
            }
        } else {
            _index = Number(Math.abs(translateX / containerWidth).toFixed(0))
        }

        this.positionInfo.endX = -1 * _index * containerWidth

        this.setState({ index: _index })

        // gotoIndex
        scroller.style.transition = 'transform .5s'
        scroller.style.transform = `translateX(${this.positionInfo.endX}px)`

        this.positionInfo.diffX = 0
    }

    render() {
        const {
            state: { index },
            props: { images },
            style
        } = this

        return (
            <div style={style.container} ref="container">
                <div style={style.scroller} ref="scroller">
                    {
                        images.map((src, i) =>
                            <img key={i} style={style.img} src={src} />
                        )
                    }
                </div>
                <div style={style.indicateBox}>
                    {images.map((_, i) => {
                        const activeStyle = Object.assign({}, style.indicateDot, { background: 'rgba(255,255,255,.9)' })
                        return <span key={i} style={i === index ? activeStyle : style.indicateDot }></span>
                    })}
                </div>
            </div>
        )
    }
}

// 并不打算使用 react 的事件系统, 直接获取 dom 元素 使用原生的事件系统
// onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
// onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
// onMouseMove onMouseOut onMouseOver onMouseUp

