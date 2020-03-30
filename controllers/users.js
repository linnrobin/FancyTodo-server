const { User } = require('../models')
const { decryptPass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller{
    static signup(req, res) {
        let { email, password } = req.body
        let payload = { email, password } 

        User.create(payload)
            .then(result => {
                let user = {
                    id: result.id,
                    email: result.email
                }

                let token = generateToken(user)
                console.log(token)

                res.status(201).json({
                    'id': user.id,
                    'email': user.email,
                    'access_token': token
                })
            })
            .catch(err => res.status(500).json(err))
        
    }

    static signin(req, res) {
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
                            'id': user.id,
                            'email': user.email,
                            'access_token': token
                        })
                    } else {
                        res.status(400).json({ message: 'Invalid Email / Password' })
                    }
                } else {
                    res.status(400).json({ message: 'Invalid Email / Password' })
                }
            })
            .catch(err => res.status(500).json(err))
    }
}

module.exports = Controller