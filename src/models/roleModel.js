import { model, Schema } from "mongoose";

const roleSchema = new Schema(
	{
		name: String,
	},
	{ timestamp: true, versionKey: false }
);

const roleModel = model("Role", roleSchema);

export default roleModel;