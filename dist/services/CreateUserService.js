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
exports.CreateUserService = void 0;
const bcrypt_1 = require("bcrypt");
const tsyringe_1 = require("tsyringe");
let CreateUserService = class CreateUserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(username, email, password) {
        const userAlreadyExists = await this.usersRepository.findByUsername(username);
        if (userAlreadyExists) {
            throw new Error("Username already taken.");
        }
        if (!email || !password) {
            throw new Error("Email or password is incorrect.");
        }
        const hashPassword = await (0, bcrypt_1.hash)(password, 10);
        const user = await this.usersRepository.create(username, email, hashPassword);
        return user;
    }
};
CreateUserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UsersRepository"))
], CreateUserService);
exports.CreateUserService = CreateUserService;
