const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token from hearder
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token)
        return res.status(401).json({ msg: 'No token. Authorization denied' });

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'No token. Authorization denied' });
    }
}