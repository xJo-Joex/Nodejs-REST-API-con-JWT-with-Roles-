import express from "express";
import authroutes from "./routes/auth.routes";
import usersroutes from "./routes/users.routes";
import productsroutes from "./routes/products.routes";

const app = express();

//middlewares
app.use(express.json());
app.use("/api/products", productsroutes);
app.use("/api/auth", authroutes);
app.use("/api/users", usersroutes);

export default app;
