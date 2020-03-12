(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./handler.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./handler.ts":
/*!********************!*\
  !*** ./handler.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ \"apollo-server-lambda\");\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolvers */ \"./resolvers.ts\");\n/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schema */ \"./schema.ts\");\n\n\n\nconst server = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__[\"ApolloServer\"]({\n    typeDefs: Object(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__[\"gql\"])(_schema__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n    resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    formatError: error => {\n        console.log(error);\n        return error;\n    },\n    context: ({ event, context }) => ({\n        headers: event.headers,\n        functionName: context.functionName,\n        event,\n        context\n    }),\n    introspection: true,\n});\nexports.graphqlHandler = server.createHandler({\n    cors: {\n        origin: \"*\"\n    }\n});\n\n\n//# sourceURL=webpack:///./handler.ts?");

/***/ }),

/***/ "./model/Todo.ts":
/*!***********************!*\
  !*** ./model/Todo.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Todo; });\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var aws_sdk_clients_dynamodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aws-sdk/clients/dynamodb */ \"aws-sdk/clients/dynamodb\");\n/* harmony import */ var aws_sdk_clients_dynamodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aws_sdk_clients_dynamodb__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid/v4 */ \"uuid/v4\");\n/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst ddbClient = new aws_sdk_clients_dynamodb__WEBPACK_IMPORTED_MODULE_1__[\"DocumentClient\"]({\n    region: process.env.AWS_REGION,\n    accessKeyId: \"AKIA4ZWSF4E75V3EBM4V\",\n    secretAccessKey: \"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\",\n});\nclass Todo {\n    constructor(args) {\n        const { todoId, name, isDone } = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.pickBy(args, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.identity);\n        this.todoId = todoId || null;\n        this.name = name;\n        this.isDone = isDone || false;\n    }\n    isNew() {\n        return Boolean(!this.todoId);\n    }\n    async fetch() {\n        const params = {\n            Key: {\n                todoId: this.todoId,\n            },\n            TableName: \"to_do\",\n        };\n        const { Item } = await ddbClient.get(params).promise();\n        return this.reforge(Item);\n    }\n    /* eslint class-methods-use-this: [\"error\", { \"exceptMethods\": [\"fetchAll\"] }] */\n    async fetchAll() {\n        const { Items } = await ddbClient.scan({ TableName: \"to_do\" }).promise();\n        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(Items, item => new Todo(item));\n    }\n    async insert() {\n        const { name, isDone } = this;\n        const todoId = uuid_v4__WEBPACK_IMPORTED_MODULE_2___default()();\n        const params = {\n            Item: {\n                todoId,\n                name,\n                isDone,\n                createdAt: Date.now().toString(),\n                updatedAt: Date.now().toString(),\n            },\n            TableName: \"to_do\",\n        };\n        const result = await ddbClient.put(params).promise();\n        if (!result)\n            throw new Error(\"insert failed\");\n        return this.reforge({ todoId, name, isDone });\n    }\n    async update() {\n        const { name, isDone, todoId } = this;\n        const params = {\n            ExpressionAttributeNames: {\n                \"#N\": \"name\",\n                \"#D\": \"isDone\",\n                \"#U\": \"updatedAt\",\n            },\n            ExpressionAttributeValues: {\n                \":n\": name,\n                \":d\": isDone,\n                \":u\": Date.now().toString(),\n            },\n            Key: {\n                todoId,\n            },\n            TableName: \"to_do\",\n            UpdateExpression: \"SET #N = :n, #D = :d, #U = :u\",\n            ReturnValues: \"ALL_NEW\",\n        };\n        const { Attributes } = await ddbClient.update(params).promise();\n        return this.reforge(Attributes);\n    }\n    async save() {\n        if (this.isNew())\n            return this.insert();\n        return this.update();\n    }\n    async destroy() {\n        const params = {\n            Key: {\n                todoId: this.todoId,\n            },\n            ReturnValues: \"ALL_OLD\",\n            TableName: \"to_do\",\n        };\n        const { Attributes } = await ddbClient.delete(params).promise();\n        return this.reforge(Attributes);\n    }\n    reforge(attributes) {\n        if (!attributes)\n            return null;\n        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(attributes, (value, column) => {\n            this[column] = value;\n        });\n        return this;\n    }\n}\n\n\n//# sourceURL=webpack:///./model/Todo.ts?");

/***/ }),

/***/ "./resolvers.ts":
/*!**********************!*\
  !*** ./resolvers.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _model_Todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/Todo */ \"./model/Todo.ts\");\n\n\nvar ResponseStatus;\n(function (ResponseStatus) {\n    ResponseStatus[\"failed\"] = \"faided\";\n    ResponseStatus[\"ok\"] = \"ok\";\n})(ResponseStatus || (ResponseStatus = {}));\n;\nconst Query = {\n    todos: async (source, args) => {\n        const { todoId } = args;\n        if (todoId) {\n            const todo = await new _model_Todo__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ todoId }).fetch();\n            return [todo];\n        }\n        const todos = await new _model_Todo__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().fetchAll();\n        return todos;\n    }\n};\nconst Mutation = {\n    addTodo: async (source, { input }) => {\n        const { name } = input;\n        const todo = await new _model_Todo__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ name }).save();\n        return { status: ResponseStatus.ok, todo };\n    },\n    updateTodo: async (source, { input }) => {\n        const { todoId } = input;\n        const target = await new _model_Todo__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ todoId }).fetch();\n        if (!target)\n            throw new Error(\"Not Found\");\n        const todo = new _model_Todo__WEBPACK_IMPORTED_MODULE_1__[\"default\"](lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign(target, input));\n        await todo.save();\n        return { status: ResponseStatus.ok, todo };\n    },\n    delTodo: async (source, { input }) => {\n        const { todoId } = input;\n        const todo = await new _model_Todo__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ todoId }).fetch();\n        if (!todo)\n            throw new Error(\"Not Found\");\n        const target = new _model_Todo__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ todoId });\n        await target.destroy();\n        return { status: ResponseStatus.ok, todo };\n    }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    Query,\n    Mutation\n});\n\n\n//# sourceURL=webpack:///./resolvers.ts?");

/***/ }),

/***/ "./schema.ts":
/*!*******************!*\
  !*** ./schema.ts ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst schema = `\n  input AddTodoMutationInput {\n    name: String!\n  }\n\n  type AddTodoMutationPayload {\n    status: ResponseStatus\n    todo: Todo\n  }\n\n  input DelTodoMutationInput {\n    todoId: String!\n  }\n\n  type DelTodoMutationPayload {\n    status: ResponseStatus\n    todo: Todo\n  }\n\n  type Mutation {\n    addTodo(input: AddTodoMutationInput): AddTodoMutationPayload\n    updateTodo(input: UpdateTodoMutationInput): UpdateTodoMutationPayload\n    delTodo(input: DelTodoMutationInput): DelTodoMutationPayload\n  }\n\n  type Query {\n    todos(todoId: String): [Todo]\n  }\n\n  enum ResponseStatus {\n    failed\n    ok\n  }\n\n  type Todo {\n    todoId: String\n    name: String\n    isDone: Boolean\n  }\n\n  input UpdateTodoMutationInput {\n    todoId: String!\n    name: String\n    isDone: Boolean\n  }\n\n  type UpdateTodoMutationPayload {\n    status: ResponseStatus\n    todo: Todo\n  }\n`;\n/* harmony default export */ __webpack_exports__[\"default\"] = (schema);\n\n\n//# sourceURL=webpack:///./schema.ts?");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-lambda\");\n\n//# sourceURL=webpack:///external_%22apollo-server-lambda%22?");

/***/ }),

/***/ "aws-sdk/clients/dynamodb":
/*!*******************************************!*\
  !*** external "aws-sdk/clients/dynamodb" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk/clients/dynamodb\");\n\n//# sourceURL=webpack:///external_%22aws-sdk/clients/dynamodb%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "uuid/v4":
/*!**************************!*\
  !*** external "uuid/v4" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uuid/v4\");\n\n//# sourceURL=webpack:///external_%22uuid/v4%22?");

/***/ })

/******/ })));