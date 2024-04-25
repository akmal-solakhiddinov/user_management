const jwt = require("jsonwebtoken");

const generateJwtToken = (user) => {
    const { name, email, password } = user
    const accessToken = jwt.sign({ email, name, password }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return accessToken;
}

module.exports = generateJwtToken;

