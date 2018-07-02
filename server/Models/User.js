const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  local: {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true
    }
  },
  facebook: {
    facebookId: { type: String, required: true ,default:'-' }
  },
  role: {
    type: String,
    enum: ['admin', 'organizer', 'client',],
    required: true,
  },

}
  , { versionKey: false });
UserSchema.methods = {
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

// Define hooks for pre-saving
UserSchema.pre('save', function (next) {
  if (!this.local.password) {
    console.log('=======NO PASSWORD PROVIDED=======')
    next()
  } else {
    this.local.password = this.hashPassword(this.local.password)
    next()
  }
  // this.password = this.hashPassword(this.password)
  // next()
})
module.exports = mongoose.model('users', UserSchema);