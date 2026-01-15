const Cart = require("../models/cart.model");

const createCart = async (req, res) => {
  try {
     await Cart.create({productId: req.body.product, quantity: req.body.qty, user: req.user.id });
    res.status(201).json({message: "Cart is created successfully"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const getCarts = async (req, res) => {
  try {
 const carts = await Cart.find({user: req.user._id}).populate("productId");
    return res.json(carts);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};


const updateCart = async (req, res) => {
  try {
    const Cart = await Cart.findById({_id: req.params.id, user: req.user._id});

    if (!Cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await Cart.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).json({message:"Cart updated successfully"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const deleteCart = async (req, res) => {
  try {
    const Cart = await Cart.findById({_id: req.params.id, user: req.user._id});

    if (!Cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await Cart.findByIdAndUpdate(req.params.id);

    res.status(200).json({message: "Cart deleted"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getCart = async(req, res, next) =>{
  const Cart = await Cart.findById({_id: req.params.id, user: req.user._id});

    if (!Cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json(Cart)
}

module.exports ={
    createCart,
    updateCart,
    getCarts,
    deleteCart,
    getCart
}