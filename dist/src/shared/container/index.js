"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const LinksRepository_1 = require("../../repositories/LinksRepository");
const UsersRepository_1 = require("../../repositories/UsersRepository");
const S3StorageProvider_1 = require("./Providers/StorageProvider/S3StorageProvider");
tsyringe_1.container.registerSingleton("UsersRepository", UsersRepository_1.UsersRepository);
tsyringe_1.container.registerSingleton("LinksRepository", LinksRepository_1.LinksRepository);
tsyringe_1.container.registerSingleton("S3StorageProvider", S3StorageProvider_1.S3StorageProvider);
