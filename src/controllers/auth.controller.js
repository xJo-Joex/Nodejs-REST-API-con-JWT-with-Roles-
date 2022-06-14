import userModel from "../models/usersModel";
import Role from "../models/roleModel";
import jwt from "jsonwebtoken";
import config from "../config";

export const singUp = async (req, res) => {
	const { username, email, password, roles } = req.body;
	// const user = await userModel.findOne({ email });
	try {
		const newUser = new userModel({
			username,
			email,
			password: await userModel.encryptPassword(password),
			// roles: [await userModel.getRole("user")],
		});
		if (roles) {
			const foundRoles = await Role.find({ name: { $in: roles } });
			newUser.roles = foundRoles.map((role) => role._id);
		} else {
			const role = await Role.findOne({ name: "user" });
			newUser.roles = [role._id];
		}
		const savedUser = await newUser.save();
		const token = jwt.sign({ id: savedUser._id }, config.JWT_SECRET, { expiresIn: "86400s" });
		res.json({ token, savedUser });
	} catch (error) {
		res.json({message: error.message});
	}
};
export const singIn = async (req, res) => {
	const userFound = await userModel.findOne({ email: req.body.email }).populate("roles");
	if (!userFound) return res.status(404).json({ message: "User not found" });
	const isPasswordValid = await userModel.comparePassword(req.body.password, userFound.password);
	if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });
	const token = jwt.sign({ id: userFound._id }, config.JWT_SECRET, { expiresIn: "86400s" });
	res.json({ token, userFound });
};
