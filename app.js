const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const NodeCache = require('node-cache');
const { userFields } = require('./validators')

const SECRET_KEY = 'Tictactrip';
const PORT = 5000;

const cache = new NodeCache();
const lineLength = 80;
const dailyThreshold = 80000;

const app = express();
app.use(bodyParser.json());

app.post('/api/token', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const regexEmail = new RegExp(userFields.email.regexps);
  if (!regexEmail.test(email)) {
    return res.status(400).json({ error: 'Please set your mail the right format' });
  }
  const isCached = cache.get(email.toString());
  if (!isCached) {
    const token = jwt.sign({ email }, SECRET_KEY);
    cache.set(email.toString(), { token: token, count: 0 }, 86400);
    return res.json({ message: 'Welcome !  here is your access token', data: token });
  }
  const cachedToken = cache.get(email.toString());
  return res.json({ message: `You already have a token: ${cachedToken.token}` });
});

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
  const textLength = req.body.toString().length;
  if (cachedData.count + textLength > dailyThreshold) {
    return res.status(402).json({ message: 'Email is required' });
  }
  cache.set(req.user.email, { ...cachedData, count: cachedData.count + textLength });
  next();
};

app.use(express.text());

const spreadSpaces = (line, pivot, i, index, missingSpaces) => {
  if (i === missingSpaces) {
    return line;
  }

  const shouldIncrement = i % 2;
  if (i && shouldIncrement) {
    index++
  }
  if ((pivot + index === line.length - 1) || !(pivot + index)) {
    index = 0;
  }
  if (i === 0) {
    line[pivot] += ' ';
  } else {
    line[pivot + index] += ' ';
  }

  return spreadSpaces(line, pivot, i + 1, index * -1, missingSpaces);
};

const formatLine = line => {
  const missingSpaces = 80 - [...line].join(' ').length
  return spreadSpaces(line, Math.floor((line.length - 1) / 2),  0, 0, missingSpaces)
};

const justifiedParagraph = text =>
  text.split(' ')
    .reduce((acc, val) => 
      acc.at(-1).join(' ').length + val.length + 1 <= lineLength ?
        [...acc.slice(0, acc.length - 1), [...acc.at(-1), val]] :
        [...acc.slice(0, acc.length - 1), [...formatLine(acc.at(-1)), "\n"], [val]]
    , [[]])

app.post('/api/justify', checkToken, updateWordCount, (req, res) => {
  const text = req.body.toString();
  const result = justifiedParagraph(text).map(arr => arr.join(' ')).join('');
  res.json({ message: "Here's your text, justified", data: result });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
