import Community from '../models/community';

class CommunityController {
  async store(req, res) {
    try {
      const community = await Community.create(req.body);
      return res.status(201).json(community);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  async getAll(req, res) {
    try {
      const communities = await Community.aggregate([
        { $match: { published: false } },
      ]);

      return res.json(communities);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new CommunityController();
