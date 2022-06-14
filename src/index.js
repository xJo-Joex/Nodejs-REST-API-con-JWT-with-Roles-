import app from "./app";
import pkg from "../package.json";
import morgan from "morgan";
import { application } from "express";
import "./database";
import createRoles from "./libs/initialSetup";

app.set("pgk", pkg);
app.use(morgan("dev"));
createRoles();
app.get("/", (req, res) => {
	res.json({
		name: pkg.name,
		version: pkg.version,
		description: pkg.description,
	});
});
app.listen(3000, () => {
	console.log("Server running on port 3000");
});
