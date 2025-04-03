const { getUserEmail } = require('../utils/user');

const isAuthenticated = (req, res, next) => {
    const email = getUserEmail(); // Get the logged-in user's email

    if (!email) {
        // If no email is set, block access
        return res.status(401).json({ message: "Unauthorized: Please log in to access this resource" });
    }

    // If email exists, proceed to the next middleware or route handler
    next();
};

module.exports = isAuthenticated;