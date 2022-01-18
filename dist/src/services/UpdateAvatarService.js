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
exports.UpdateAvatarService = void 0;
const tsyringe_1 = require("tsyringe");
let UpdateAvatarService = class UpdateAvatarService {
    constructor(s3StorageProvider, usersRepository) {
        this.s3StorageProvider = s3StorageProvider;
        this.usersRepository = usersRepository;
    }
    async execute(id, file) {
        const user = await this.usersRepository.findById(id);
        if (user === null || user === void 0 ? void 0 : user.avatar_url) {
            await this.s3StorageProvider.delete(user.avatar_url);
        }
        const newAvatar = await this.s3StorageProvider.save(file);
        const avatar_url = `${process.env.AWS_BUCKET_URL}/${newAvatar}`;
        const userUpdated = await this.usersRepository.updateAvatar(id, avatar_url);
        return userUpdated;
    }
};
UpdateAvatarService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("S3StorageProvider")),
    __param(1, (0, tsyringe_1.inject)("UsersRepository"))
], UpdateAvatarService);
exports.UpdateAvatarService = UpdateAvatarService;
