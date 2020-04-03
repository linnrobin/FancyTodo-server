const { User } = require('../models')
const { decryptPass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

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

    static googleSign(req, res, next) {
        let email = ''
        const client = new OAuth2Client(process.env.CLIENT_ID);

        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                email = ticket.getPayload().email
                return User.findOne({
                            where: {
                                email
                            }
                        })
                            .then(result => {
                                if (result) {
                                    let payload = {
                                        id: result.id,
                                        email: result.email
                                    }

                                    let token = generateToken(payload)

                                    res.status(200).json({
                                        'accessToken': token,
                                        'msg': `Welcome Back, ${result.email}`
                                    })
                                } else {
                                    return User.create({
                                        email,
                                        password: process.env.DEFAULT_PASSWORD
                                    })
                                        .then(newCreate => {
                                            let payload = {
                                                id: newCreate.id,
                                                email: newCreate.email
                                            }

                                            let token = generateToken(payload)

                                            res.status(201).json({
                                                'accessToken': token,
                                                'msg': 'First Time Google Sign In Successful'
                                            })
                                        })
                                        .catch(err => {
                                            return next(err)
                                        })
                                }
                            })
                            .catch(err => {
                                return next(err)
                            })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = Controller