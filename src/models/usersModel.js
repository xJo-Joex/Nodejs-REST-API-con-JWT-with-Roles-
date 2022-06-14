import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
	{
		username: {
			type: String,
			ùnique: true,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		roles: [{ ref: "Role", type: Schema.Types.ObjectId }],
	},
	{
		timestamp: true,
		versionKey: false,
	}
);

userSchema.statics.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, hash) => {
	return await bcrypt.compare(password, hash);
};

const userModel = model("User", userSchema);

export default userModel;
