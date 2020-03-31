const { Todo, User } = require('../models')
const Op = require('sequelize').Op

class Controller {
    static findAll(req, res) {
        let payload = {
            UserId: req.currentUserId
        }
        Todo.findAll({
            where: {
                UserId: payload.UserId
            }, 
            include: [ User ]
        })
            .then(todos => res.status(200).json({ todos }))
            .catch(err => res.status(500).json(err))
    }

    static create(req, res) {
        let { title, description, status, due_date } = req.body
        let newCreate = { title, description, status, due_date }
        Todo.create(newCreate)
            .then(result => res.status(201).json({ result, message: 'created new todos'}))
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    res.status(400).json(err)
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static findOne(req, res) {
        let { id } = req.params

        Todo.findOne({
            where: {
                id
            }
        })
            .then(result => {
                if (result) {
                    res.status(200).json({ result })
                } else {
                    res.status(404).json({ message:'error not found' })
                }
            })
            .catch(err => res.status(500).json(err))
    }

    static put(req, res) {
        let { id } = req.params
        let { title, description, status, due_date } = req.body
        let newUpdate = { title, description, status, due_date }
        Todo.findByPk(id)
            .then(result => {
                if(result) {
                    Todo.update(newUpdate, {
                        where: {
                            id
                        }
                    })
                        .then(updated => {
                            Todo.findByPk(id)
                                .then(updateResult => res.status(200).json({ updateResult, message: 'updated todos'}))
                                .catch(err => res.status(500).json(err))
                        })
                        .catch(err => {
                            if (err.name === "SequelizeValidationError") {
                                res.status(400).json(err)
                            } else {
                                res.status(500).json(err)
                            }
                        })
                } else {
                    res.status(404).json({ message: 'error not found' })
                }
            })
            .catch(err => res.status(500).json(err))
    }

    static delete(req, res) {
        let { id } = req.params

        let deleted

        Todo.findByPk(id)
            .then(result => {
                deleted = result
                if (result) {
                    res.status(200).json({ result })
                    
                    Todo.destroy({
                        where: {
                            id
                        }
                    })
                        .then(result => res.status(200).json({ deleted, message: 'deleted todos' }))
                        .catch(err => res.status(500).json(err))

                } else {
                    res.status(404).json({ message: 'error not found' })                }
            })
            .catch(err => res.status(500).json(err))
    }
}

module.exports = Controller