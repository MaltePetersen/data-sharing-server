/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AppController_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const platform_express_1 = __webpack_require__("@nestjs/platform-express");
const app_service_1 = __webpack_require__("./src/app/app.service.ts");
const Content_model_1 = __webpack_require__("./src/app/model/Content.model.ts");
let AppController = AppController_1 = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.logger = new common_1.Logger(AppController_1.name);
    }
    currentFileToken(tokenCode, query) {
        const delteFile = !(query.delete === 'false');
        return this.appService.getFileByToken(tokenCode, delteFile);
    }
    getAllData() {
        return this.appService.getAllFiles();
    }
    upload(file) {
        return this.appService.save(file);
    }
    delete(tokenCode) {
        return this.appService.deleteByToken(tokenCode.token);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/file/:token'),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__param(1, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "currentFileToken", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getAllData", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.Bind)((0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Content_model_1.Content !== "undefined" && Content_model_1.Content) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "upload", null);
tslib_1.__decorate([
    (0, common_1.Delete)('/file/:token'),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "delete", null);
AppController = AppController_1 = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_controller_1 = __webpack_require__("./src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./src/app/app.service.ts");
const files_service_1 = __webpack_require__("./src/app/files.service.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, files_service_1.FilesService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const rxjs_1 = __webpack_require__("rxjs");
const uuid_1 = __webpack_require__("uuid");
const files_service_1 = __webpack_require__("./src/app/files.service.ts");
let AppService = class AppService {
    constructor(filesService) {
        this.filesService = filesService;
        this.files$$ = new rxjs_1.BehaviorSubject([]);
        this.files$ = this.files$$.asObservable();
    }
    getAllFiles() {
        return this.filesService.getAll();
    }
    deleteByToken(token) {
        return this.filesService.deleteByToken(token);
    }
    getFileByToken(tokenCode, deleteFile) {
        const file = this.filesService.getByToken(tokenCode);
        if (!file)
            throw new common_1.HttpException('Does not exist', common_1.HttpStatus.NOT_FOUND);
        if (deleteFile)
            this.filesService.delete(file.id);
        return file;
    }
    save(content) {
        const newFile = this.convertToFile(content);
        this.filesService.add(newFile);
        setTimeout(() => this.filesService.delete(newFile.id), this.calculateTimerLength(30));
        return newFile.token;
    }
    convertToFile(content) {
        return {
            id: (0, uuid_1.v4)(),
            name: content.originalname,
            content: Buffer.from(content.buffer),
            uploadDate: new Date(Date.now()),
            token: this.generateToken(),
        };
    }
    generateToken() {
        return {
            content: Math.floor(10000 + Math.random() * 90000).toString(),
            creation: new Date(Date.now()),
        };
    }
    calculateTimerLength(min) {
        return min * 60 * 1000;
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof files_service_1.FilesService !== "undefined" && files_service_1.FilesService) === "function" ? _a : Object])
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./src/app/files.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const rxjs_1 = __webpack_require__("rxjs");
const common_1 = __webpack_require__("@nestjs/common");
let FilesService = class FilesService {
    constructor() {
        this.files$$ = new rxjs_1.BehaviorSubject([]);
        this.files$ = this.files$$.asObservable();
    }
    getAll() {
        return this.files$$.value;
    }
    getByToken(tokenCode) {
        return this.files$$.value.find((file) => file.token.content === tokenCode.token);
    }
    add(file) {
        const files = this.getAll();
        files.push(file);
        this.files$$.next(files);
    }
    delete(fileId) {
        const files = this.getAll();
        const newFiles = files.filter((file) => file.id !== fileId);
        this.files$$.next(newFiles);
    }
    deleteByToken(token) {
        const files = this.getAll();
        const newFiles = files.filter((file) => file.token.content !== token);
        this.files$$.next(newFiles);
    }
};
FilesService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], FilesService);
exports.FilesService = FilesService;


/***/ }),

/***/ "./src/app/model/Content.model.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/platform-express":
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "rxjs":
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3000;
        app.enableCors();
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map