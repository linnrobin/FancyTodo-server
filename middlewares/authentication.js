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
                    return res.status(404).json({ message: 'User Not Found'})
                }
            })
            .catch(err => res.status(401).json({ message: 'Unauthorized' }))
    }
    catch(err) {
        res.status(500).json(err)
    }
}

module.exports = authentication