const { Todo } = require('../models')

function authorization(req, res, next) {
    let { id } = req.params
    Todo.findByPk(id)
        .then(result => {
            if(result) {
                if(result.UserId == req.currentUserId) {
                    return next()
                } else {
                    return next({
                        name: "Unauthorized",
                        errors: [{ message: 'Unauthorized from authorization'}]
                    })
                }
            } else {
                return next({
                    name: 'NotFound',
                    errors: [{ message: 'Not Found' }]
                })
            }
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = authorization