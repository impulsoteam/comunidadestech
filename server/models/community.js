import mongoose from 'mongoose';

export const modelTypes = ['online', 'presential', 'both'];
export const statusTypes = ['awaitingPublication', 'published', 'archived'];

export const invitationStatus = {
  awaiting: 'AWAITING',
  accepted: 'ACCEPTED',
  declined: 'DECLINED',
};

function validateCountry() {
  return !(this.model === 'online');
}

function validateLocation() {
  const isOnline = this.model === 'online';
  const isBrazilian =
    this.location && this.location.country === 'Brasil' ? true : false;
  return !isOnline && isBrazilian;
}

const creator = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
      unique: true,
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
      enum: modelTypes,
      required: true,
    },
    location,
    globalProgram,
    owner: {
      type: String,
      required: true,
    },
    managers: Array,
    creator,
    status: {
      type: String,
      enum: statusTypes,
      required: true,
      default: 'awaitingPublication',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Community', communitySchema);
