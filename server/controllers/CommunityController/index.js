import Community, { statusTypes } from '../../models/community';
import User from '../../models/user';
import Utils from './Utils';

class CommunityController {
  async store(req, res) {
    try {
      const { decoded, body } = req;
      const { _id, name, email } = await User.findOne({ _id: decoded.id });
      if (!name || !email)
        return res.status(400).json({ message: 'User not found' });
      body.creator._id = _id;
      body.creator.name = name;
      body.creator.email = email;

      const community = await Community.create(body);
      return res.status(201).json(community);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async delete(req, res) {
    try {
      const { params, decoded } = req;
      const { _id, isModerator } = await User.findOne({ _id: decoded.id });
      const { creator } = await Community.findOne({ _id: params._id });

      const isOwner = JSON.stringify(creator._id) === JSON.stringify(_id);

      if (!isModerator && !isOwner)
        return res
          .status(403)
          .json({ message: 'User cannot delete this community' });

      const status = await Community.deleteOne({ _id: params._id });
      return res.status(200).json({
        status,
        message: `Community removed by ${isOwner ? 'owner' : 'moderator'}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const { body, params, decoded } = req;
      const { isModerator } = await User.findOne({ _id: decoded.id });

      if (!isModerator && body.status)
        return res.status(403).json({
          message: 'User does not have credentials to published this community',
        });

      const { ok } = await Community.updateOne({ _id: params._id }, body);
      if (ok === 1) {
        const updatedCommunity = await Community.findOne({ _id: params._id });
        return res.json(updatedCommunity);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getByStatus(req, res) {
    try {
      const { status } = req.params;

      if (!statusTypes.includes(status))
        return res
          .status(400)
          .json({ message: 'Status provided is not valid' });

      const communities = await Community.find({ status });

      return res.json(communities);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getByName(req, res) {
    try {
      const { name } = req.params;

      const community = await Community.findOne({ name });

      if (!community)
        return res
          .status(400)
          .json({ message: 'Community name does not exists' });

      const related = await Utils.getRelated({
        name,
        city: community.location.city,
        state: community.location.state,
        category: community.category,
      });
      return res.json({
        community,
        related,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getByOwner(req, res) {
    try {
      const { id } = req.decoded;
      const communities = await Community.find({ 'creator._id': id });

      return res.json(communities);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export default new CommunityController();
