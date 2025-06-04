import jwt from 'jsonwebtoken';

const jwtMiddleware = async (req, res, next) => {
    const token = req.cookies['gate-token'];

    if(!token) {
        console.log('jwt error:  No token found');
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(e) {
        console.log(`${e.message}`);
        return res.sendStatus(401);
    }
}

export { jwtMiddleware };