const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    let imagePath = null;

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; 
    }

    await Product.create({
      name,
      price,
      description,
      image: imagePath, 
      user: req.user.id, 
    });

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let imagePath;
    if(req.body && req.body.image) {
      imagePath = req.body.image; 
    }

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    await Product.findByIdAndUpdate(id, {...req.body});

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
  const Products = await Product.find({user: req.user.id}).sort({ createdAt: -1 });

  res.json(Products);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};


const deleteProduct = async (req, res) => {
  try {
    const Product = await Product.findById({_id: req.params.id, user: req.user._id});

    if (!Product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndUpdate(req.params.id);

    res.status(200).json({message: "Product deleted"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getProduct = async(req, res, next) =>{
  const Product = await Product.findById({_id: req.params.id, user: req.user._id});

    if (!Product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(Product)
}

module.exports ={
    createProduct,
    updateProduct,
    getProducts,
    deleteProduct,
    getProduct
}