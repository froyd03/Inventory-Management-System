

function authorize(permissions) {
    return (req, res, next) => {
        const userRole = req.user.role;
        
        if (permissions.includes(userRole)) {
            next();
        }else{
            return res.status(401).json({ message: "Unauthorized role" });
        }
    };
}

module.exports = authorize