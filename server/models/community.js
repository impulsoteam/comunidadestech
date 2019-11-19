import mongoose from 'mongoose';

const creatorData = {
  creatorEmail: {
    type: String,
    required: true,
  },
  creatorRocketId: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
};

const validateLocation = () => [
  this.model === 'presential' || this.model === 'both' ? true : false,
  '',
];
const location = {
  city: {
    type: String,
    required: validateLocation,
  },
  state: {
    type: String,
    required: validateLocation,
  },
  country: {
    type: String,
    required: validateLocation,
  },
};
const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      enum: ['online', 'presential', 'both'],
      required: true,
    },
    location,
    creatorData,
    url: {
      type: String,
      required: true,
    },
    description: {
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
    globalProgramParticipant: {
      type: Boolean,
      required: true,
    },
    globalProgramName: {
      type: String,
    },
    members: {
      type: Number,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Community', communitySchema);
