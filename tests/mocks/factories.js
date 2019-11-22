import faker from 'faker';
import { factory } from 'factory-girl';

import Community from '../../server/models/community';
import User from '../../server/models/user';

factory.define('Community', Community, () => ({
  name: faker.name.title(),
  logo: faker.image.avatar(),
  url: faker.internet.url(),
  description: faker.lorem.sentence(),
  type: faker.hacker.adjective(),
  category: faker.commerce.department(),
  tags: [
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
  ],
  members: faker.random.number(),
  model: faker.random.arrayElement(['presential', 'both']),
  location: {
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
  },
  globalProgram: {
    isParticipant: true,
    name: faker.company.companyName(),
  },
  owner: faker.internet.email(),
  creator: {
    rocketChat: faker.internet.userName(),
  },
}));

factory.define('User', User, () => ({
  name: faker.name.findName(),
  avatar: faker.image.avatar(),
  linkedinId: faker.internet.password(),
}));
export default factory;
