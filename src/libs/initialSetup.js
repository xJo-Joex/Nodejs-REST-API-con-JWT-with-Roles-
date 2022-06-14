import roleModel from "../models/roleModel";
export default async () => {
	try {
		const count = await roleModel.countDocuments();
		if (count > 0) return;
		const values = await Promise.all([
			new roleModel({ name: "user" }).save(),
			new roleModel({ name: "moderator" }).save(),
			new roleModel({ name: "admin" }).save(),
		]);
		console.log(values);
	} catch (error) {
		console.log(error.stack);
	}
};
