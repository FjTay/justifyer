const { Router } = require('express')
const { checkToken, updateWordCount, justifyText } = require('../controllers/justify.controllers')

const justifyRouter = new Router()

justifyRouter.post('/', checkToken, updateWordCount, justifyText);

module.exports = {
    justifyRouter
}