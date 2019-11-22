import Community from '../../models/community';
import Utils from './Utils';

class CommunityController {
  async store(req, res) {
    try {
      const community = await Community.create(req.body);
      return res.status(201).json(community);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      const community = await Community.update(req.body);
      return res.json(community);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      const response = await Community.deleteOne(req._id);
      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getAllPublished(req, res) {
    try {
      const communities = await Community.aggregate([
        { $match: { published: true } },
      ]);

      return res.json(communities);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getByName(req, res) {
    try {
      const { name } = req.query;

      const community = await Community.findOne({ name });

      if (!community)
        return res.json({ message: 'Community name does not exists' });

      const related = await Utils.getRelated({
        name,
        city: community.location.city,
        category: community.category,
      });

      return res.json({
        community,
        related,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(JSON.stringify(error));
    }
  }
}

export default new CommunityController();
