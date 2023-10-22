const express = require('express');
const bodyParser = require('body-parser');
const { tokenRouter } = require('./routes/token.routes');
const { justifyRouter } = require('./routes/justify.routes');
const { PORT } = require('./env.variables');

const app = express();
app.use(bodyParser.json());

app.use('/api/token', tokenRouter);

app.use(express.text());
app.use('/api/justify', justifyRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
