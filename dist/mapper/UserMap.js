"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
class UserMap {
    static toDTO({ email, username, id, avatar_url, pro }) {
        return {
            id,
            avatar_url,
            username,
            email,
            pro,
        };
    }
}
exports.UserMap = UserMap;
//# sourceMappingURL=UserMap.js.map