import faker from 'faker';
import { factory } from 'factory-girl';

import Community from '../../server/models/community';
import User from '../../server/models/user';

factory.define('Community', Community, () => ({
  name: faker.name.findName(),
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
    _id: '5dd960c16d45e34e0b15e99e',
    name: faker.name.findName(),
    email: faker.internet.email(),
  },
}));

factory.define('User', User, () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  linkedinProvider: {
    id: faker.internet.password(),
    token: faker.internet.password(),
  },
  googleProvider: {
    id: faker.internet.password(),
    token: faker.internet.password(),
  },
}));
export default factory;
