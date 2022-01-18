"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileController = void 0;
const tsyringe_1 = require("tsyringe");
const UserProfileService_1 = require("../services/UserProfileService");
class UserProfileController {
    async handle(request, response) {
        try {
            const { username } = request.params;
            const userProfileService = tsyringe_1.container.resolve(UserProfileService_1.UserProfileService);
            const user = await userProfileService.execute(username);
            return response.json(user);
        }
        catch (error) {
            const errorMessage = 'Error: User not found.';
            error = errorMessage;
            return response.status(404).json(error);
        }
    }
}
exports.UserProfileController = UserProfileController;
