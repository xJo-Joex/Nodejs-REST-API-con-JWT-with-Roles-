import mongoose, { mongo } from "mongoose";

mongoose
	.connect("mongodb://localhost:27017/mycompanydb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connected to mongo"))
	.catch((err) => console.log(err));
