"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("openai");
let AppController = class AppController {
    constructor(openAI, configSerivce) {
        this.openAI = openAI;
        this.configSerivce = configSerivce;
        this.openAiModel = this.configSerivce.getOrThrow('OPEN_AI_MODEL');
    }
    async generateMessage() {
        const response = await this.openAI.responses.create({
            model: this.openAiModel,
            input: 'Diga uma frase bem legal em português. No máximo 10 palavras.',
            max_output_tokens: 20,
        });
        return { message: response.output_text };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "generateMessage", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('/api'),
    __metadata("design:paramtypes", [openai_1.default,
        config_1.ConfigService])
], AppController);
//# sourceMappingURL=app.controller.js.map