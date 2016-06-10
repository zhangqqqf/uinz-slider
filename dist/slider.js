'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @parmas images arrary
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @parmas autoTime picNumber
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @parmas auto bool
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Slider = function (_Component) {
    _inherits(Slider, _Component);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

        _this.style = {
            container: {
                position: 'relative',
                overflow: 'hidden',
                cursor: '-webkit-grab'
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
                whiteSpace: 'nowrap'
            },
            img: {
                width: '100%',
                display: 'inline-block'
            }
        };
        _this.positionInfo = {
            active: false,
            startX: 0,
            diffX: 0,
            translateX: 0,
            endX: 0,
            startTime: 0,
            endTime: 0,
            max: 0,
            min: 0
        };

        _this.onMoveStart = function (x, y) {
            var _this$refs = _this.refs;
            var container = _this$refs.container;
            var scroller = _this$refs.scroller;


            _this.positionInfo.startX = x;
            _this.positionInfo.active = true;
            _this.positionInfo.startTime = Date.now();

            container.style.cursor = '-webkit-grabbing';
            scroller.style.transition = 'none';
            scroller.style.webkitTransition = 'none';
        };

        _this.onMove = function (x, y) {
            var _this$refs2 = _this.refs;
            var container = _this$refs2.container;
            var scroller = _this$refs2.scroller;
            var _this$positionInfo = _this.positionInfo;
            var startX = _this$positionInfo.startX;
            var endX = _this$positionInfo.endX;
            var translateX = _this$positionInfo.translateX;
            var minX = _this$positionInfo.minX;
            var maxX = _this$positionInfo.maxX;
            var active = _this$positionInfo.active;


            if (!active) return;

            _this.positionInfo.diffX = startX - x;

            var _translateX = endX - _this.positionInfo.diffX;
            _translateX = _translateX > minX ? minX : _translateX < maxX ? maxX : _translateX;

            _this.positionInfo.translateX = _translateX;
            scroller.style.transform = 'translate(' + _translateX + 'px)';
            scroller.style.webkitTransform = 'translate(' + _translateX + 'px)';
        };

        _this.onMoveEnd = function (e) {
            var _this$refs3 = _this.refs;
            var container = _this$refs3.container;
            var scroller = _this$refs3.scroller;

            container.style.cursor = '-webkit-grab';

            var index = _this.state.index;
            var _this$positionInfo2 = _this.positionInfo;
            var translateX = _this$positionInfo2.translateX;
            var startTime = _this$positionInfo2.startTime;
            var picNum = _this$positionInfo2.picNum;
            var diffX = _this$positionInfo2.diffX;
            var minX = _this$positionInfo2.minX;
            var maxX = _this$positionInfo2.maxX;
            var containerWidth = _this$positionInfo2.containerWidth;


            _this.positionInfo.active = false;

            var diffTime = Date.now() - startTime;
            var rate = Math.abs(diffX / diffTime);

            var _index = void 0;

            if (rate > 0.5 && translateX < minX && translateX > maxX) {
                if (diffX > 0) {
                    if (index != picNum - 1) {
                        _index = index + 1;
                    }
                } else {
                    if (index !== 0) {
                        _index = index - 1;
                    }
                }
            } else {
                _index = Number(Math.abs(translateX / containerWidth).toFixed(0));
            }

            _this.positionInfo.endX = -1 * _index * containerWidth;

            _this.setState({ index: _index });

            // gotoIndex
            scroller.style.transition = 'transform .5s';
            scroller.style.transform = 'translateX(' + _this.positionInfo.endX + 'px)';

            _this.positionInfo.diffX = 0;
        };

        _this.state = { index: 0 };
        return _this;
    }

    _createClass(Slider, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _refs = this.refs;
            var container = _refs.container;
            var scroller = _refs.scroller;

            this.positionInfo.containerWidth = container.offsetWidth;
            this.positionInfo.picNum = this.props.images.length;
            // 可能需要自定义
            this.positionInfo.maxX = -(this.positionInfo.containerWidth * (this.positionInfo.picNum - 1) + 20);
            this.positionInfo.minX = 20;

            // touch
            container.addEventListener('touchstart', function (e) {
                var _e$touches$ = e.touches[0];
                var x = _e$touches$.pageX;
                var y = _e$touches$.pageY;

                _this2.onMoveStart(x, y);
            });
            container.addEventListener('touchmove', function (e) {
                var _e$touches$2 = e.touches[0];
                var x = _e$touches$2.pageX;
                var y = _e$touches$2.pageY;

                _this2.onMove(x, y);
            });
            container.addEventListener('touchend', this.onMoveEnd);

            // mouse
            container.addEventListener('mousedown', function (e) {
                e.preventDefault();
                _this2.onMoveStart(e.pageX, e.pageY);
            });
            container.addEventListener('mousemove', function (e) {
                e.preventDefault();
                _this2.onMove(e.pageX, e.pageY);
            });
            container.addEventListener('mouseleave', function (e) {
                _this2.onMoveEnd(e.pageX, e.pageY);
            });
            container.addEventListener('mouseup', function (e) {
                _this2.onMoveEnd(e.pageX, e.pageY);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var index = this.state.index;
            var images = this.props.images;
            var style = this.style;


            return _react2.default.createElement(
                'div',
                { style: style.container, ref: 'container' },
                _react2.default.createElement(
                    'div',
                    { style: style.scroller, ref: 'scroller' },
                    images.map(function (src, i) {
                        return _react2.default.createElement('img', { key: i, style: style.img, src: src });
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { style: style.indicateBox },
                    images.map(function (_, i) {
                        var activeStyle = Object.assign({}, style.indicateDot, { background: 'rgba(255,255,255,.9)' });
                        return _react2.default.createElement('span', { key: i, style: i === index ? activeStyle : style.indicateDot });
                    })
                )
            );
        }
    }]);

    return Slider;
}(_react.Component);

// 并不打算使用 react 的事件系统, 直接获取 dom 元素 使用原生的事件系统
// onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
// onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
// onMouseMove onMouseOut onMouseOver onMouseUp


Slider.defaultProps = {
    index: 0,
    auto: false,
    images: []
};
exports.default = Slider;