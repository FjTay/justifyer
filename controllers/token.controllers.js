const jwt = require('jsonwebtoken');
const { userFields } = require('../scripts/validators');
const { cache } = require('../cache');
const { TOKEN_DURATION, SECRET_KEY } = require('../env.variables');

const checkEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    const regexEmail = new RegExp(userFields.email.regexps);
    if (!regexEmail.test(email)) {
        return res.status(400).json({ error: 'Please set your mail the right format' });
    }
    req.user = { email };
    next();
};

const checkTokenSubscription = (req, res) => {
    const { email } = req.user;
    const isCached = cache.get(email.toString());
    if (!isCached) {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '24h' });
        cache.set(email.toString(), { token: token, count: 0 }, TOKEN_DURATION);
        return res.json({ message: 'Welcome !  here is your access token', data: token });
    }
    const cachedToken = cache.get(email.toString());
    return res.json({ message: `You already have a token: ${cachedToken.token}` });
};

module.exports = {
    checkEmail,
    checkTokenSubscription
};
