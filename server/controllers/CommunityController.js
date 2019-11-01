import Community from '../models/community';

class CommunityController {
  async store(req, res) {
    const community = await Community.create(req.body);
    return res.status(201).json(community);
  }
}

export default new CommunityController();
