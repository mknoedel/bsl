webpackHotUpdate("static/development/pages/tabs/[id].js",{

/***/ "./components/DiscreteSlider.tsx":
/*!***************************************!*\
  !*** ./components/DiscreteSlider.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DiscreteSlider; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_Slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Slider */ "./node_modules/@material-ui/core/esm/Slider/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
var _jsxFileName = "/Users/michaelknoedel/Documents/bsl-balance/components/DiscreteSlider.tsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





var useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])(function (theme) {
  return {
    root: {
      width: 300
    },
    margin: {
      height: theme.spacing(2)
    },
    marks: {
      fontSize: '8px'
    }
  };
});
var marks = [{
  value: 1,
  label: 'Never'
}, {
  value: 2,
  label: 'Not Much'
}, {
  value: 3,
  label: 'Neutral'
}, {
  value: 4,
  label: 'A Bit'
}, {
  value: 5,
  label: 'Always'
}];
var marksReverse = [{
  value: 5,
  label: 'Never'
}, {
  value: 4,
  label: 'Not Much'
}, {
  value: 3,
  label: 'Neutral'
}, {
  value: 2,
  label: 'A Bit'
}, {
  value: 1,
  label: 'Always'
}];
marks = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.forEach(marks, function (c) {
  return c.label = __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], {
    style: {
      fontSize: '9px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: this
  }, c.label);
});
marksReverse = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.forEach(marksReverse, function (c) {
  return c.label = __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__["Typography"], {
    style: {
      fontSize: '9px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: this
  }, c.label);
});

function valuetext(value) {
  var _$find;

  return ((_$find = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.find(marks, function (c) {
    return c.value === value;
  })) === null || _$find === void 0 ? void 0 : _$find.label) || '';
}

function DiscreteSlider(_ref) {
  var field = _ref.field,
      idx = _ref.idx,
      setValue = _ref.setValue,
      _onKeyPress = _ref.onKeyPress,
      valueDisplay = _ref.valueDisplay;
  var classes = useStyles();
  var name = field.name,
      value = field.value,
      flip = field.flip;
  value = value || 0;
  return __jsx("div", {
    className: classes.root,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  }, __jsx(_material_ui_core_Slider__WEBPACK_IMPORTED_MODULE_2__["default"], {
    getAriaValueText: valuetext,
    ThumbComponent: 'span',
    "aria-labelledby": "discrete-slider",
    valueLabelDisplay: valueDisplay ? "auto" : "off",
    id: name,
    ref: function ref(span) {
      if ((span === null || span === void 0 ? void 0 : span.children) && _onKeyPress) {
        span.children[span.children.length - 1].focus();
      }
    },
    value: value,
    step: 1,
    min: 1,
    max: 5,
    marks: flip ? marksReverse : marks,
    onChange: function onChange(_e, val) {
      return setValue(val, idx);
    },
    onKeyPress: function onKeyPress(e) {
      if (_onKeyPress) {
        _onKeyPress(e);
      }
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: this
  }), __jsx("div", {
    className: classes.margin,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111
    },
    __self: this
  }));
}

/***/ })

})
//# sourceMappingURL=[id].js.d9cb3d980c0274aff39c.hot-update.js.map