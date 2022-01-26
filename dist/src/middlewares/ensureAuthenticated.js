"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const UsersRepository_1 = require("../repositories/UsersRepository");
async function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error("Token missing");
    }
    const [, token] = authHeader.split(" ");
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        const { sub } = decoded;
        const usersRepository = new UsersRepository_1.UsersRepository();
        const user = usersRepository.findById(sub);
        if (!user) {
            throw new Error("User does not exists");
        }
        request.user = {
            id: sub,
        };
        next();
    }
    catch (error) {
        return response.status(400).json(error);
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
