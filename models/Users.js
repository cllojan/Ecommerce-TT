import mongoose, {model, Schema, models} from "mongoose";

const UsersSchema = new Schema({
  name: {type:String, required:true},
  email: String,
  image: {type: String, required: true},
  emailVerified: null
}, {
  timestamps: true,
});

export const Users = models.Users || model('Users', UsersSchema);