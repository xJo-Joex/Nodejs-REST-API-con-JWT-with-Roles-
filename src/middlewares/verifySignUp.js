import userModel from "../models/usersModel";
import roleModel from "../models/roleModel";
export const verfiyEmailOrName = async (req, res, next) => {
	const { email, username } = req.body;
	const user_email = await userModel.findOne({ email: email });
	if (user_email) return res.status(400).json({ message: "Email already exists" });
	const user_name = await userModel.findOne({ username: username });
	if (user_name) return res.status(400).json({ message: "Username already exists" });
	next();
};

export const chekRolesExist = async (req, res, next) => {
	const { roles } = req.body;

	for (let i = 0; i < roles.length; i++) {
		const foundRole = await roleModel.findOne({ name: roles[i] });
		if (!foundRole) {
			return res.status(400).json({ message: "Role incorrect: " + roles[i] });
      break;
		}
	}
	next();
};
