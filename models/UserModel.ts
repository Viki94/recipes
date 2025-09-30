import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['regular', 'admin'], default: 'regular' },
  picture: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
