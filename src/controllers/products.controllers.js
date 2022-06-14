import productModel from "../models/productModel";

export const createProduct = async (req, res) => {
	const { name, category, price, imgUrl } = req.body;
	const newProduct = new productModel({ name, category, price, imgUrl });
	const productSave = await newProduct.save();

	res.status(201).json(productSave);
};
export const getProducts = async (req, res) => {
	const allProducts = await productModel.find();
	res.json(allProducts);
};
export const getProductById = async (req, res) => {
	const product = await productModel.findById(req.params.productId);
	res.status(200).json(product);
};
export const updateProductById = async (req, res) => {
	const productUpdate = await productModel.findByIdAndUpdate(req.params.productId, req.body, {
		new: true,
	});
	res.status(200).json(productUpdate);
};
export const deleteProductById = async (req, res) => {
	try {
		const productDeleted = await productModel.findByIdAndDelete(req.params.productId);
		if(!productDeleted) return res.status(404).json({ message: "Product not found" });
		res.status(200).json({ message: "Product deleted" });
	} catch (error) {
		res.status(404).json({ message: "Product not found" });
	}
};
