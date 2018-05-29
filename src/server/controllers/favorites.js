import models from '../models'
import Sequelize from 'sequelize'

const {Favorite} = models

export default class favorite {
  static async newFavorite (req, res) {
    const {userId} = req.params.userId
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
    const userId = req.params.userId
    const allFavorites = await Favorite.findAll({
      where: {userId: userId}
    })
    if (allFavorites) {
      return res.status(200).send({
        success: true,
        message: 'favorites found',
        allFavorites
      })
    }
  }
  static async unfavorite (req, res) {
    const Op = Sequelize.and
    const userId = req.params.userId
    const recipeId = req.params.recipeId
    const deleted = Favorite.destroy({
      where: {
        [Op]: [{userId}, {recipeId}]
      }
    })
    if (deleted) {
      return res.status(200).send({success: true, message: 'favorites deleted'})
    }
    return res.status(500).send({ success: false, message: 'favorites not deleted' })
  }
}
