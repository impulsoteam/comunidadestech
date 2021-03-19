import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    isModerator: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      required: true
    },
    linkedinProvider: {
      id: String,
      token: String
    },
    googleProvider: {
      id: String,
      token: String
    },
    dataPolicyAccepted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('User', userSchema)
