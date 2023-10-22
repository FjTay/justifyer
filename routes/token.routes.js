const { Router } = require("express")

const tokenRouter = new Router()

tokenRouter.post("/")

module.exports = {
    tokenRouter
}