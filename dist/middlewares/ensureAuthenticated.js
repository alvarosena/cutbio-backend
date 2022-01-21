"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const UsersRepository_1 = require("../repositories/UsersRepository");
async function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error("Token is missing");
    }
    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        const usersRespository = new UsersRepository_1.UsersRepository();
        const user = usersRespository.findById(user_id);
        if (!user) {
            throw new Error("User does not exists");
        }
        request.user = {
            id: user_id,
        };
        next();
    }
    catch (error) {
        const errorMessage = 'Error: Invalid token.';
        error = errorMessage;
        return response.status(400).json(error);
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
