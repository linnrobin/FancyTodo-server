const { Todo } = require('../models')

function authorization(req, res, next) {
    let { id } = req.params
    Todo.findByPk(id)
        .then(result => {
            if(result) {
                if(result.UserId == req.currentUserId) {
                    return next()
                } else {
                    return res.status(401).json({ message: 'Unauthorized from authorization'})
                }
            } else {
                return res.status(400).json({ message: 'Bad Request'})
            }
        })
        .catch(err => res.status(500).json(err))
}

module.exports = authorization