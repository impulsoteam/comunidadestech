import Community from '../../models/community';

class Utils {
  async getRelated({ name, category, city }) {
    try {
      let relatedByCity = [];
      let relatedByCategory = [];
      const max = 3;

      if (city) {
        relatedByCity = await Community.aggregate([
          {
            $match: {
              name: { $ne: name },
              'location.city': city,
            },
          },
          { $limit: 3 },
        ]);
      }

      if (relatedByCity.length > max) {
        relatedByCategory = await Community.aggregate([
          {
            $match: {
              name: { $ne: name },
              category,
            },
          },
          { $limit: max - (relatedByCity && relatedByCity.length) || 0 },
        ]);
      }
      return [...relatedByCity, ...relatedByCategory];
    } catch (error) {
      return error;
    }
  }
}

export default new Utils();
