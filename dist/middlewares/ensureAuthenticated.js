"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const UsersRepository_1 = require("../repositories/UsersRepository");
function ensureAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        throw new Error("Token is missing.");
    }
    const [, token] = authToken.split(" ");
    const jwtSecret = process.env.JWT_SECRET;
    try {
        const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, jwtSecret);
        const usersRepository = new UsersRepository_1.UsersRepository();
        const user = usersRepository.findById(user_id);
        if (!user) {
            throw new Error("User not found.");
        }
        request.user = {
            id: user_id
        };
        next();
    }
    catch (error) {
        return response.json(error);
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
//# sourceMappingURL=ensureAuthenticated.js.map