"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const mongoose_1 = require("mongoose");
class DB {
    static async connect() {
        await (0, mongoose_1.connect)(process.env.DB);
    }
}
exports.DB = DB;
//# sourceMappingURL=DB.cjs.map