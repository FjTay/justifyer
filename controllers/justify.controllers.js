const jwt = require('jsonwebtoken');
const { cache } = require('../cache');
const { justifiedParagraph } = require('../scripts/justify');
const { SECRET_KEY, DAILY_THRESHOLD } = require('../env.variables');

const checkToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Token required' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
    });
};

const updateWordCount = (req, res, next) => {
    const cachedData = cache.get(req.user.email);
    console.log(cachedData)
    console.log(req.user)
    const textLength = req.body.toString().length;
    if (cachedData.count + textLength > DAILY_THRESHOLD) {
        return res.status(402).json({ message: 'Email is required' });
    }
    cache.set(req.user.email, { ...cachedData, count: cachedData.count + textLength });
    next();
};

const justifyText = (req, res) => {
    const text = req.body.toString();
    const result = justifiedParagraph(text).map(arr => arr.join(' ')).join('');
    res.json({ message: "Here's your text, justified", data: result });
};

module.exports = {
    checkToken,
    updateWordCount,
    justifyText
}