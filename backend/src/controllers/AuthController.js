const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    try {
        const secret = process.env.SECRET;
        const decoded = jwt.verify(token, secret);

        req.user = decoded;
        next();
    } catch (ex) {
        console.error('Token verification failed:', ex); 
        return res.status(400).send({ message: 'Invalid token.' });
    }
}

module.exports = authMiddleware;
