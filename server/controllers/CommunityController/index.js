import moment from 'moment'

import { amqpTypes } from '../../helpers'
import Community, { statusTypes } from '../../models/community'
import User from '../../models/user'
import AmqpController from '../AmqpController'
import Utils from './Utils'

class CommunityController {
  async store (req, res) {
    try {
      const { decoded, body } = req
      const user = await User.findOne({ _id: decoded.id })

      if (!user) return res.status(400).json({ message: 'User not found' })

      const { _id, name, email } = body.creator
      if (
        JSON.stringify(_id) !== JSON.stringify(user._id) ||
        name !== user.name ||
        email !== user.email
      ) {
        return res
          .status(400)
          .json({ message: 'Creator values does not match with credentials' })
      }

      const community = await Community.create(body)
      return res.status(201).json(community)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async delete (req, res) {
    try {
      const { params, decoded } = req
      const { _id, isModerator } = await User.findOne({ _id: decoded.id })
      const { creator } = await Community.findOne({ _id: params._id })

      const isOwner = JSON.stringify(creator._id) === JSON.stringify(_id)

      if (!isModerator && !isOwner) {
        return res
          .status(403)
          .json({ message: 'User cannot delete this community' })
      }

      const status = await Community.deleteOne({ _id: params._id })
      return res.status(200).json({
        status,
        message: `Community removed by ${isOwner ? 'owner' : 'moderator'}`
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async publish (req, res) {
    try {
      const { body: community, params, decoded } = req
      const { isModerator } = await User.findOne({ _id: decoded.id })

      if (!isModerator) {
        return res.status(403).json({
          message: 'User does not have credentials to published this community'
        })
      }

      const publishedCommunity = await Community.findOneAndUpdate(
        { _id: params._id },
        { $set: { status: community.status } },
        { returnOriginal: false }
      )
      AmqpController.publish({ message: publishedCommunity, type: amqpTypes.communityPublished })
      return res.json(publishedCommunity)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async setInviteResponse (req, res) {
    try {
      const { body, decoded } = req
      const response = body.accept ? 'ACCEPTED' : 'DECLINED'
      const updatedCommunity = await Community.findOneAndUpdate(
        {
          _id: body.communityId,
          managers: {
            $elemMatch: { _id: decoded.id, 'invitation.status': 'SENT' }
          }
        },
        {
          $set: {
            'managers.$.invitation.status': response,
            'managers.$.invitation.in': moment().toDate()
          }
        },
        { returnOriginal: false }
      )

      const success = updatedCommunity.managers.filter(
        ({ _id, status }) => _id === decoded.id && status === 'SENT'
      )
      return res.json({ success: success.length === 0 })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async update (req, res) {
    try {
      const { body: community, params, decoded } = req
      const { _id, isModerator } = await User.findOne({ _id: decoded.id })
      const isOwner =
        JSON.stringify(community.creator._id) === JSON.stringify(_id)

      if (!isModerator && !isOwner) {
        return res.status(403).json({
          message: 'User cannot update this community'
        })
      }

      community.status = 'awaitingPublication'
      const updatedCommunity = await Community.findOneAndUpdate(
        { _id: params._id },
        community,
        { returnOriginal: false }
      )
      return res.json(updatedCommunity)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async checkName (req, res) {
    try {
      const { name } = req.params
      const alreadyExists = await Community.findOne({ name }).collation({
        locale: 'pt',
        strength: 1
      })
      return res.json(!!alreadyExists)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async checkSlug (req, res) {
    try {
      const { slug } = req.params
      const alreadyExists = await Community.findOne({ slug })
      return res.json(!!alreadyExists)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async getByStatus (req, res) {
    try {
      const { status } = req.params

      if (!statusTypes.includes(status)) {
        return res
          .status(400)
          .json({ message: 'Status provided is not valid' })
      }

      const communities = await Community.find({ status })

      return res.json(communities)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async getBySlug (req, res) {
    try {
      const { slug } = req.params

      const community = await Community.findOne({ slug })

      if (!community) {
        return res
          .status(400)
          .json({ message: 'Community slug does not exists' })
      }

      const related = await Utils.getRelated({
        name: community.name,
        city: community.location.city,
        state: community.location.state,
        category: community.category
      })
      return res.json({
        community,
        related
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async getByOwner (req, res) {
    try {
      const { id } = req.decoded
      const communities = await Community.find({ 'creator._id': id })

      return res.json(communities)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

export default new CommunityController()
