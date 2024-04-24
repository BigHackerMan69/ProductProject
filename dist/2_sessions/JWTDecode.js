import jwt from 'jsonwebtoken';
const secretKey = 'querty';
class JWTDecode {
    validateToken(token) {
        try {
            return jwt.verify(token, secretKey);
        }
        catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                console.error('Token is expired');
            }
            else if (error instanceof jwt.JsonWebTokenError) {
                console.error('Invalid token');
            }
            else {
                console.error('Token validation error');
            }
            return null;
        }
    }
}
export { JWTDecode };
//# sourceMappingURL=JWTDecode.js.map