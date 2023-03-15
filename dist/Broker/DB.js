import { connect } from 'mongoose';
export class DB {
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
//# sourceMappingURL=DB.js.map