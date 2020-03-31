const { User } = require('../models')
const { decryptPass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller{
    static signup(req, res, next) {
        let { email, password } = req.body
        let payload = { email, password } 

        User.create(payload)
            .then(result => {
                let user = {
                    id: result.id,
                    email: result.email,
                    password: result.password
                }
                res.status(201).json({
                    'id': user.id,
                    'email': user.email,
                    'password': user.password
                })
            })
            .catch(err => {
                return next(err)
            })
        
    }

    static signin(req, res, next) {
        let { email, password } = req.body
        let payload = { email, password } 

        User.findOne({
            where: {
                email: payload.email
            }
        })
            .then(result => {
                if (result) {
                    let compare = decryptPass(payload.password, result.password)
                    if (compare) {
                        let user = {
                            id: result.id,
                            email: result.email
                        }

                        let token = generateToken(user)

                        res.status(200).json({
                            'accessToken': token
                        })
                    } else {
                        console.log(err)
                        return next({
                            name: 'BadRequest',
                            errors: [{ message: 'Invalid Email / Password' }]
                        })
                    }
                } else {
                    return next({
                        name: 'BadRequest',
                        errors: [{ message: 'Invalid Email / Password' }]
                    })
                }
            })
            .catch(err => {
                return next({
                    name: 'InternalServerError',
                    errors: [{ message: err }]
                })
            })
    }
}

module.exports = Controller