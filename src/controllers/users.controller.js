import userModel from "../models/usersModel";
export const createUser = (req, res) => {
	res.json({ message: "create user" });
};
export const getAllUsers = async (req, res) => {
	try {
		const users = await userModel.find().populate("roles");
		res.json({ users });
	} catch (error) {
		res.json({ message: error.message });
	}
};
export const deleteUser = async (req, res) => {
	try {
		const users = await userModel.deleteOne({ _id: req.params.id });

		res.json({ message: "user deleted" });
	} catch (error) {
		res.json({ message: error.message });
	}
};
