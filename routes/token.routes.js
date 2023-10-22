const { Router } = require('express');
const { checkEmail, checkTokenSubscription } = require('../controllers/token.controllers')

const tokenRouter = new Router();

tokenRouter.post("/", checkEmail, checkTokenSubscription);

module.exports = {
    tokenRouter
};
