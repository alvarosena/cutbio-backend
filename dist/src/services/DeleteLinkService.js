"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLinkService = void 0;
const tsyringe_1 = require("tsyringe");
let DeleteLinkService = class DeleteLinkService {
    constructor(linksRepository) {
        this.linksRepository = linksRepository;
    }
    async execute(id) {
        const link = await this.linksRepository.findById(id);
        if (!link) {
            throw new Error("Link not found.");
        }
        const deletedLink = await this.linksRepository.deleteLink(id);
        return deletedLink;
    }
};
DeleteLinkService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("LinksRepository"))
], DeleteLinkService);
exports.DeleteLinkService = DeleteLinkService;