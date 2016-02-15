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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wrapperStyle = {
  overflow: 'hidden',
  position: 'relative'
};

var navStyle = {
  position: 'absolute',
  bottom: '5%',
  textAlign: 'center',
  zIndex: '3',
  width: '100%'
};

var navDotStyle = {
  display: 'inline-block',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, .5)',
  margin: '3px',
  transition: 'all .5s',
  WebkitTransition: 'all .5s'
};

var rowStyle = {
  fontSize: 0,
  letterSpacing: '-3px',
  whiteSpace: 'nowrap',
  willChange: 'transform'
};

var imgStyle = {
  display: 'inline-block',
  width: '100%'
};

var EDGE_WIDTH = 50;

/* 
  @parmas images arrary
  @parmas autoTime number
  @parmas auto bool
*/

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

    _this.state = { index: 0 };
    _this.index = 0;
    _this.preTranslateX = 0;
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props;
      var auto = _props.auto;
      var images = _props.images;
      var autoTime = this.props.autoTime;


      autoTime = autoTime ? autoTime : 3000;

      console.log(auto);

      if (auto) {
        this.interval = setInterval(function () {
          var index = _this2.state.index + 2 > images.length ? 0 : _this2.state.index + 1;
          _this2.setState({ index: index });
          _this2.index = -index;

          _this2.preTranslateX = _this2.index * _this2.refs.container.offsetWidth;
          _this2.refs.row.style.transition = 'all .5s';
          _this2.refs.row.style.webkitTransition = 'all .5s';

          _this2.refs.row.style.transform = 'translateX(' + _this2.preTranslateX + 'px)';
          _this2.refs.row.style.webkitTransform = 'translateX(' + _this2.preTranslateX + 'px)';

          console.log(_this2.preTranslateX);
        }, autoTime);
      }
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(e) {
      e.preventDefault();
      this.containerWidth = this.refs.container.offsetWidth;
      this.rowWidth = (this.props.images.length - 1) * this.containerWidth;
      this.refs.row.style.transition = '';
      this.refs.row.style.webkitTransition = '';
      this.startX = e.touches[0].pageX;
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove(e) {
      var leftEdge = EDGE_WIDTH;
      var rightEdge = -(this.rowWidth + EDGE_WIDTH);
      var diffX = e.touches[0].pageX - this.startX;

      this.translateX = this.preTranslateX + diffX;
      this.translateX = this.translateX > leftEdge ? EDGE_WIDTH : this.translateX;
      this.translateX = this.translateX < rightEdge ? rightEdge : this.translateX;

      this.refs.row.style.transform = 'translateX(' + this.translateX + 'px)';
      this.refs.row.style.webkitTransform = 'translateX(' + this.translateX + 'px)';
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd() {
      this.index = (this.translateX / this.containerWidth).toFixed(0);
      this.setState({ index: Math.abs(this.index) });

      this.preTranslateX = this.index * this.containerWidth;

      this.refs.row.style.transition = 'all .5s';
      this.refs.row.style.webkitTransition = 'all .5s';

      this.refs.row.style.transform = 'translateX(' + this.preTranslateX + 'px)';
      this.refs.row.style.webkitTransform = 'translateX(' + this.preTranslateX + 'px)';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var images = this.props.images;


      return _react2.default.createElement(
        'div',
        {
          className: 'slider-wrapper',
          style: wrapperStyle,
          ref: 'container',
          onTouchStart: this.onTouchStart.bind(this),
          onTouchMove: this.onTouchMove.bind(this),
          onTouchEnd: this.onTouchEnd.bind(this)
        },
        _react2.default.createElement(
          'div',
          { style: navStyle },
          images.map(function (_, index) {
            return _react2.default.createElement('span', { key: 'uinz-' + index, style: index == _this3.state.index ? Object.assign({}, navDotStyle, { backgroundColor: '#FFF' }) : navDotStyle });
          })
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'slider-row',
            ref: 'row',
            style: rowStyle },
          images.map(function (url, index) {
            return _react2.default.createElement('img', { key: 'slider-image-' + index, src: url, style: imgStyle });
          })
        )
      );
    }
  }]);

  return Slider;
}(_react.Component);

exports.default = Slider;


Slider.defaultProps = {
  images: []
};

// onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
// onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
// onMouseMove onMouseOut onMouseOver onMouseUp