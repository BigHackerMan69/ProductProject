import { connect } from 'mongoose';
class MongoDB {
    static async connect() {
        try {
            await connect(process.env.MONGODB + process.env.PRODUCTDB, { keepAlive: true, keepAliveInitialDelay: 300000 });
            console.debug("Connected to the " + process.env.PRODUCTDB);
        }
        catch (e) {
            console.error("From class DB: " + e);
        }
    }
}
export { MongoDB };
//# sourceMappingURL=MongoDB.js.map