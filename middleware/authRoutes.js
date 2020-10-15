module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) next();
    if (!req.isAuthenticated()) return res.json({ message: 'You are not authorized to view this source because you are not signed in.' });
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) next();
    if (!req.isAuthenticated()) return res.json({ message: 'You are not authorized to view this source because you are not admin.' });
}