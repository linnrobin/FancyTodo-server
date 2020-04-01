const { Todo, User } = require('../models')
const Op = require('sequelize').Op

class Controller {
    static findAll(req, res, next) {
        let payload = {
            UserId: req.currentUserId
        }
        Todo.findAll({
            where: {
                UserId: payload.UserId
            }, 
            include: [ User ],
            order: [
                ['status', 'ASC'],
                ['due_date', 'ASC'],
                ['title', 'ASC']
            ]
        })
            .then(todos => {
                return res.status(200).json({ todos })
            })
            .catch(err => {
                return next(err)
            })
    }

    static create(req, res, next) {
        let { title, description, status, due_date } = req.body
        let newCreate = { title, description, status, due_date, UserId: req.currentUserId }
        Todo.create(newCreate)
            .then(result => { 
                return res.status(201).json({ result, message: 'created new todos'})
            })
            .catch(err => {
                if (err.name === "SequelizeValidationError") {
                    return next({
                        name: 'SequelizeValidationError',
                        errors: [{ message: err.message }]
                    })    
                } else {
                    return next(err)
                }
            })
    }

    static findOne(req, res, next) {
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
                    return next({
                        name: 'NotFound',
                        errors: [{ message: 'Error Not Found' }]
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static put(req, res, next) {
        let { id } = req.params
        let { title, description, status, due_date } = req.body
        let newUpdate = { title, description, status, due_date }
            Todo.update(newUpdate, {
                where: {
                    id
                },
                returning: true
            })
                .then(updated => {
                    let newUpdated = updated[1][0].dataValues
                    res.status(200).json({ newUpdated, message: 'updated todos'})
                })
                .catch(err => {
                    if (err.name === "SequelizeValidationError") {
                        return next({
                            name: 'SequelizeValidationError',
                            errors: [{ message: err.message }]
                        })
                    } else {
                        return next(err)
                    }
                })
    }

    static delete(req, res, next) {
        let { id } = req.params

        let deleted

        Todo.findByPk(id)
            .then(result => {
                deleted = result
                    Todo.destroy({
                        where: {
                            id
                        }
                    })
                        .then(newResult => res.status(200).json({ deleted, message: 'deleted todos' }))
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