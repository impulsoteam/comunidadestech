import faker from 'faker';
import { factory } from 'factory-girl';

import Community from '../../server/models/community';
import User from '../../server/models/user';

factory.define('Community', Community, () => ({
  name: faker.name.title(),
  model: faker.random.arrayElement(['presential', 'both']),
  creatorData: {
    creatorEmail: faker.internet.email(),
    creatorRocketId: faker.internet.userName(),
    ownerEmail: faker.internet.email(),
  },
  location: {
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
  },
  url: faker.internet.url(),
  description: faker.lorem.sentence(),
  category: faker.commerce.department(),
  tags: [
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
  ],
  globalProgramParticipant: true,
  globalProgramName: faker.company.companyName(),
  members: faker.random.number(),
  logo: faker.image.avatar(),
  published: faker.random.boolean(),
}));

factory.define('User', User, () => ({
  name: faker.name.findName(),
  avatar: faker.image.avatar(),
  linkedinId: faker.internet.password(),
}));
export default factory;
