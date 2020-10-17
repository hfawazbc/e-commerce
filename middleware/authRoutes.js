module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.json({ isAuth: false, isAdmin: false });
    }
}