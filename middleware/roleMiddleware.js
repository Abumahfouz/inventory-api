const validateRole = (req, res, next) => {
    const role = req.user ? req.user.role : null;
    if (!role || !['vendor', 'customer'].includes(role)) {
        return false;
    }
    next();
}
