const jwtMiddleware = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = req.headers.authorization?.split('Bearer ')[1];

    if(!token) {
        console.log('jwt error:  No token found');
        return resizeBy.sendStatus(401);
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        return res.status(200).json({token: decodedToken});
    } catch(e) {
        console.log(`${e.message}`);
        return res.sendStatus(401);
    }
}

export { jwtMiddleware };