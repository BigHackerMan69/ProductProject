import jwt from 'jsonwebtoken';
class JWTFactoryImpl {
    secretKey;
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    createToken(payload, expiresIn) {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }
}
export { JWTFactoryImpl };
//# sourceMappingURL=JWTFactory.js.map