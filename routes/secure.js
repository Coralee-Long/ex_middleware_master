const secureRouter = require('express').Router()


const secureToken = (req,res, next) => {
    console.log(req.query.token)
    if(req.query.token != undefined){
        next()
    }
    else{
        res.sendStatus(403)
    }

}

secureRouter.use(secureToken)




secureRouter.get('/', (req, res) => {
    res.send('Secure route')
})

secureRouter.get('/v2', (req, res) => {
    res.send('Second secure router')
})


module.exports = secureRouter