import * as bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

export const userSchema: Schema = new Schema({
  google: {
    createdAt: Date,
    email: { type: String, unique: true },
    id: { type: String, unique: true, index: true },
    name: String,
    token: String,
  },
  local: {
    createdAt: Date,
    email: { type: String, unique: true },
    password: String,
    username: { type: String, unique: true },
  },
});

userSchema.pre('save', (next) => {
  if (!this.google.createdAt || !this.local.createdAt) {
    this.createdAt = new Date();
  }
  if (this.isModified('local.password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(this.local.password, salt, (error, hash) => {
        if (error) {
          return next(error);
        }
        this.local.password = hash;
        return next(this);
      });
    });
  }
  next();
});

userSchema.methods.isPasswordValid = (password) => {
  return bcrypt.compareSync(password, this.local.password);
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.local.password;
    return ret;
  }
});
