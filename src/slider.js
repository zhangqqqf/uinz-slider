/* 
 * @parmas images arrary
 * @parmas autoTime picNumber
 * @parmas auto bool
 */

// 没有使用 react 的事件系统, 直接获取 dom 元素 使用原生的事件系统

import React, { Component } from 'react'

export default class Slider extends Component {
    static defaultProps = {
        index: 0,
        auto: false,
        autoTime: 3000,
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
            margin: '10px 5px',
            transition: 'all .5s',
            WebkitTransition: 'all .5s',
        },
        scroller: {
            whiteSpace: 'nowrap',
            transition: 'transform .5s',
            WebkitTransition: 'transform .5s',
        },
        img: {
            width: '100%',
            display: 'inline-block',
        }
    }
    moveInfo = {
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
        const {
            refs: { container },
            props: { auto }
        } = this

        this.initData()

        window.addEventListener('resize', () => {
            this.initData()
            this.onMoveEnd()
        })

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

        auto && this.autoScroll()
    }
    initData = () => {
        const { container } = this.refs
        this.moveInfo.containerWidth = container.offsetWidth
        this.moveInfo.picNum = this.props.images.length

        // TODO 自定义
        this.moveInfo.maxX = -(this.moveInfo.containerWidth * (this.moveInfo.picNum - 1) + 20)
        this.moveInfo.minX = 20
    }
    onMoveStart = (x, y) => {
        const { container, scroller } = this.refs
        this.moveInfo.startX = x
        this.moveInfo.active = true
        this.moveInfo.startTime = Date.now()
        container.style.cursor = '-webkit-grabbing'
        scroller.style.transition = 'none'
        scroller.style.webkitTransition = 'none'
    }
    onMove = (x, y) => {
        const { container, scroller } = this.refs
        const { startX, endX, translateX, minX, maxX, active } = this.moveInfo
        if (!active) return
        this.moveInfo.diffX = startX - x
        let _translateX = endX - this.moveInfo.diffX
        _translateX = _translateX > minX ? minX : (_translateX < maxX ? maxX : _translateX)
        this.moveInfo.translateX = _translateX
        scroller.style.transform = `translate(${_translateX}px)`
        scroller.style.webkitTransform = `translate(${_translateX}px)`
    }
    onMoveEnd = (e) => {
        const { container, scroller } = this.refs
        container.style.cursor = '-webkit-grab'
        const { index } = this.state
        const { translateX, startTime, picNum, diffX, minX, maxX, containerWidth } = this.moveInfo
        this.moveInfo.active = false
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
        this.moveInfo.endX = -1 * _index * containerWidth
        this.setState({ index: _index })
        scroller.style.transition = 'transform .5s'
        scroller.style.webkitTransition = 'transform .5s'
        scroller.style.transform = `translateX(${this.moveInfo.endX}px)`
        scroller.style.webkitTransform = `translateX(${this.moveInfo.endX}px)`

        this.moveInfo.diffX = 0
    }
    autoScroll = () => {
        const {
            props: { autoTime },
            moveInfo: { containerWidth, picNum },
            refs: { scroller }
        } = this

        this.intervel = setTimeout(() => {
            let _index = this.state.index + 1
            _index = _index > picNum - 1 ? 0 : _index
            this.setState({ index: _index })
            this.moveInfo.endX = -1 * _index * containerWidth
            scroller.style.transform = `translateX(${this.moveInfo.endX}px)`
            scroller.style.webkitTransform = `translateX(${this.moveInfo.endX}px)`

            this.autoScroll()
        }, autoTime)
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
                    {
                        images.map((_, i) => {
                            const activeStyle = Object.assign({}, style.indicateDot, { background: 'rgba(255,255,255,.9)' })
                            return <span key={i} style={i === index ? activeStyle : style.indicateDot }></span>
                        })
                    }
                </div>
            </div>
        )
    }
}