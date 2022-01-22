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
exports.ListUserInfoService = void 0;
const tsyringe_1 = require("tsyringe");
const UserMap_1 = require("../mapper/UserMap");
let ListUserInfoService = class ListUserInfoService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(username) {
        const user = await this.usersRepository.findByUsername(username);
        if (!user) {
            throw new Error("User not found.");
        }
        const userInfo = UserMap_1.UserMap.toDTO(user);
        return userInfo;
    }
};
ListUserInfoService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UsersRepository"))
], ListUserInfoService);
exports.ListUserInfoService = ListUserInfoService;
