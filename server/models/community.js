import mongoose from 'mongoose';

const validateCountry = () => [
  this.model === 'presential' || this.model === 'both' ? true : false,
  '',
];
const validateLocation = () => [
  this.location && this.location.country === 'Brasil',
  '',
];

const creator = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rocketChat: {
    type: String,
  },
};

const location = {
  country: {
    type: String,
    required: validateCountry,
  },
  state: {
    type: String,
    required: validateLocation,
  },
  city: {
    type: String,
    required: validateLocation,
  },
};
const globalProgram = {
  isParticipant: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
  },
};

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    members: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      enum: ['online', 'presential', 'both'],
      required: true,
    },
    location,
    globalProgram,
    owner: {
      type: String,
      required: true,
    },
    creator,
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Community', communitySchema);
