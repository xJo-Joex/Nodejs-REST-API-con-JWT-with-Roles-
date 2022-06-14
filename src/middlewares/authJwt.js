import jwt from "jsonwebtoken";
import userModel from "../models/usersModel";
import roleModel from "../models/roleModel";
import config from "../config";
export const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) return res.status(403).json({ message: "No token provided" });
		const decode = jwt.verify(token, config.JWT_SECRET);
		req.userId = decode.id;
		const user = await userModel.findById(decode.id, { password: 0 });
		if (!user) return res.status(404).json({ message: "User not found" });
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};

export const verifyModerator = async (req, res, next) => {
	try {
		const user = await userModel.findById(req.userId, { password: 0 });
		const roles = await roleModel.find({ _id: { $in: user.roles } });
		if (!roles.some((role) => role.name === "moderator")) {
			return res.status(401).json({ message: "You are not moderator" });
		}
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};
export const verifyAdmin = async (req, res, next) => {
	try {
		const user = await userModel.findById(req.userId, { password: 0 });
		const roles = await roleModel.find({ _id: { $in: user.roles } });
		if (!roles.some((role) => role.name === "admin")) {
			return res.status(401).json({ message: "You are not admin" });
		}
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};
