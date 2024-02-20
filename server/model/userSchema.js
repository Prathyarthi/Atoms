import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, 'user name is Required'],
      minLength: [5, 'Name must be at least 5 characters'],
      maxLength: [50, 'Name must be less than 50 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'user email is required'],
      unique: true,
      lowercase: true,
      unique: [true, 'already registered'],
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      default: 'USER'
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    notification: {
      type: Array,
      default: [],
    },
    seennotification: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  // If password is not modified then do not hash it
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

// FIXME: Check if these methods are working as expected
userSchema.methods = {
  //method for generating the jwt token
  jwtToken() {
    return JWT.sign(
      { id: this._id, email: this.email, role: this.role },
      process.env.SECRET,
      { expiresIn: '24h' } // 24 hours
    );
  },

  //userSchema method for generating and return forgotPassword token
  getForgotPasswordToken() {
    const forgotToken = crypto.randomBytes(20).toString('hex');
    //step 1 - save to DB
    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(forgotToken)
      .digest('hex');

    /// forgot password expiry date
    this.forgotPasswordExpiryDate = Date.now() + 20 * 60 * 1000; // 20min

    //step 2 - return values to user
    return forgotToken;
  },
};

export const userModel = mongoose.model('user', userSchema);
