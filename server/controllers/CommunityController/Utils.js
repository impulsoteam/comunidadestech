import Community from '../../models/community';

class Utils {
  async getRelated({ name, category, city, state }) {
    try {
      let relatedByCity = [];
      let relatedByState = [];
      let relatedByCategory = [];
      const max = 6;

      if (city) {
        relatedByCity = await Community.aggregate([
          {
            $match: {
              status: 'published',
              name: { $ne: name },
              'location.city': city,
            },
          },
          { $limit: max },
        ]);
      }

      if (state && relatedByCity.length < max) {
        relatedByState = await Community.aggregate([
          {
            $match: {
              status: 'published',
              name: { $ne: name },
              'location.city': { $ne: city },
              'location.state': state,
            },
          },
          { $limit: max - (relatedByCity && relatedByCity.length) || 0 },
        ]);
      }

      const relatedByLocation = [...relatedByCity, ...relatedByState];

      if (relatedByLocation.length < max) {
        relatedByCategory = await Community.aggregate([
          {
            $match: {
              status: 'published',
              name: { $ne: name },
              'location.city': { $ne: city },
              'location.state': { $ne: state },
              category,
            },
          },
          {
            $limit: max - (relatedByLocation && relatedByLocation.length) || 0,
          },
        ]);
      }

      return [...relatedByLocation, ...relatedByCategory];
    } catch (error) {
      return error;
    }
  }
}

export default new Utils();
