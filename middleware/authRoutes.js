module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.json({ message: 'You are not authorized to view this source because you are not signed in.', authenticated: false });
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.json({ message: 'You are not authorized to view this source because you are not admin.', authenticated: false })
    }
}