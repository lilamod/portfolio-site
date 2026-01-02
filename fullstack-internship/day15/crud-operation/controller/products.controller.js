const Product = require("../models/product");

const createProduct = async(req, res) =>{
    if(!req.body.name) {
        return res.status(400).json("Product Name is required");
    } 
    if(!req.body.price) {
        return res.status(400).json("Product Price is required");
    }
    if(!req.body.stock) {
        return res.status(400).json("Stock is required");
    }

    const newProduct = new Product({...Product});
    await newProduct.save()
    .then(() =>{
        return res.status(201).json("Product Created successfully");
    })
    .catch(err => {
        return res.status(400).json("Product does not created", err.message);
    })
}

const findProduct = async(req,res) =>{
    const products = await Product.find();
    if(products.length > 0) {
        return res.status(200).json(products);
    }
    return res.status(200).json([]);
}

const updateProduct = async(req, res) =>{
    const product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(404).json("Product does not found");
    }
    await Product.updateOne({_id: req.params.id},{$set:{...req.body}})
    .then(()=>{
        return res.status(200).json("Product updated successfully");
    })
    .catch(err => {
        return res.status(400).json("Product does not updated",err.message);
    })
}

const deleteProduct = async(req,res) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(404).json("Product does not found");
    }
    await Product.deleteOne({_id:req.params.id})
    .then(()=>{
        return res.status(200).json("Product deleted successfully");
    })
    .catch(err => {
        return res.status(400).json("Product not deleted", err.message);
    })
}

module.exports= {
    createProduct, findProduct, updateProduct, deleteProduct
}