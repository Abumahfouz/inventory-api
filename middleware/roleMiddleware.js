exports.validateRole = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user ? req.user.role : null;
        console.log(`Validating role: ${userRole}, allowed: ${allowedRoles}`);
        
        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
        }
        next();
    };
}
