/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./vue.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./vue.js":
/*!****************!*\
  !*** ./vue.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 构造虚拟dom的容器\nfunction nodeContainer(node, vm, flag) {\n  console.log(node);\n  var flag = flag || document.createDocumentFragment();\n  var child; // 遍历节点\n\n  while (child = node.firstChild) {\n    compile(child, vm);\n    flag.appendChild(child);\n\n    if (flag.firstChild) {\n      nodeContainer(child, vm, flag);\n    }\n  }\n\n  return flag;\n} // 构造函数\n\n\nfunction Vue(options) {\n  this.data = options.data;\n  observe(this.data, this);\n  var id = options.el;\n  console.log(id, document.getElementById(id));\n  var dom = nodeContainer(document.getElementById(id), this);\n  document.getElementById(id).appendChild(dom);\n} // data中的属性设置get和set\n\n\nfunction define(obj, key, value) {\n  var dep = new Dep();\n  Object.defineProperty(obj, key, {\n    get: function get() {\n      if (Dep.global) {\n        //这里是第一次new对象Watcher的时候，初始化数据的时候，往订阅者对象里面添加对象。第二次后，就不需要再添加了\n        dep.add(Dep.global);\n      }\n\n      return value;\n    },\n    set: function set(newValue) {\n      if (newValue === value) {\n        return; //如果值没变化，不用触发新值改变\n      }\n\n      value = newValue; //改变了值\n\n      dep.notify();\n      console.log(\"set了最新值\" + value);\n    }\n  });\n} // 给data中属性设置get和set\n\n\nfunction observe(obj, vm) {\n  Object.keys(obj).forEach(function (key) {\n    define(vm, key, obj[key]);\n  });\n} // 编译v-model和模板语法\n\n\nfunction compile(node, vm) {\n  var res = /\\{\\{(.*)\\}\\}/g; // node为元素\n\n  if (node.nodeType === 1) {\n    var attr = node.attributes;\n\n    for (var i = 0; i < attr.length; i++) {\n      if (attr[i].nodeName === 'v-model') {\n        var name = attr[i].nodeValue;\n        new Watcher(vm, node, name);\n        node.addEventListener('input', function (e) {\n          vm[name] = e.target.value;\n        });\n        node.value = vm.data[name];\n      }\n    }\n  } // node为文本\n\n\n  if (node.nodeType === 3) {\n    if (res.test(node.nodeValue)) {\n      var name = RegExp.$1;\n      name = name.trim();\n      new Watcher(vm, node, name);\n      node.nodeValue = vm.data[name];\n    }\n  }\n} // 发布者模式\n\n\nfunction Dep() {\n  this.subs = [];\n}\n\nDep.prototype = {\n  add: function add(sub) {\n    this.subs.push(sub);\n  },\n  notify: function notify() {\n    this.subs.forEach(function (sub) {\n      sub.update();\n    });\n  } // 订阅者\n\n};\n\nfunction Watcher(vm, node, name) {\n  Dep.global = this;\n  this.name = name;\n  this.node = node;\n  this.vm = vm;\n  this.update();\n  Dep.global = null;\n}\n\nWatcher.prototype.update = function () {\n  this.get();\n\n  switch (this.node.nodeType) {\n    case 1:\n      this.node.value = this.value;\n      break;\n\n    case 3:\n      this.node.nodeValue = this.value;\n      break;\n\n    default:\n      break;\n  }\n};\n\nWatcher.prototype.get = function () {\n  this.value = this.vm[this.name];\n};\n\nnew Vue({\n  el: 'mvvm',\n  data: {\n    text: 10000\n  }\n});\n\n//# sourceURL=webpack:///./vue.js?");

/***/ })

/******/ });