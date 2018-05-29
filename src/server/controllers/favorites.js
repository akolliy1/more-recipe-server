import models from '../models'
import Sequelize from 'sequelize'

const {Favorite} = models

export default class favorite {
  static async newFavorite (req, res) {
    const {userId} = req
    const recipeId = req.params.recipeId
    const Op = Sequelize.Op
    console.log(req.decoded)
    const myFavorite = await Favorite.find({
      where: {[Op.and]: [{recipeId: recipeId}, {userId: userId}]}
    })
    if (myFavorite) {
      return res.status(200).send({
        success: true,
        message: 'It\'s already favorite'
      })
    } else {
      const addFavorite = await Favorite.create({userId, recipeId})
      if (addFavorite) {
        return res.status(201).send({
          success: true,
          message: 'successfully added'
        })
      } else {
        return res.status(400).send({
          success: false,
          message: 'unable to add to favorite'
        })
      }
    }
  }
  static async myFavorite (req, res) {
    const allFavorites = await Favorite.findAll({})
    if (allFavorites) {
      return res.status(200).send({
        success: true,
        message: 'favorites found',
        allFavorites
      })
    }
  }
  static async unfavorite ({user, params}, res) {
    const userId = userId
    const recipeId = req.params.recipeId
    const deleted = Favorite.destroy({})
    if (deleted) {
      return res.status(200).send({success: false, message: 'favorites deleted'})
    }
  }
}
