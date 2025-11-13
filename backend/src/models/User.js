import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  state: { type: String },
  district: { type: String },
  village: { type: String },
  farmerType: { type: String },
  farmArea: { type: String },
  primaryCrop: { type: String },
  soilType: { type: String },
  preferredLanguage: { type: String },
  profileImage: { type: String }, // filename or URL
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
