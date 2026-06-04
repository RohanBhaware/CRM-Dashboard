module.exports = (allowedRoles) => {
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    return (req, res, next) => {
        if (!req.user || !rolesArray.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    }   
}