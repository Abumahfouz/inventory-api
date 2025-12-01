const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer', '');
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user info to request
        req.user = decoded;
        console.log('Authorization successful');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}