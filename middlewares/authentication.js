const { verify } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
    let accessToken = req.headers.accesstoken
    try{
        let decoded = verify(accessToken)
        let { id } = decoded
        User.findByPk(id)
            .then(result => {
                if (result) {
                    req.currentUserId = result.id
                    return next()
                } else {
                    return next({
                        name: "NotFound",
                        message: "User Not Found"
                    })
                }
            })
            .catch(err => {
                return ({
                    name: "Unauthorized",
                    message: "Unauthorized from authentication"
                })
            })
    }
    catch(err) {
        return next(err)
    }
}

module.exports = authentication