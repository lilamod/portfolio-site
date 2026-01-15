const Order = require("../models/cart.model");

const createOrder = async (req, res) => {
  try {
     await Order.create({ ...req.body, user: req.user.id });
    res.status(201).json({message: "Order is created successfully"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const getOrders = async (req, res) => {
  try {
  const orders = await Order.find({user: req.user.id}).sort({ createdAt: -1 });
console.log("orders", orders)
  res.json(orders);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};


const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById({_id: req.params.id, user: req.user._id});

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).json({message:"Order updated successfully"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById({_id: req.params.id, user: req.user._id});

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndUpdate(req.params.id);

    res.status(200).json({message: "Order deleted"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getOrder = async(req, res, next) =>{
  const order = await Order.findById({_id: req.params.id, user: req.user._id});

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(Order)
}

module.exports ={
    createOrder,
    updateOrder,
    getOrders,
    deleteOrder,
    getOrder
}