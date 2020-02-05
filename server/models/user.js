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
      required: true,
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
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('User', userSchema)
