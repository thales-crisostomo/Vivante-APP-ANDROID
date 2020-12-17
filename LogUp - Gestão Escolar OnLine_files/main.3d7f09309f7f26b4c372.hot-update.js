webpackHotUpdate("main",{

/***/ "./src/app/main/gestao/quadrohorario/QuadroHorarioForm.js":
/*!****************************************************************!*\
  !*** ./src/app/main/gestao/quadrohorario/QuadroHorarioForm.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QuadroHorarioForm; });
/* harmony import */ var _Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_colors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/colors */ "./node_modules/@material-ui/core/esm/colors/index.js");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/index.js");
/* harmony import */ var _fuse__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @fuse */ "./src/@fuse/index.js");
/* harmony import */ var app_store_actions_fuse__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/store/actions/fuse */ "./src/app/store/actions/fuse/index.js");
/* harmony import */ var _fuse_hooks__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @fuse/hooks */ "./src/@fuse/hooks/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _lodash__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @lodash */ "./src/@lodash/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_actions__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../store/actions */ "./src/app/main/gestao/store/actions/index.js");
/* harmony import */ var _Dados__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Dados */ "./src/app/main/gestao/quadrohorario/Dados.js");
/* harmony import */ var react_input_mask__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react-input-mask */ "./node_modules/react-input-mask/index.js");
/* harmony import */ var react_input_mask__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(react_input_mask__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _material_ui_core_Table__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @material-ui/core/Table */ "./node_modules/@material-ui/core/esm/Table/index.js");
/* harmony import */ var _material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @material-ui/core/TableBody */ "./node_modules/@material-ui/core/esm/TableBody/index.js");
/* harmony import */ var _material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @material-ui/core/TableCell */ "./node_modules/@material-ui/core/esm/TableCell/index.js");
/* harmony import */ var _material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @material-ui/core/TableHead */ "./node_modules/@material-ui/core/esm/TableHead/index.js");
/* harmony import */ var _material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @material-ui/core/TableRow */ "./node_modules/@material-ui/core/esm/TableRow/index.js");
/* harmony import */ var _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @material-ui/lab/Alert */ "./node_modules/@material-ui/lab/esm/Alert/index.js");
/* harmony import */ var _material_ui_core_LinearProgress__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @material-ui/core/LinearProgress */ "./node_modules/@material-ui/core/esm/LinearProgress/index.js");
/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @material-ui/core/InputLabel */ "./node_modules/@material-ui/core/esm/InputLabel/index.js");
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "./node_modules/@material-ui/core/esm/MenuItem/index.js");
/* harmony import */ var _material_ui_core_FormHelperText__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @material-ui/core/FormHelperText */ "./node_modules/@material-ui/core/esm/FormHelperText/index.js");
/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @material-ui/core/FormControl */ "./node_modules/@material-ui/core/esm/FormControl/index.js");
/* harmony import */ var _material_ui_core_Select__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @material-ui/core/Select */ "./node_modules/@material-ui/core/esm/Select/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_34__);








var _jsxFileName = "/Users/thalescrisostomo/Projeto_David/logup/src/app/main/gestao/quadrohorario/QuadroHorarioForm.js";



























var LinhasReturn = 0;

var QuadroHorarioForm = /*#__PURE__*/function (_PureComponent) {
  Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(QuadroHorarioForm, _PureComponent);

  function QuadroHorarioForm() {
    var _getPrototypeOf2, _this$state;

    var _this;

    Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, QuadroHorarioForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, (_getPrototypeOf2 = Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(QuadroHorarioForm)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = (_this$state = {
      horarios: [{
        inicio: "",
        termino: ""
      }],
      professores: [],
      disciplinas: [{
        iddisciplina: 1,
        nmdisciplina: ''
      }, {
        iddisciplina: 2,
        nmdisciplina: ''
      }, {
        iddisciplina: 3,
        nmdisciplina: ''
      }],
      inicio: '',
      ano: '',
      turma: '',
      tipoensino: '',
      serie: ''
    }, Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, "professores", []), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, "liberadoHorarios", false), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'inicio0', ''), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'termino0', ''), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'disciplina-segunda0', 0), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'professor-segunda0', 0), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'disciplina-terca0', 0), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'professor-terca0', 0), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'disciplina-quarta0', 0), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'professor-quarta0', 0), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'disciplina-quinta0', 0), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'professor-quinta0', 0), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'disciplina-sexta0', 0), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, 'professor-sexta0', 0), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, "terminouHorario", false), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, "sucesso", 'none'), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, "error", 'none'), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, "novo", true), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, "loadingSave", 'none'), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, "conteudo", 'none'), Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$state, "loading", 'flex'), _this$state);

    _this.DadosTurma = function () {
      if (_this.props.match.params.id !== undefined) {
        var self = Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this);

        axios__WEBPACK_IMPORTED_MODULE_34___default.a.get("http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-turma.php?acao=buscar&idturma=" + _this.props.match.params.id).then(function (_ref) {
          var data = _ref.data;
          console.log(data);
          self.setState({
            ano: data.buscar.nmano,
            turma: data.buscar.nmturma,
            tipoensino: data.buscar.nmtipoensino,
            serie: data.buscar.nmserie
          });
        });
      }
    };

    _this.Horarios = function () {
      if (_this.props.match.params.id !== undefined) {
        var self = Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this);

        var data;
        var total;
        axios__WEBPACK_IMPORTED_MODULE_34___default.a.get('http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-quadrohorario.php?acao=horarios&idturma=' + _this.props.match.params.id).then(function (_ref2) {
          var data = _ref2.data;
          total = data.horarios.length;
          self.setState({
            horariosHo: data
          });

          if (total > 0) {
            self.ColocaItens();
          } else {
            self.setState({
              liberadoHorarios: true,
              conteudo: 'block',
              loading: 'none'
            });
          }
        });
      } else {
        _this.setState({
          novo: false,
          liberadoHorarios: true,
          loading: 'none',
          conteudo: 'block'
        });
      }
    };

    _this.ColocaItens = function () {
      var data = _this.state.horariosHo;
      var total = data.horarios.length;
      var inicio = data.horarios[0].hrinicio;
      data.horarios.sort(function (a, b) {
        return a.idsemana > b.idsemana ? 1 : -1;
      });

      for (var i = 0; i < total - 1; i++) {
        if (data.horarios[i].idsemana == 5) {
          LinhasReturn = LinhasReturn + 1;
        }
      }

      if (total == 5) {
        LinhasReturn = LinhasReturn + 1;
      }

      for (var i = 0; i < LinhasReturn; i++) {
        _this.addClick();
      }

      data.horarios.sort(function (a, b) {
        return a.idsemana > b.idsemana ? 1 : -1;
      });

      if (total > 5) {
        data.horarios.sort(function (a, b) {
          return a.hrinicio > b.hrinicio ? 1 : -1;
        });
      }

      console.log(data);
      var linhasData = 0;
      var linhasData = 4; //+ 5 / -1 

      var timer60 = setInterval(function () {
        for (var j = 0; j <= LinhasReturn; j++) {
          for (var i = 0; i < total; i++) {
            if (data.horarios[i].idsemana == 5) {
              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'inicio' + j, data.horarios[linhasData - 1].hrinicio));

              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'termino' + j, data.horarios[linhasData - 1].hrfim));
            }

            if (data.horarios[i].idsemana == 1) {
              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-segunda' + j, data.horarios[j].iddisciplina));

              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-segunda' + j, data.horarios[j].idprofessor));
            }
          }

          linhasData = linhasData + 4;
        }

        var totalPreenchimento = LinhasReturn + LinhasReturn;

        for (var j = 0; j <= LinhasReturn; j++) {
          for (var i = 0; i < total; i++) {
            if (data.horarios[i].idsemana == 2) {
              alert(totalPreenchimento);

              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-terca' + j, data.horarios[totalPreenchimento].iddisciplina));

              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-terca' + j, data.horarios[totalPreenchimento].idprofessor));
            }
          }

          totalPreenchimento = totalPreenchimento + 1;
        }

        for (var j = 0; j <= LinhasReturn; j++) {
          for (var i = 0; i < total; i++) {
            if (data.horarios[i].idsemana == 3) {
              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-quarta' + j, data.horarios[totalPreenchimento].iddisciplina));

              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-quarta' + j, data.horarios[totalPreenchimento].idprofessor));
            }
          }

          totalPreenchimento = totalPreenchimento + 1;
        }

        for (var j = 0; j <= LinhasReturn; j++) {
          for (var i = 0; i < total; i++) {
            if (data.horarios[i].idsemana == 4) {
              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-quinta' + j, data.horarios[totalPreenchimento].iddisciplina));

              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-quinta' + j, data.horarios[totalPreenchimento].idprofessor));
            }
          }

          totalPreenchimento = totalPreenchimento + 1;
        }

        for (var j = 0; j <= LinhasReturn; j++) {
          for (var i = 0; i < total; i++) {
            if (data.horarios[i].idsemana == 5) {
              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-sexta' + j, data.horarios[totalPreenchimento].iddisciplina));

              _this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-sexta' + j, data.horarios[totalPreenchimento].idprofessor));
            }
          }

          totalPreenchimento = totalPreenchimento + 1;
        }

        clearInterval(timer60);
      }, 1000);
      var timer100 = setInterval(function () {
        _this.setState({
          liberadoHorarios: true,
          loading: 'none',
          conteudo: 'block'
        });

        clearInterval(timer100);
      }, 2000);
    };

    _this.Disciplinas = function () {
      var self = Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this);

      axios__WEBPACK_IMPORTED_MODULE_34___default.a.get('http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-quadrohorario.php?acao=disciplinas').then(function (_ref3) {
        var data = _ref3.data;

        _this.setState({
          disciplinas: data.disciplinas
        });

        _this.setState(function (prevState) {
          return {
            disciplinas: [].concat(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(prevState.disciplinas), [{
              iddisciplina: 0,
              nmdisciplina: "Selecionar..."
            }])
          };
        });

        _this.state.disciplinas.sort(function (a, b) {
          return a.iddisciplina > b.iddisciplina ? 1 : -1;
        });

        console.log(_this.state.disciplinas);
      });
    };

    _this.Professores = function () {
      var self = Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this);

      axios__WEBPACK_IMPORTED_MODULE_34___default.a.get('http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-quadrohorario.php?acao=professores').then(function (_ref4) {
        var data = _ref4.data;

        _this.setState({
          professores: data.professores
        });

        _this.setState(function (prevState) {
          return {
            professores: [].concat(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(prevState.professores), [{
              idusuario: 0,
              nmusuario: "Selecionar..."
            }])
          };
        });

        _this.state.professores.sort(function (a, b) {
          return a.idusuario > b.idusuario ? 1 : -1;
        });

        console.log(_this.state.professores);
      });
    };

    _this.Deletar = function () {
      var self = Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this);

      axios__WEBPACK_IMPORTED_MODULE_34___default.a.post('http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-quadrohorario.php?acao=deletar', {
        idturma: _this.props.match.params.id
      }).then(function (_ref5) {//window.location.reload()

        var data = _ref5.data;
      });
    };

    return _this;
  }

  Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(QuadroHorarioForm, [{
    key: "addClick",
    value: function addClick() {
      this.setState(function (prevState) {
        return {
          horarios: [].concat(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(prevState.horarios), [{
            inicio: "",
            termino: ""
          }])
        };
      });
    }
  }, {
    key: "addClick2",
    value: function addClick2() {
      LinhasReturn = LinhasReturn + 1;
      this.setState({
        liberadoHorarios: false
      });
      this.setState(function (prevState) {
        return {
          horarios: [].concat(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(prevState.horarios), [{
            inicio: "",
            termino: ""
          }])
        };
      });
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'inicio' + LinhasReturn, ''));
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'termino' + LinhasReturn, ''));
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-segunda' + LinhasReturn, 0));
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-segunda' + LinhasReturn, 0));
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-terca' + LinhasReturn, 0));
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-terca' + LinhasReturn, 0));
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-quarta' + LinhasReturn, 0));
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-quarta' + LinhasReturn, 0));
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-quinta' + LinhasReturn, 0));
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-quinta' + LinhasReturn, 0));
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-sexta' + LinhasReturn, 0));
      this.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-sexta' + LinhasReturn, 0));
      this.setState({
        liberadoHorarios: true
      }); //alert(LinhasReturn)
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.DadosTurma();
      this.Horarios();
      this.Professores();
      this.Disciplinas(); //this.Deletar()

      this.setState({
        horarios: [{
          inicio: "",
          termino: ""
        }]
      });
      LinhasReturn = 0;
    }
  }, {
    key: "createUI",
    value: function createUI() {
      var _this2 = this;

      if (this.state.liberadoHorarios === true) {
        return this.state.horarios.map(function (el, i) {
          return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_26__["default"], {
            style: {
              backgroundColor: 'white'
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 293
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 294
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%'
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 295
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 296
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_input_mask__WEBPACK_IMPORTED_MODULE_21___default.a, {
            mask: "99:99",
            value: _this2.state['inicio' + i] || '',
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'inicio' + i, e.target.value));
            },
            className: "mt-8 mb-16",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 297
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["TextField"], {
            mask: "99:99",
            required: true,
            label: "In\xEDcio",
            id: 'inicio' + i,
            name: 'inicio' + i,
            variant: "outlined",
            autoFocus: true,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 303
            },
            __self: this
          }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
            style: {
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 315
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_input_mask__WEBPACK_IMPORTED_MODULE_21___default.a, {
            mask: "99:99",
            value: _this2.state['termino' + i] || '',
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'termino' + i, e.target.value));
            },
            className: "mt-8 mb-16",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 316
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["TextField"], {
            style: {
              flex: 1
            },
            required: true,
            label: "T\xE9rmino",
            id: 'termino' + i,
            name: 'termino' + i,
            variant: "outlined",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 322
            },
            __self: this
          }))))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 335
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%'
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 336
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_32__["default"], {
            variant: "outlined",
            className: "flex justify-between mt-8 mb-16",
            style: {
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 338
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_29__["default"], {
            htmlFor: "outlined-age-simple",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 339
            },
            __self: this
          }, "Professor"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_33__["default"], {
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-segunda' + i, e.target.value));
            },
            value: _this2.state['professor-segunda' + i] || '',
            labelWidth: 67,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 342
            },
            __self: this
          }, _this2.state.professores.map(function (professores, i) {
            return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_30__["default"], {
              key: i,
              value: professores.idusuario,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 349
              },
              __self: this
            }, professores.nmusuario);
          }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_32__["default"], {
            variant: "outlined",
            className: "flex justify-between mt-8 mb-16",
            style: {
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 355
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_29__["default"], {
            htmlFor: "outlined-age-simple",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 356
            },
            __self: this
          }, "Disciplina"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_33__["default"], {
            value: _this2.state['disciplina-segunda' + i] ? _this2.state['disciplina-segunda' + i] : '',
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-segunda' + i, e.target.value));
            },
            labelWidth: 67,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 359
            },
            __self: this
          }, _this2.state.disciplinas.map(function (disciplinas, i) {
            return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_30__["default"], {
              key: i,
              value: disciplinas.iddisciplina,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 366
              },
              __self: this
            }, disciplinas.nmdisciplina);
          }))))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 375
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%'
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 376
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_32__["default"], {
            variant: "outlined",
            className: "flex justify-between mt-8 mb-16",
            style: {
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 378
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_29__["default"], {
            htmlFor: "outlined-age-simple",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 379
            },
            __self: this
          }, "Professor"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_33__["default"], {
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-terca' + i, e.target.value));
            },
            value: _this2.state['professor-terca' + i] || '',
            labelWidth: 67,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 382
            },
            __self: this
          }, _this2.state.professores.map(function (professores, i) {
            return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_30__["default"], {
              key: i,
              value: professores.idusuario,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 389
              },
              __self: this
            }, professores.nmusuario);
          }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_32__["default"], {
            variant: "outlined",
            className: "flex justify-between mt-8 mb-16",
            style: {
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 395
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_29__["default"], {
            htmlFor: "outlined-age-simple",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 396
            },
            __self: this
          }, "Disciplina"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_33__["default"], {
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-terca' + i, e.target.value));
            },
            value: _this2.state['disciplina-terca' + i] || '',
            labelWidth: 67,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 399
            },
            __self: this
          }, _this2.state.disciplinas.map(function (disciplinas, i) {
            return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_30__["default"], {
              key: i,
              value: disciplinas.iddisciplina,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 406
              },
              __self: this
            }, disciplinas.nmdisciplina);
          }))))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 413
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%'
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 414
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_32__["default"], {
            variant: "outlined",
            className: "flex justify-between mt-8 mb-16",
            style: {
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 416
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_29__["default"], {
            htmlFor: "outlined-age-simple",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 417
            },
            __self: this
          }, "Professor"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_33__["default"], {
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-quarta' + i, e.target.value));
            },
            value: _this2.state['professor-quarta' + i] || '',
            labelWidth: 67,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 420
            },
            __self: this
          }, _this2.state.professores.map(function (professores, i) {
            return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_30__["default"], {
              key: i,
              value: professores.idusuario,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 427
              },
              __self: this
            }, professores.nmusuario);
          }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_32__["default"], {
            variant: "outlined",
            className: "flex justify-between mt-8 mb-16",
            style: {
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 433
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_29__["default"], {
            htmlFor: "outlined-age-simple",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 434
            },
            __self: this
          }, "Disciplina"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_33__["default"], {
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-quarta' + i, e.target.value));
            },
            value: _this2.state['disciplina-quarta' + i] || '',
            labelWidth: 67,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 437
            },
            __self: this
          }, _this2.state.disciplinas.map(function (disciplinas, i) {
            return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_30__["default"], {
              key: i,
              value: disciplinas.iddisciplina,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 444
              },
              __self: this
            }, disciplinas.nmdisciplina);
          }))))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 452
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%'
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 453
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_32__["default"], {
            variant: "outlined",
            className: "flex justify-between mt-8 mb-16",
            style: {
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 455
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_29__["default"], {
            htmlFor: "outlined-age-simple",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 456
            },
            __self: this
          }, "Professor"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_33__["default"], {
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-quinta' + i, e.target.value));
            },
            value: _this2.state['professor-quinta' + i] || '',
            labelWidth: 67,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 459
            },
            __self: this
          }, _this2.state.professores.map(function (professores, i) {
            return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_30__["default"], {
              key: i,
              value: professores.idusuario,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 466
              },
              __self: this
            }, professores.nmusuario);
          }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_32__["default"], {
            variant: "outlined",
            className: "flex justify-between mt-8 mb-16",
            style: {
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 472
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_29__["default"], {
            htmlFor: "outlined-age-simple",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 473
            },
            __self: this
          }, "Disciplina"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_33__["default"], {
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-quinta' + i, e.target.value));
            },
            value: _this2.state['disciplina-quinta' + i] || '',
            labelWidth: 67,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 476
            },
            __self: this
          }, _this2.state.disciplinas.map(function (disciplinas, i) {
            return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_30__["default"], {
              key: i,
              value: disciplinas.iddisciplina,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 483
              },
              __self: this
            }, disciplinas.nmdisciplina);
          }))))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 491
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%'
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 492
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_32__["default"], {
            variant: "outlined",
            className: "flex justify-between mt-8 mb-16",
            style: {
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 494
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_29__["default"], {
            htmlFor: "outlined-age-simple",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 495
            },
            __self: this
          }, "Professor"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_33__["default"], {
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'professor-sexta' + i, e.target.value));
            },
            value: _this2.state['professor-sexta' + i] || '',
            labelWidth: 67,
            inputProps: {
              name: 'nmdisciplina',
              id: 'outlined--simple'
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 498
            },
            __self: this
          }, _this2.state.professores.map(function (professores, i) {
            return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_30__["default"], {
              key: i,
              value: professores.idusuario,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 505
              },
              __self: this
            }, professores.nmusuario);
          }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_32__["default"], {
            variant: "outlined",
            className: "flex justify-between mt-8 mb-16",
            style: {
              width: 120
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 511
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_29__["default"], {
            htmlFor: "outlined-age-simple",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 512
            },
            __self: this
          }, "Disciplina"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_33__["default"], {
            onChange: function onChange(e) {
              return _this2.setState(Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, 'disciplina-sexta' + i, e.target.value));
            },
            value: _this2.state['disciplina-sexta' + i] || '',
            labelWidth: 67,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 515
            },
            __self: this
          }, _this2.state.disciplinas.map(function (disciplinas, i) {
            return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_30__["default"], {
              key: i,
              value: disciplinas.iddisciplina,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 522
              },
              __self: this
            }, disciplinas.nmdisciplina);
          }))))));
        });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(i, event) {}
  }, {
    key: "removeClick",
    value: function removeClick(i) {
      var horarios = Object(_Users_thalescrisostomo_Projeto_David_logup_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(this.state.horarios);

      if (horarios.length == 1) {}

      horarios.splice(1, 1);
      this.setState({
        horarios: horarios
      });
    }
  }, {
    key: "Salvar",
    value: function Salvar() {
      var _this3 = this;

      var objectUser = JSON.parse(localStorage.getItem('objetoUsuario')) || {
        idunidade: ''
      };
      var idunidade = objectUser.idunidade;
      var i = 0;
      var inicio = 'inicio';
      var termino = 'termino';
      var professor = 'segunda';
      var disciplina = 'disciplina';
      var total = this.state.horarios.length;

      for (i; i < total; i++) {
        if (this.state['inicio' + i] == '' || this.state['inicio' + i] == null) {
          var linha = i + 1;
          return alert('Porfavor, preencha toda a linha ' + linha + ' ou os dados não serão salvos.');
        }
      }

      this.setState({
        loadingSave: 'flex'
      });
      this.Deletar();
      var idturma = this.props.match.params.id;
      idturma = parseInt(idturma);

      for (var j = 0; j < total; j++) {
        var linhaProfessor = [];
        var linhaDisciplina = [];
        linhaProfessor.push(this.state['professor-segunda' + j], this.state['professor-terca' + j], this.state['professor-quarta' + j], this.state['professor-quinta' + j], this.state['professor-sexta' + j]);
        linhaDisciplina.push(this.state['disciplina-segunda' + j], this.state['disciplina-terca' + j], this.state['disciplina-quarta' + j], this.state['disciplina-quinta' + j], this.state['disciplina-sexta' + j]);

        for (var y = 0; y < linhaProfessor.length; y++) {
          var dia = y + 1;
          axios__WEBPACK_IMPORTED_MODULE_34___default.a.post('http://dmctec.virtuaserver.com.br/logup-dat/ws/dadoslogup-quadrohorario.php?acao=salvarhorario', {
            idunidade: idunidade,
            idturma: idturma,
            idprofessor: linhaProfessor[y],
            iddisciplina: linhaDisciplina[y],
            hrinicio: this.state['inicio' + j],
            hrfim: this.state['termino' + j],
            idsemana: dia
          }).then(function (response) {
            console.log(response);
          });
        }
      }

      this.setState({
        loadingSave: 'none'
      });
      var timer300 = setInterval(function () {
        //window.location.reload( )
        _this3.setState({
          sucesso: 'flex'
        });

        clearInterval(timer300);
      }, 300);
      var timer = setInterval(function () {
        //window.location.reload( )
        _this3.setState({
          sucesso: 'none'
        });

        clearInterval(timer);
      }, 2600);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_8__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 620
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_fuse__WEBPACK_IMPORTED_MODULE_12__["FusePageCarded"], {
        classes: {
          toolbar: "p-0",
          header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
        },
        header: react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          className: "flex flex-1 w-full items-center justify-between",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 627
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_fuse__WEBPACK_IMPORTED_MODULE_12__["FuseAnimate"], {
          animation: "transition.slideRightIn",
          delay: 300,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 628
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Typography"], {
          className: "normal-case flex items-center sm:mb-12",
          component: react_router_dom__WEBPACK_IMPORTED_MODULE_15__["Link"],
          role: "button",
          to: "/gestao/quadrohorario",
          color: "inherit",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 629
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Icon"], {
          className: "mr-4 text-20",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 630
          },
          __self: this
        }, "arrow_back"), "Voltar")), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          className: "flex items-center",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 635
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_fuse__WEBPACK_IMPORTED_MODULE_12__["FuseAnimate"], {
          animation: "transition.expandIn",
          delay: 300,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 636
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Icon"], {
          className: "text-32 mr-0 sm:mr-12",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 637
          },
          __self: this
        }, "account_balance")), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_fuse__WEBPACK_IMPORTED_MODULE_12__["FuseAnimate"], {
          animation: "transition.slideLeftIn",
          delay: 300,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 639
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Typography"], {
          className: "hidden sm:flex",
          variant: "h6",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 640
          },
          __self: this
        }, "Formul\xE1rio Quadro de Hor\xE1rio"))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_fuse__WEBPACK_IMPORTED_MODULE_12__["FuseAnimate"], {
          animation: "transition.slideRightIn",
          delay: 300,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 643
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Button"], {
          onClick: function onClick() {
            return _this4.Salvar();
          },
          className: "whitespace-no-wrap",
          variant: "contained",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 644
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
          className: "hidden sm:flex",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 645
          },
          __self: this
        }, "Salvar"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
          className: "flex sm:hidden",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 646
          },
          __self: this
        }, "Salvar")))),
        content: react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          className: "p-16",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 652
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          style: {
            display: this.state.loading,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 400
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 653
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          style: {
            display: 'block',
            padding: 10,
            width: 200,
            backgroundColor: 'white',
            boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
            borderRadius: 4
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 654
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_LinearProgress__WEBPACK_IMPORTED_MODULE_28__["default"], {
          style: {
            padding: 4
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 655
          },
          __self: this
        }))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          style: {
            display: this.state.conteudo
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 658
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          className: "flex",
          style: {
            paddingLeft: '1.6%',
            paddingRight: '1.6%'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 660
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["TextField"], {
          className: "m-5",
          required: true,
          label: "Ano",
          autoFocus: true,
          id: "ano",
          name: "ano",
          disabled: this.state.novo,
          value: this.state.ano,
          variant: "outlined",
          fullWidth: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 661
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["TextField"], {
          className: "m-5",
          required: true,
          label: "Tipo de Ensino",
          id: "tipoensino",
          name: "tipoensino",
          value: this.state.tipoensino,
          variant: "outlined",
          fullWidth: true,
          disabled: this.state.novo,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 673
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["TextField"], {
          className: "m-5",
          required: true,
          label: "S\xE9rie",
          id: "serie",
          name: "serie",
          value: this.state.serie,
          variant: "outlined",
          fullWidth: true,
          disabled: this.state.novo,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 684
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["TextField"], {
          className: "m-5",
          required: true,
          label: "Turma",
          autoFocus: true,
          id: "nome",
          name: "nome",
          value: this.state.turma,
          variant: "outlined",
          fullWidth: true,
          disabled: this.state.novo,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 695
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 709
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_22__["default"], {
          "aria-label": "simple table",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 710
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_25__["default"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 711
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_26__["default"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 712
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
          align: "center",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 713
          },
          __self: this
        }, "Per\xEDodo"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
          align: "center",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 714
          },
          __self: this
        }, "Segunda"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
          align: "center",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 715
          },
          __self: this
        }, "Ter\xE7a"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
          align: "center",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 716
          },
          __self: this
        }, "Quarta"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
          align: "center",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 717
          },
          __self: this
        }, "Quinta"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_24__["default"], {
          align: "center",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 718
          },
          __self: this
        }, "Sexta"))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_23__["default"], {
          style: {
            backgroundColor: 'white'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 721
          },
          __self: this
        }, this.createUI())), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          style: {
            display: 'flex',
            width: '100%',
            marginTop: 30,
            paddingLeft: '1.5%'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 726
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Button"], {
          style: {
            borderRadius: 100,
            backgroundColor: '#262933',
            color: 'white',
            padding: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 15,
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)'
          },
          onClick: function onClick() {
            return _this4.addClick2();
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 727
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Icon"], {
          className: "mr-4 text-20",
          style: {
            marginLeft: 5
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 728
          },
          __self: this
        }, "add")), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Button"], {
          style: {
            marginLeft: 10,
            borderRadius: 100,
            backgroundColor: '#262933',
            color: 'white',
            padding: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)'
          },
          onClick: function onClick() {
            return _this4.removeClick();
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 731
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__["Icon"], {
          className: "mr-4 text-20",
          style: {
            marginLeft: 5
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 732
          },
          __self: this
        }, "remove")))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          style: {
            padding: 10,
            minWidth: 230,
            textAlign: 'ceter',
            display: this.state.sucesso,
            position: 'fixed',
            top: 150,
            zIndex: 999999
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 737
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_27__["default"], {
          variant: "filled",
          severity: "success",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 738
          },
          __self: this
        }, "Salvo com sucesso!")), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          style: {
            padding: 10,
            display: this.state.error,
            minWidth: 230,
            textAlign: 'ceter',
            position: 'fixed',
            top: 150,
            zIndex: 999999
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 742
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_27__["default"], {
          variant: "filled",
          severity: "error",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 743
          },
          __self: this
        }, "Erro ao salvar.")), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
          style: {
            display: this.state.loadingSave,
            padding: 10,
            position: 'fixed',
            top: 195,
            width: 200,
            zIndex: 999999,
            backgroundColor: 'white',
            boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
            borderRadius: 4
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 747
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_material_ui_core_LinearProgress__WEBPACK_IMPORTED_MODULE_28__["default"], {
          style: {
            padding: 4
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 748
          },
          __self: this
        })))),
        innerScroll: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 621
        },
        __self: this
      }));
    }
  }]);

  return QuadroHorarioForm;
}(react__WEBPACK_IMPORTED_MODULE_8__["PureComponent"]);



/***/ })

})
//# sourceMappingURL=main.3d7f09309f7f26b4c372.hot-update.js.map